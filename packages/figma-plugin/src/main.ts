import { getDictionary, getRegex, preserveCase, Target, ScanResult } from "@uk-us/core";

// Scan function
function scanPage(target: Target): ScanResult {
  const dictionary = getDictionary(target);
  const regex = getRegex(target);

  const result: ScanResult = {
    totalMatches: 0,
    counts: {},
    uniqueWords: [],
    nodeHits: [],
  };

  const textNodes = figma.currentPage.findAll(
    (node) => node.type === "TEXT"
  ) as TextNode[];

  textNodes.forEach((node) => {
    const text = node.characters;
    const matches: Array<{ from: string; to: string; count: number }> = [];
    const nodeWordCounts: Record<string, number> = {};

    // Use matchAll for better performance
    for (const match of text.matchAll(regex)) {
      const word = match[0].toLowerCase();
      result.totalMatches++;

      // Update counts
      result.counts[word] = (result.counts[word] || 0) + 1;
      nodeWordCounts[word] = (nodeWordCounts[word] || 0) + 1;
    }

    // Build matches array for this node
    Object.entries(nodeWordCounts).forEach(([word, count]) => {
      matches.push({
        from: word,
        to: dictionary[word] || word,
        count,
      });
    });

    if (matches.length > 0) {
      result.nodeHits.push({
        id: node.id,
        name: node.name,
        matches,
      });
    }
  });

  // Get unique words
  result.uniqueWords = Object.keys(result.counts);

  return result;
}

// Replace function (optimized with batched parallel processing)
async function replacePage(target: Target): Promise<number> {
  const dictionary = getDictionary(target);
  const regex = getRegex(target);

  const textNodes = figma.currentPage.findAll(
    (node) => node.type === "TEXT"
  ) as TextNode[];

  // Process in batches of 10 nodes at a time for optimal performance
  const BATCH_SIZE = 10;
  let totalReplacements = 0;

  for (let i = 0; i < textNodes.length; i += BATCH_SIZE) {
    const batch = textNodes.slice(i, i + BATCH_SIZE);

    // Process batch in parallel using Promise.allSettled for error isolation
    const results = await Promise.allSettled(
      batch.map(async (node) => {
        try {
          // Load all fonts used in the node
          await loadNodeFonts(node);

          const originalText = node.characters;
          let replacements = 0;

          const newText = originalText.replace(regex, (matched) => {
            const lowerMatched = matched.toLowerCase();
            const replacement = dictionary[lowerMatched];
            if (replacement) {
              replacements++;
              return preserveCase(matched, replacement);
            }
            return matched;
          });

          if (newText !== originalText) {
            node.characters = newText;
          }
          return replacements;
        } catch (error) {
          console.warn(`Failed to process node ${node.name}:`, error);
          return 0;
        }
      })
    );

    // Sum up replacements from this batch
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        totalReplacements += result.value;
      }
    });
  }

  return totalReplacements;
}

// Helper to load all fonts used in a text node (optimized)
async function loadNodeFonts(node: TextNode): Promise<void> {
  const fontNames = new Set<FontName>();

  try {
    // Strategy 1: Use getStyledTextSegments API (much faster)
    const segments = node.getStyledTextSegments(["fontName"]);
    segments.forEach((segment) => {
      if (segment.fontName && typeof segment.fontName === "object") {
        fontNames.add(segment.fontName);
      }
    });
  } catch {
    // Fallback: Sample-based detection (check every 10th character)
    const length = node.characters.length;
    const step = Math.max(1, Math.floor(length / 10));
    for (let i = 0; i < length; i += step) {
      const fontName = node.getRangeFontName(i, i + 1) as FontName;
      if (fontName && typeof fontName === "object") {
        fontNames.add(fontName);
      }
    }
    // Also check the last character to be safe
    if (length > 0) {
      const fontName = node.getRangeFontName(length - 1, length) as FontName;
      if (fontName && typeof fontName === "object") {
        fontNames.add(fontName);
      }
    }
  }

  // Batch load all unique fonts
  await Promise.all(
    Array.from(fontNames).map((fontName) => figma.loadFontAsync(fontName))
  );
}

// Message handler
figma.showUI(__html__, { width: 320, height: 480 });

figma.ui.onmessage = async (msg: {
  type: string;
  target?: Target;
}) => {
  if (msg.type === "scan" && msg.target) {
    const result = scanPage(msg.target);
    figma.ui.postMessage({ type: "scan-result", data: result });
  } else if (msg.type === "replace" && msg.target) {
    const count = await replacePage(msg.target);
    figma.ui.postMessage({ type: "replace-result", count });
  } else if (msg.type === "close") {
    figma.closePlugin();
  }
};

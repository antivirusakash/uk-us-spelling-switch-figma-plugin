import { getRegex, getDictionary, Target } from "@uk-us/core";

// Track highlighted elements and matched words
const highlightedElements: HTMLElement[] = [];
const matchedWords = new Set<string>();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ping') {
    // Respond to ping to confirm content script is loaded
    sendResponse({ loaded: true });
  } else if (request.type === 'highlight') {
    const result = highlightText(request.target);
    sendResponse({
      count: result.count,
      words: result.words
    });
  } else if (request.type === 'clear') {
    clearHighlights();
    sendResponse({ success: true });
  }
  return true;
});

// Detect if we're on a Google app
function isGoogleApp(): boolean {
  const hostname = window.location.hostname;
  return hostname.includes('docs.google.com') ||
         hostname.includes('sheets.google.com') ||
         hostname.includes('mail.google.com') ||
         hostname.includes('slides.google.com');
}

// Check if element should be skipped
function shouldSkipElement(element: Element | null): boolean {
  if (!element) return true;

  const tagName = element.tagName;
  const skipTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'CANVAS', 'SVG', 'VIDEO', 'AUDIO'];

  if (skipTags.includes(tagName)) return true;
  if (element.classList.contains('uk-us-highlight')) return true;

  // Skip contenteditable elements on Google apps
  if (isGoogleApp() && element.hasAttribute('contenteditable')) return true;

  return false;
}

// Get all text nodes including Shadow DOM
function getAllTextNodes(root: Node = document.body): Text[] {
  const textNodes: Text[] = [];

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (shouldSkipElement(parent)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  let node: Node | null;
  while (node = walker.nextNode()) {
    textNodes.push(node as Text);
  }

  // Traverse Shadow DOM
  const shadowHosts = root.querySelectorAll('*');
  shadowHosts.forEach((host) => {
    if (host.shadowRoot) {
      textNodes.push(...getAllTextNodes(host.shadowRoot));
    }
  });

  return textNodes;
}

// Highlight text in input/textarea elements
function highlightInFormFields(target: Target, regex: RegExp, dictionary: Record<string, string>): number {
  let matchCount = 0;
  const formFields = document.querySelectorAll('input[type="text"], textarea');

  formFields.forEach((field) => {
    const element = field as HTMLInputElement | HTMLTextAreaElement;
    const text = element.value;
    const matches = Array.from(text.matchAll(regex));

    if (matches.length > 0) {
      // For form fields, we just count but don't modify
      // (modifying would break user input)
      matchCount += matches.length;

      // Collect matched words
      matches.forEach((match) => {
        matchedWords.add(match[0].toLowerCase());
      });

      // Add visual indicator class
      element.classList.add(`uk-us-form-field-${target.toLowerCase()}`);
      element.setAttribute('data-uk-us-matches', matches.length.toString());
    }
  });

  return matchCount;
}

// Highlight text function with hybrid approach
function highlightText(target: Target): { count: number; words: string[] } {
  // Clear previous highlights and matched words
  clearHighlights();
  matchedWords.clear();

  // Highlighting UK spellings means scanning with the UK source dictionary (target 'US'), and vice versa
  const detectionTarget: Target = target === "UK" ? "US" : "UK";
  const regex = getRegex(detectionTarget);
  const dictionary = getDictionary(detectionTarget);
  let matchCount = 0;

  // Handle form fields separately
  matchCount += highlightInFormFields(target, regex, dictionary);

  // For Google apps, use a safer approach
  if (isGoogleApp()) {
    const count = highlightTextSafe(target, regex, dictionary, matchCount);
    return {
      count,
      words: Array.from(matchedWords).sort()
    };
  }

  // Standard approach for regular websites
  const textNodes = getAllTextNodes();

  // Process each text node
  textNodes.forEach((textNode) => {
    const text = textNode.textContent || '';
    const matches = Array.from(text.matchAll(regex));

    if (matches.length === 0) return;

    const parent = textNode.parentElement;
    if (!parent) return;

    // Create document fragment with highlighted words
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    matches.forEach((match) => {
      const matchIndex = match.index!;
      const matchedWord = match[0];

      // Collect matched word
      matchedWords.add(matchedWord.toLowerCase());

      // Add text before match
      if (matchIndex > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.substring(lastIndex, matchIndex))
        );
      }

      // Create highlight span
      const span = document.createElement('span');
      span.className = `uk-us-highlight uk-us-highlight-${target.toLowerCase()}`;
      span.textContent = matchedWord;
      span.title = `${target} spelling: ${matchedWord} → ${dictionary[matchedWord.toLowerCase()] || matchedWord}`;
      fragment.appendChild(span);

      highlightedElements.push(span);
      matchCount++;

      lastIndex = matchIndex + matchedWord.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    // Replace text node with fragment
    parent.replaceChild(fragment, textNode);
  });

  return {
    count: matchCount,
    words: Array.from(matchedWords).sort()
  };
}

// Safe highlighting for Google apps (non-destructive)
function highlightTextSafe(target: Target, regex: RegExp, dictionary: Record<string, string>, currentCount: number): number {
  let matchCount = currentCount;

  // Get all visible text (but don't modify DOM)
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (shouldSkipElement(parent)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes: Text[] = [];
  let node: Node | null;
  while (node = walker.nextNode()) {
    textNodes.push(node as Text);
  }

  // Just count matches and add CSS classes to parent elements
  textNodes.forEach((textNode) => {
    const text = textNode.textContent || '';
    const matches = Array.from(text.matchAll(regex));

    if (matches.length > 0) {
      matchCount += matches.length;

      // Collect matched words
      matches.forEach((match) => {
        matchedWords.add(match[0].toLowerCase());
      });

      // Add class to parent instead of modifying text
      const parent = textNode.parentElement;
      if (parent && !parent.classList.contains('uk-us-highlight')) {
        parent.classList.add('uk-us-safe-highlight');
        parent.setAttribute('data-uk-us-target', target.toLowerCase());
        parent.setAttribute('data-uk-us-matches', matches.length.toString());
        highlightedElements.push(parent as HTMLElement);
      }
    }
  });

  return matchCount;
}

// Clear all highlights
function clearHighlights() {
  highlightedElements.forEach((element) => {
    const parent = element.parentElement;

    // Remove safe highlight classes
    if (element.classList.contains('uk-us-safe-highlight')) {
      element.classList.remove('uk-us-safe-highlight');
      element.removeAttribute('data-uk-us-target');
      element.removeAttribute('data-uk-us-matches');
    }
    // Standard highlight removal
    else if (parent) {
      const textNode = document.createTextNode(element.textContent || '');
      parent.replaceChild(textNode, element);
      parent.normalize();
    }
  });

  // Clear form field indicators
  document.querySelectorAll('[data-uk-us-matches]').forEach((field) => {
    field.classList.remove('uk-us-form-field-uk', 'uk-us-form-field-us');
    field.removeAttribute('data-uk-us-matches');
  });

  highlightedElements.length = 0;
}

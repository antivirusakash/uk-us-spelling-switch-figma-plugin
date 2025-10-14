// UK to US spelling dictionary
const ukToUs: Record<string, string> = {
  // -our/-or words (common in business/customer service)
  favourite: "favorite",
  colour: "color",
  honour: "honor",
  neighbour: "neighbor",
  flavour: "flavor",
  labour: "labor",
  rumour: "rumor",
  humour: "humor",
  vigour: "vigor",
  harbour: "harbor",
  splendour: "splendor",

  // -ise/-ize verbs (critical for contact center language)
  organise: "organize",
  organised: "organized",
  organising: "organizing",
  organisation: "organization",
  analyse: "analyze",
  analysed: "analyzed",
  analysing: "analyzing",
  apologise: "apologize",
  apologised: "apologized",
  apologising: "apologizing",
  recognise: "recognize",
  recognised: "recognized",
  recognising: "recognizing",
  realise: "realize",
  realised: "realized",
  realising: "realizing",
  authorise: "authorize",
  authorised: "authorized",
  authorising: "authorizing",
  authorisation: "authorization",
  customise: "customize",
  customised: "customized",
  customising: "customizing",
  customisation: "customization",
  prioritise: "prioritize",
  prioritised: "prioritized",
  prioritising: "prioritizing",
  prioritisation: "prioritization",
  specialise: "specialize",
  specialised: "specialized",
  specialising: "specializing",
  specialisation: "specialization",
  summarise: "summarize",
  summarised: "summarized",
  summarising: "summarizing",
  categorise: "categorize",
  categorised: "categorized",
  categorising: "categorizing",
  categorisation: "categorization",
  standardise: "standardize",
  standardised: "standardized",
  standardising: "standardizing",
  standardisation: "standardization",
  optimise: "optimize",
  optimised: "optimized",
  optimising: "optimizing",
  optimisation: "optimization",
  maximise: "maximize",
  maximised: "maximized",
  maximising: "maximizing",
  maximisation: "maximization",
  minimise: "minimize",
  minimised: "minimized",
  minimising: "minimizing",
  minimisation: "minimization",
  utilise: "utilize",
  utilised: "utilized",
  utilising: "utilizing",
  utilisation: "utilization",
  visualise: "visualize",
  visualised: "visualized",
  visualising: "visualizing",
  visualisation: "visualization",
  finalise: "finalize",
  finalised: "finalized",
  finalising: "finalizing",
  finalisation: "finalization",
  initialise: "initialize",
  initialised: "initialized",
  initialising: "initializing",
  initialisation: "initialization",
  synchronise: "synchronize",
  synchronised: "synchronized",
  synchronising: "synchronizing",
  synchronisation: "synchronization",
  digitise: "digitize",
  digitised: "digitized",
  digitising: "digitizing",
  digitisation: "digitization",

  // Double consonant differences (common in communications)
  travelling: "traveling",
  travelled: "traveled",
  traveller: "traveler",
  labelled: "labeled",
  labelling: "labeling",
  modelling: "modeling",
  modelled: "modeled",
  signalling: "signaling",
  signalled: "signaled",
  counsellor: "counselor",
  counselling: "counseling",
  counselled: "counseled",

  // -re/-er endings (location/measurement terms)
  theatre: "theater",
  centre: "center",
  metre: "meter",
  litre: "liter",
  fibre: "fiber",
  calibre: "caliber",

  // -ce/-se words (common verbs/nouns)
  defence: "defense",
  offence: "offense",
  licence: "license",
  practise: "practice",
  pretence: "pretense",

  // -gue/-g endings
  catalogue: "catalog",
  dialogue: "dialog",
  analogue: "analog",
  monologue: "monolog",

  // -ogue/-og words (technical/business)
  epilogue: "epilog",
  prologue: "prolog",

  // Miscellaneous common words
  mould: "mold",
  aluminium: "aluminum",
  cheque: "check",
  tyre: "tire",
  programme: "program",
  grey: "gray",

  // Additional business/contact center terms
  manoeuvre: "maneuver",
  manoeuvred: "maneuvered",
  manoeuvring: "maneuvering",
  judgement: "judgment",
  acknowledgement: "acknowledgment",
  skilful: "skillful",
  fulfilment: "fulfillment",
  enrolment: "enrollment",
  instalment: "installment",

  // ae/e words (less common but professional)
  encyclopaedia: "encyclopedia",
  mediaeval: "medieval",

  // -yse/-yze words (analysis terms)
  paralyse: "paralyze",
  paralysed: "paralyzed",
  paralysing: "paralyzing",

  // SaaS Business & Monetization (critical -ise/-ize verbs)
  monetise: "monetize",
  monetised: "monetized",
  monetising: "monetizing",
  monetisation: "monetization",
  commercialise: "commercialize",
  commercialised: "commercialized",
  commercialising: "commercializing",
  commercialisation: "commercialization",
  centralise: "centralize",
  centralised: "centralized",
  centralising: "centralizing",
  centralisation: "centralization",
  decentralise: "decentralize",
  decentralised: "decentralized",
  decentralising: "decentralizing",
  decentralisation: "decentralization",
  personalise: "personalize",
  personalised: "personalized",
  personalising: "personalizing",
  personalisation: "personalization",
  incentivise: "incentivize",
  incentivised: "incentivized",
  incentivising: "incentivizing",
  incentivisation: "incentivization",

  // Product & Feature Development
  modularise: "modularize",
  modularised: "modularized",
  modularising: "modularizing",
  modularisation: "modularization",
  containerise: "containerize",
  containerised: "containerized",
  containerising: "containerizing",
  containerisation: "containerization",
  parameterise: "parameterize",
  parameterised: "parameterized",
  parameterising: "parameterizing",
  parameterisation: "parameterization",
  serialise: "serialize",
  serialised: "serialized",
  serialising: "serializing",
  serialisation: "serialization",
  tokenise: "tokenize",
  tokenised: "tokenized",
  tokenising: "tokenizing",
  tokenisation: "tokenization",

  // User Experience & Design
  contextualise: "contextualize",
  contextualised: "contextualized",
  contextualising: "contextualizing",
  contextualisation: "contextualization",
  localise: "localize",
  localised: "localized",
  localising: "localizing",
  localisation: "localization",
  internationalise: "internationalize",
  internationalised: "internationalized",
  internationalising: "internationalizing",
  internationalisation: "internationalization",
  globalise: "globalize",
  globalised: "globalized",
  globalising: "globalizing",
  globalisation: "globalization",

  // Collaboration & Communication
  harmonise: "harmonize",
  harmonised: "harmonized",
  harmonising: "harmonizing",
  harmonisation: "harmonization",
  socialise: "socialize",
  socialised: "socialized",
  socialising: "socializing",
  socialisation: "socialization",
  democratise: "democratize",
  democratised: "democratized",
  democratising: "democratizing",
  democratisation: "democratization",

  // Analytics & Intelligence
  characterise: "characterize",
  characterised: "characterized",
  characterising: "characterizing",
  characterisation: "characterization",
  parametrise: "parametrize",
  parametrised: "parametrized",
  parametrising: "parametrizing",
  normalise: "normalize",
  normalised: "normalized",
  normalising: "normalizing",
  normalisation: "normalization",
  denormalise: "denormalize",
  denormalised: "denormalized",
  denormalising: "denormalizing",
  denormalisation: "denormalization",

  // Security & Compliance
  anonymise: "anonymize",
  anonymised: "anonymized",
  anonymising: "anonymizing",
  anonymisation: "anonymization",
  sanitise: "sanitize",
  sanitised: "sanitized",
  sanitising: "sanitizing",
  sanitisation: "sanitization",

  // Automation & Processes
  automatise: "automatize",
  automatised: "automatized",
  automatising: "automatizing",
  automatisation: "automatization",
  mobilise: "mobilize",
  mobilised: "mobilized",
  mobilising: "mobilizing",
  mobilisation: "mobilization",
  revolutionise: "revolutionize",
  revolutionised: "revolutionized",
  revolutionising: "revolutionizing",

  // Infrastructure & Operations
  virtualise: "virtualize",
  virtualised: "virtualized",
  virtualising: "virtualizing",
  virtualisation: "virtualization",
  stabilise: "stabilize",
  stabilised: "stabilized",
  stabilising: "stabilizing",
  stabilisation: "stabilization",

  // Marketing & Growth
  materialise: "materialize",
  materialised: "materialized",
  materialising: "materializing",
  capitalise: "capitalize",
  capitalised: "capitalized",
  capitalising: "capitalizing",
  capitalisation: "capitalization",
  evangelise: "evangelize",
  evangelised: "evangelized",
  evangelising: "evangelizing",

  // General SaaS terminology
  artefact: "artifact",
  artefacts: "artifacts",

  // Common adjectives in SaaS
  ageing: "aging",
  focussed: "focused",
  focussing: "focusing",
  targetting: "targeting",
  targetted: "targeted",

  // === PRODUCT AREA SPECIFIC TERMS ===

  // Calibration & Quality Assurance
  equalise: "equalize",
  equalised: "equalized",
  equalising: "equalizing",
  equalisation: "equalization",
  rationalise: "rationalize",
  rationalised: "rationalized",
  rationalising: "rationalizing",
  rationalisation: "rationalization",
  scrutinise: "scrutinize",
  scrutinised: "scrutinized",
  scrutinising: "scrutinizing",
  itemise: "itemize",
  itemised: "itemized",
  itemising: "itemizing",
  itemisation: "itemization",
  compartmentalise: "compartmentalize",
  compartmentalised: "compartmentalized",
  compartmentalising: "compartmentalizing",
  compartmentalisation: "compartmentalization",

  // AI & Machine Learning
  generalise: "generalize",
  generalised: "generalized",
  generalising: "generalizing",
  generalisation: "generalization",
  theorise: "theorize",
  theorised: "theorized",
  theorising: "theorizing",
  hypothesise: "hypothesize",
  hypothesised: "hypothesized",
  hypothesising: "hypothesizing",
  memorise: "memorize",
  memorised: "memorized",
  memorising: "memorizing",
  memorisation: "memorization",
  immunise: "immunize",
  immunised: "immunized",
  immunising: "immunizing",
  immunisation: "immunization",
  randomise: "randomize",
  randomised: "randomized",
  randomising: "randomizing",
  randomisation: "randomization",
  vaporise: "vaporize",
  vaporised: "vaporized",
  vaporising: "vaporizing",

  // AI Studio & Model Training
  idealise: "idealize",
  idealised: "idealized",
  idealising: "idealizing",
  idealisation: "idealization",
  familiarise: "familiarize",
  familiarised: "familiarized",
  familiarising: "familiarizing",
  familiarisation: "familiarization",
  actualise: "actualize",
  actualised: "actualized",
  actualising: "actualizing",
  actualisation: "actualization",

  // Evidence & Documentation
  memorialise: "memorialize",
  memorialised: "memorialized",
  memorialising: "memorializing",
  memorialisation: "memorialization",
  formalise: "formalize",
  formalised: "formalized",
  formalising: "formalizing",
  formalisation: "formalization",
  legalise: "legalize",
  legalised: "legalized",
  legalising: "legalizing",
  legalisation: "legalization",
  penalise: "penalize",
  penalised: "penalized",
  penalising: "penalizing",
  penalisation: "penalization",

  // Interaction & Communication
  emphasise: "emphasize",
  emphasised: "emphasized",
  emphasising: "emphasizing",
  publicise: "publicize",
  publicised: "publicized",
  publicising: "publicizing",
  publicisation: "publicization",
  popularise: "popularize",
  popularised: "popularized",
  popularising: "popularizing",
  popularisation: "popularization",
  verbalise: "verbalize",
  verbalised: "verbalized",
  verbalising: "verbalizing",
  verbalisation: "verbalization",
  vocalise: "vocalize",
  vocalised: "vocalized",
  vocalising: "vocalizing",
  vocalisation: "vocalization",

  // Assignments & Workflow
  reorganise: "reorganize",
  reorganised: "reorganized",
  reorganising: "reorganizing",
  reorganisation: "reorganization",
  deputise: "deputize",
  deputised: "deputized",
  deputising: "deputizing",
  deputisation: "deputization",
  alphabetise: "alphabetize",
  alphabetised: "alphabetized",
  alphabetising: "alphabetizing",

  // Coaching & Training
  criticise: "criticize",
  criticised: "criticized",
  criticising: "criticizing",
  energise: "energize",
  energised: "energized",
  energising: "energizing",
  revitalise: "revitalize",
  revitalised: "revitalized",
  revitalising: "revitalizing",
  revitalisation: "revitalization",
  empathise: "empathize",
  empathised: "empathized",
  empathising: "empathizing",
  sensitise: "sensitize",
  sensitised: "sensitized",
  sensitising: "sensitizing",
  sensitisation: "sensitization",
  desensitise: "desensitize",
  desensitised: "desensitized",
  desensitising: "desensitizing",
  desensitisation: "desensitization",
  dramatise: "dramatize",
  dramatised: "dramatized",
  dramatising: "dramatizing",
  dramatisation: "dramatization",

  // Automation & Process Optimization
  mechanise: "mechanize",
  mechanised: "mechanized",
  mechanising: "mechanizing",
  mechanisation: "mechanization",
  economise: "economize",
  economised: "economized",
  economising: "economizing",
  computerise: "computerize",
  computerised: "computerized",
  computerising: "computerizing",
  computerisation: "computerization",
  robotise: "robotize",
  robotised: "robotized",
  robotising: "robotizing",

  // Strategy & Planning
  strategise: "strategize",
  strategised: "strategized",
  strategising: "strategizing",
  jeopardise: "jeopardize",
  jeopardised: "jeopardized",
  jeopardising: "jeopardizing",
  conceptualise: "conceptualize",
  conceptualised: "conceptualized",
  conceptualising: "conceptualizing",
  conceptualisation: "conceptualization",

  // Performance & Metrics
  underutilise: "underutilize",
  underutilised: "underutilized",
  underutilising: "underutilizing",
  overemphasise: "overemphasize",
  overemphasised: "overemphasized",
  overemphasising: "overemphasizing",

  // Common product terminology
  behaviour: "behavior",
  behaviours: "behaviors",
  behavioural: "behavioral",
  favour: "favor",
  favours: "favors",
  favourable: "favorable",
  favourably: "favorably",
  unfavourable: "unfavorable",
  endeavour: "endeavor",
  endeavours: "endeavors",
  endeavoured: "endeavored",
  endeavouring: "endeavoring",
};

// Generate reverse mapping at runtime
const usToUk: Record<string, string> = {};
Object.entries(ukToUs).forEach(([uk, us]) => {
  usToUk[us] = uk;
});

// Type definitions
type Target = "US" | "UK";

interface ScanResult {
  totalMatches: number;
  counts: Record<string, number>;
  uniqueWords: string[];
  nodeHits: Array<{
    id: string;
    name: string;
    matches: Array<{ from: string; to: string; count: number }>;
  }>;
}

// Build regex for word matching (optimized with longest-match-first)
function buildRegex(dictionary: Record<string, string>): RegExp {
  // Sort words by length (longest first) to ensure proper matching
  // This prevents shorter words from matching before their longer variants
  const words = Object.keys(dictionary)
    .sort((a, b) => b.length - a.length)
    .join("|");
  return new RegExp(`\\b(${words})\\b`, "gi");
}

// Cache compiled regexes at module level
let cachedUkToUsRegex: RegExp | null = null;
let cachedUsToUkRegex: RegExp | null = null;

// Get cached regex for target
function getRegex(target: Target): RegExp {
  if (target === "US") {
    if (!cachedUkToUsRegex) {
      cachedUkToUsRegex = buildRegex(ukToUs);
    }
    return cachedUkToUsRegex;
  } else {
    if (!cachedUsToUkRegex) {
      cachedUsToUkRegex = buildRegex(usToUk);
    }
    return cachedUsToUkRegex;
  }
}

// Case-aware replacement function
function preserveCase(original: string, replacement: string): string {
  // Check if all uppercase
  if (original === original.toUpperCase()) {
    return replacement.toUpperCase();
  }

  // Check if title case (first letter upper, rest lower)
  if (
    original[0] === original[0].toUpperCase() &&
    original.slice(1) === original.slice(1).toLowerCase()
  ) {
    return replacement[0].toUpperCase() + replacement.slice(1).toLowerCase();
  }

  // Default to lowercase
  return replacement.toLowerCase();
}

// Scan function
function scanPage(target: Target): ScanResult {
  const dictionary = target === "US" ? ukToUs : usToUk;
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
  const dictionary = target === "US" ? ukToUs : usToUk;
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

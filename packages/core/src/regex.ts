import { Target } from "./types";
import { ukToUs, usToUk } from "./dictionary";

// Build regex for word matching (optimized with longest-match-first)
export function buildRegex(dictionary: Record<string, string>): RegExp {
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
export function getRegex(target: Target): RegExp {
  if (target === "US") {
    // To convert to US, find UK words (keys of ukToUs)
    if (!cachedUkToUsRegex) {
      cachedUkToUsRegex = buildRegex(ukToUs);
    }
    return cachedUkToUsRegex;
  } else {
    // To convert to UK, find US words (keys of usToUk)
    if (!cachedUsToUkRegex) {
      cachedUsToUkRegex = buildRegex(usToUk);
    }
    return cachedUsToUkRegex;
  }
}

// Get dictionary for target
export function getDictionary(target: Target): Record<string, string> {
  return target === "US" ? ukToUs : usToUk;
}

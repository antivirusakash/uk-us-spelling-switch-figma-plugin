// Type definitions
export type Target = "US" | "UK";

export interface ScanResult {
  totalMatches: number;
  counts: Record<string, number>;
  uniqueWords: string[];
  nodeHits: Array<{
    id: string;
    name: string;
    matches: Array<{ from: string; to: string; count: number }>;
  }>;
}

export interface Match {
  word: string;
  replacement: string;
  count: number;
}

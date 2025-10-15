// Case-aware replacement function
export function preserveCase(original: string, replacement: string): string {
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

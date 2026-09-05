/** Splits API-returned text into non-empty, trimmed lines — one bullet/row per line. */
export function toLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Splits API-returned text into paragraphs (blank-line separated), trimmed and non-empty. */
export function toParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((line) => line.trim())
    .filter(Boolean);
}

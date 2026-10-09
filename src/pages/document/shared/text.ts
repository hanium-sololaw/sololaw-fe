export function toLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function toParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((line) => line.trim())
    .filter(Boolean);
}

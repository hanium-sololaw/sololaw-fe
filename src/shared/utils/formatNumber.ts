/** Strips everything but digits (and leading zeros), e.g. "1,0a00" → "1000". */
export function toDigits(value: string): string {
  return value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
}

/** Adds a comma every 3 digits, e.g. "1000000" → "1,000,000". */
export function withCommas(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

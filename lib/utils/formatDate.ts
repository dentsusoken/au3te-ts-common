/**
 * Formats a Date object into a YYYY-MM-DD string.
 *
 * @param date - The Date object to format
 * @returns The formatted date string in YYYY-MM-DD format
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Formats a date into a CBOR date string representation (format: cbor:1004("YYYY-MM-DD"))
 * @param date The date to format
 * @returns A string in the format cbor:1004("YYYY-MM-DD")
 */
export const formatCborDate = (date: Date): string => {
  return `cbor:1004("${formatDate(date)}")`;
};

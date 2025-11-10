
export function formatNumber(input: number | string): string {
  if (input === null || input === undefined || input === "") return "";

  const matches = input.toString().match(/[\d,.]+/);
  if (!matches) return input.toString();

  const numericValue = parseFloat(matches[0].replace(/,/g, ""));
  if (isNaN(numericValue)) return input.toString();

  const formatted = numericValue.toLocaleString();

  return input.toString().replace(matches[0], formatted);
}

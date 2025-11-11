export function formatNumber(input: number | string): string {
  if (input === null || input === undefined || input === "") return "";

  const matches = input.toString().match(/[\d,.]+/);
  if (!matches) return input.toString();

  const numericValue = parseFloat(matches[0].replace(/,/g, ""));
  if (isNaN(numericValue)) return input.toString();

  const formatted = numericValue.toLocaleString();

  return input.toString().replace(matches[0], formatted);
}

export function swapLemfiAndNala(rates: any) {
  const copy = [...rates];
  const nalaIndex = copy.findIndex((r) => r.name === "Nala");
  const lemfiIndex = copy.findIndex((r) => r.name === "LemFi");

  if (nalaIndex === -1 || lemfiIndex === -1) return rates;

  [copy[nalaIndex], copy[lemfiIndex]] = [copy[lemfiIndex], copy[nalaIndex]];
  return copy;
}

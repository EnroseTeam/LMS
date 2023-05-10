export const currencyFormatter = (rawValue: number): string =>
  "₮" +
  new Intl.NumberFormat("mn-MN", {
    currency: "MNT",
    maximumFractionDigits: 0,
  }).format(rawValue);

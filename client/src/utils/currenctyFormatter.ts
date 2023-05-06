export const currencyFormatter = (rawValue: number): number =>
  Number(
    new Intl.NumberFormat("mn-MN", {
      currency: "MNT",
      maximumFractionDigits: 0,
    }).format(rawValue)
  );

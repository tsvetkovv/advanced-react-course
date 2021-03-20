export default function formatMoney(cents: number = 0): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });

  const dollars = cents / 100;
  return formatter.format(dollars);
}

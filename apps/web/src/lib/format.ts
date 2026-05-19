/**
 * Format a numeric amount as Indonesian Rupiah.
 *
 * @param amount   The numeric value to format.
 * @param decimals Number of decimal places (default 0 for unit prices, 2 for totals).
 */
export function formatCurrency(amount: number, decimals = 0): string {
  return `Rp${amount.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

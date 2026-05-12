import type { PriceItem, Prices } from "../types";
import { tokenPrices } from "../data/tokenPrices";

/**
 * NOTE:
 * - Currently using local mock data for UI development
 * - Replace with API call when backend is ready
 */

export async function getPrices(): Promise<{
  prices: Prices;
  tokens: string[];
}> {
  // 👉 DEV MODE: use local dataset
  const data: PriceItem[] = tokenPrices;

  // 👉 data already unique → no need dedupe logic
  const prices: Prices = Object.fromEntries(
    data.map((item) => [item.currency, item.price]),
  );

  return {
    prices,
    tokens: Object.keys(prices),
  };
}

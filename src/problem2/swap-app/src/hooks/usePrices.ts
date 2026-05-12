import { useQuery } from "@tanstack/react-query";

import { getPrices } from "../services";

export function usePrices(refreshInterval = 10000) {
  const query = useQuery({
    queryKey: ["prices"],
    queryFn: getPrices,

    // 🔥 auto polling (replace setInterval)
    refetchInterval: refreshInterval,

    // avoid unnecessary refetch
    refetchOnWindowFocus: false,

    // optional optimization
    staleTime: 5000,
  });

  return {
    prices: query.data?.prices ?? {},
    tokens: query.data?.tokens ?? [],
    loading: query.isLoading,
    error: query.error,
  };
}

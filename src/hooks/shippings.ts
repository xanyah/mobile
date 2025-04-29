import { useQuery } from "@tanstack/react-query";
import { getShippings } from "../api/shippings";

export const useShippings = (params?: any) => useQuery({
  queryKey: ['shippings', params],
  queryFn: () => getShippings(params),
})

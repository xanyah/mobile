import { useQuery } from "@tanstack/react-query";
import { getShipping, getShippingProducts, getShippings } from "../api/shippings";

export const useShippings = (params?: any) => useQuery({
  queryKey: ['shippings', params],
  queryFn: () => getShippings(params),
})

export const useShipping = (id?: string) => useQuery({
  queryKey: ['shippings', { id }],
  queryFn: () => getShipping(id),
  enabled: !!id,
})

export const useShippingProducts = (params?: any) => useQuery({
  queryKey: ['shippingProducts', params],
  queryFn: () => getShippingProducts(params),
})

import { useQuery } from '@tanstack/react-query';
import { getInventory, getInventoryProducts, getInventories } from '../api/inventories';

export const useInventories = (params?: any) => useQuery({
  queryKey: ['inventories', params],
  queryFn: () => getInventories(params),
});

export const useInventory = (id?: string) => useQuery({
  queryKey: ['inventories', { id }],
  queryFn: () => getInventory(id || ''),
  enabled: !!id,
});

export const useInventoryProducts = (params?: any) => useQuery({
  queryKey: ['inventoryProducts', params],
  queryFn: () => getInventoryProducts(params),
});

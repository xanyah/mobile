import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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

const parseLinkHeader = (linkHeader: string | undefined): number | undefined => {
  if (!linkHeader) return undefined;

  const nextLink = linkHeader.split(',').find(link => link.includes('rel="next"'));
  if (!nextLink) return undefined;

  const match = nextLink.match(/page=(\d+)/);
  return match ? parseInt(match[1], 10) : undefined;
};

export const useInventoryProducts = (params?: any) => useInfiniteQuery({
  queryKey: ['inventoryProducts', params],
  queryFn: ({ pageParam = 1 }) => getInventoryProducts({ ...params, page: pageParam }),
  getNextPageParam: (lastPage) => parseLinkHeader(lastPage.headers?.link),
  initialPageParam: 1,
});

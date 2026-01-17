import { useQuery } from '@tanstack/react-query';
import { validate } from 'uuid';
import { getCustomAttribute, getCustomAttributes } from '../api/custom-attributes';

export const useCustomAttributes = (params?: any) => useQuery({
  queryFn: () => getCustomAttributes(params),
  queryKey: ['customAttributes', params],
});

export const useCustomAttribute = (id?: CustomAttribute['id']) => useQuery({
  enabled: !!validate(id),
  queryFn: () => getCustomAttribute(id!),
  queryKey: ['customAttributes', { id }],
});

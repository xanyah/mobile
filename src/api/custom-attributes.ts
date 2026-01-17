import { apiClient } from '../constants/api-client';

export const getCustomAttributes = (params: Record<string, unknown>) =>
  apiClient.get<CustomAttribute[]>('v2/custom_attributes', { params });

export const getCustomAttribute = (id: CustomAttribute['id']) =>
  apiClient.get<CustomAttribute>(`v2/custom_attributes/${id}`);

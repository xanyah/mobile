import { decamelizeKeys } from 'humps';
import { apiClient } from '../constants/api-client';

export const getStores = params =>
  apiClient.get<Store[]>('v2/stores', decamelizeKeys({ params }));

export const getStoreMemberships = params =>
  apiClient.get<StoreMembership[]>('v2/store_memberships', decamelizeKeys({ params }));

export const updateStore = (storeId, params) =>
  apiClient.patch<Store>(`v2/stores/${storeId}`, decamelizeKeys(params));

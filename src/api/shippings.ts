import {decamelizeKeys} from 'humps';
import {apiClient} from '../constants/api-client';

export const getShippings = params =>
  apiClient.get<Shipping[]>('v2/shippings', decamelizeKeys({params}));

export const getShipping = (shippingId?: string) =>
  apiClient.get<Shipping>(`v2/shippings/${shippingId}`);

export const updateShipping = (shippingId: string, params) =>
  apiClient.patch<Shipping>(
    `v2/shippings/${shippingId}`,
    decamelizeKeys(params),
  );

export const validateShipping = (shippingId: string) =>
  apiClient.patch<Shipping>(`v2/shippings/${shippingId}/validate`);

export const cancelShipping = (shippingId: string) =>
  apiClient.patch<Shipping>(`v2/shippings/${shippingId}/cancel`);

export const createShipping = (newShipping: string) =>
  apiClient.post<Shipping>('v2/shippings', decamelizeKeys(newShipping));

export const getShippingProducts = params =>
  apiClient.get<ShippingProduct[]>(
    'v2/shipping_products',
    decamelizeKeys({params}),
  );

export const getShippingProduct = (id: string) =>
  apiClient.get<ShippingProduct>(`v2/shipping_products/${id}`);

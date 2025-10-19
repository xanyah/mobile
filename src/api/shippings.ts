import { decamelizeKeys } from 'humps';
import { apiClient } from '../constants/api-client';

export const getShippings = params =>
  apiClient.get<Shipping[]>('v2/shippings', decamelizeKeys({ params }));

export const getShipping = shippingId =>
  apiClient.get<Shipping>(`v2/shippings/${shippingId}`);

export const updateShipping = (shippingId, params) =>
  apiClient.patch<Shipping>(`v2/shippings/${shippingId}`, decamelizeKeys(params));

export const validateShipping = shippingId =>
  apiClient.patch<Shipping>(`v2/shippings/${shippingId}/validate`);

export const cancelShipping = shippingId =>
  apiClient.patch<Shipping>(`v2/shippings/${shippingId}/cancel`);

export const createShipping = newShipping =>
  apiClient.post<Shipping>('v2/shippings', decamelizeKeys(newShipping));

export const getShippingProducts = params =>
  apiClient.get<ShippingProduct[]>('v2/shipping_products', decamelizeKeys({ params }));

export const getShippingProduct = id =>
  apiClient.get<ShippingProduct>(`v2/shipping_products/${id}`);

export const createShippingProduct = (params: { shippingId: Shipping['id'], productId: Product['id'], quantity: number }) =>
  apiClient.post<ShippingProduct>('v2/shipping_products', decamelizeKeys(params));

export const updateShippingProduct = (id: string, params: { quantity: number }) =>
  apiClient.patch<ShippingProduct>(`v2/shipping_products/${id}`, params);

export const deleteShippingProduct = (id: string) =>
  apiClient.delete<ShippingProduct>(`v2/shipping_products/${id}`);

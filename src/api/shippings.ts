import { decamelizeKeys } from 'humps';
import { apiClient } from '../constants/api-client';

export const getShippings = (params: Record<string, unknown>) =>
  apiClient.get<Shipping[]>('v2/shippings', decamelizeKeys({ params }));

export const getShipping = (shippingId: Shipping['id']) =>
  apiClient.get<Shipping>(`v2/shippings/${shippingId}`);

export const updateShipping = (shippingId: Shipping['id'], params: Record<string, unknown>) =>
  apiClient.patch<Shipping>(`v2/shippings/${shippingId}`, decamelizeKeys(params));

export const validateShipping = (shippingId: Shipping['id']) =>
  apiClient.patch<Shipping>(`v2/shippings/${shippingId}/validate`);

export const cancelShipping = (shippingId: Shipping['id']) =>
  apiClient.patch<Shipping>(`v2/shippings/${shippingId}/cancel`);

export const createShipping = (newShipping: Record<string, unknown>) =>
  apiClient.post<Shipping>('v2/shippings', decamelizeKeys(newShipping));

export const getShippingProducts = (params: Record<string, unknown>) =>
  apiClient.get<ShippingProduct[]>('v2/shipping_products', decamelizeKeys({ params }));

export const getShippingProduct = (id: ShippingProduct['id']) =>
  apiClient.get<ShippingProduct>(`v2/shipping_products/${id}`);

export const createShippingProduct = (params: { shippingId: Shipping['id'], productId: Product['id'], quantity: number }) =>
  apiClient.post<ShippingProduct>('v2/shipping_products', decamelizeKeys(params));

export const updateShippingProduct = (id: ShippingProduct['id'], params: { quantity: number }) =>
  apiClient.patch<ShippingProduct>(`v2/shipping_products/${id}`, params);

export const deleteShippingProduct = (id: ShippingProduct['id']) =>
  apiClient.delete<ShippingProduct>(`v2/shipping_products/${id}`);

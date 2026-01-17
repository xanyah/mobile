import { decamelizeKeys } from 'humps';
import { apiClient } from '../constants/api-client';

export const getProducts = (params: any) =>
  apiClient.get<Product[]>('v2/products', decamelizeKeys({ params }));

export const getNextProductSku = (params: any) =>
  apiClient.get<{ nextSku: number }>('v2/products/next_sku', decamelizeKeys({ params }));

export const getProduct = (productId: any) =>
  apiClient.get<Product>(`v2/products/${productId}`);

export const updateProduct = (productId: any, params: any) =>
  apiClient.patch<Product>(`v2/products/${productId}`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const createProduct = (newProduct: any) =>
  apiClient.post<Product>('v2/products', newProduct, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getProductByBarcode = (barcode: string) =>
  apiClient.get<Product[]>('v2/products', decamelizeKeys({ params: { 'q[skuOrUpcOrManufacturerSkuEq]': barcode } }));

export const deleteProductImage = (productId: string, signedId: string) =>
  apiClient.delete(`v2/products/${productId}/images/${signedId}`);

export const getAiSuggestions = (productId: string, params?: { title?: string, description?: string }) =>
  apiClient.post<{ title: string | null, description: string | null }>(`v2/products/${productId}/ai_suggestions`, decamelizeKeys(params), { timeout: 60000 });

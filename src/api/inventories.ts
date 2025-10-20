import { decamelizeKeys } from 'humps';
import { apiClient } from '../constants/api-client';

export const getInventories = (params: Record<string, unknown>) =>
  apiClient.get<Inventory[]>('v2/inventories', decamelizeKeys({ params }));

export const getInventory = (inventoryId: Inventory['id']) =>
  apiClient.get<Inventory>(`v2/inventories/${inventoryId}`);

export const updateInventory = (inventoryId: Inventory['id'], params: Record<string, unknown>) =>
  apiClient.patch<Inventory>(`v2/inventories/${inventoryId}`, decamelizeKeys(params));

export const validateInventory = (inventoryId: Inventory['id']) =>
  apiClient.patch<Inventory>(`v2/inventories/${inventoryId}/validate`);

export const cancelInventory = (inventoryId: Inventory['id']) =>
  apiClient.patch<Inventory>(`v2/inventories/${inventoryId}/cancel`);

export const createInventory = (inventory: Record<string, unknown>) =>
  apiClient.post<Inventory>('v2/inventories', decamelizeKeys({ inventory }));

export const deleteInventory = (inventoryId: Inventory['id']) =>
  apiClient.delete<void>(`v2/inventories/${inventoryId}`);

export const getInventoryProducts = (params: Record<string, unknown>) =>
  apiClient.get<InventoryProduct[]>('v2/inventory_products', decamelizeKeys({ params }));

export const getInventoryProduct = (id: InventoryProduct['id']) =>
  apiClient.get<InventoryProduct>(`v2/inventory_products/${id}`);

export const createInventoryProduct = (params: { inventoryId: Inventory['id'], productId: Product['id'], quantity: number }) =>
  apiClient.post<InventoryProduct>('v2/inventory_products', decamelizeKeys(params));

export const updateInventoryProduct = (id: InventoryProduct['id'], params: { quantity: number }) =>
  apiClient.patch<InventoryProduct>(`v2/inventory_products/${id}`, params);

export const deleteInventoryProduct = (id: InventoryProduct['id']) =>
  apiClient.delete<InventoryProduct>(`v2/inventory_products/${id}`);

import {
  decamelizeKeys,
} from 'humps'

import { xanyahApi } from '../constants/xanyah-api'

// Auth
export const validateToken = () =>
  xanyahApi.get('auth/validate_token')
export const signIn = params =>
  xanyahApi.post('auth/sign_in', params)
export const signOut = () =>
  xanyahApi.delete('auth/sign_out')

// Inventories
export const createInventory = inventory =>
  xanyahApi.post('inventories', { inventory })
export const getInventories = params =>
  xanyahApi.get('inventories', { params })
export const lockInventory = id =>
  xanyahApi.patch(`inventories/${id}/lock`)
export const deleteInventory = id =>
  xanyahApi.delete(`inventories/${id}`)

// Inventory variants
export const getInventoryVariants = params =>
  xanyahApi.get('inventory_variants', { params: decamelizeKeys(params) })
export const getInventoryVariant = id =>
  xanyahApi.get(`inventory_variants/${id}`)
export const getInventoryVariantByInventory = (inventoryId, variantId) =>
  xanyahApi.get(`inventory_variants/${inventoryId}/${variantId}`)
export const updateInventoryVariant = (id, params) =>
  xanyahApi.patch(`inventory_variants/${id}`, params)

// Products
export const createProduct = (product, variant) =>
  xanyahApi.createProduct('products', { product, variant })

// Providers
export const getProviders = () =>
  xanyahApi.get('providers')

// Shippings
export const createShipping = shipping =>
  xanyahApi.post('shippings', { shipping })
export const getShippings = params =>
  xanyahApi.get('shippings', { params })
export const lockShipping = id =>
  xanyahApi.patch(`shippings/${id}/lock`)
export const deleteShipping = id =>
  xanyahApi.delete(`shippings/${id}`)

// Shipping variants
export const getShippingVariants = params =>
  xanyahApi.get('shipping_variants', { params: decamelizeKeys(params) })
export const getShippingVariant = id =>
  xanyahApi.get(`shipping_variants/${id}`)
export const getShippingVariantByShipping = (shippingId, variantId) =>
  xanyahApi.get(`shipping_variants/${shippingId}/${variantId}`)
export const updateShippingVariant = (id, params) =>
  xanyahApi.patch(`shipping_variants/${id}`, params)

// Stores
export const getStores = () =>
  xanyahApi.get('stores')

// Variants
export const getVariantByBarcode = barcode =>
  xanyahApi.get(`variants/${barcode}/by_barcode`)

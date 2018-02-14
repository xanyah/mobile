import { xanyahApi } from '../constants/xanyah-api'

export const validateToken = () => xanyahApi.get('auth/validate_token')

export const signIn = params => xanyahApi.post('auth/sign_in', params)

export const createInventory = inventory => xanyahApi.post('inventories', { inventory })
export const getInventories = params => xanyahApi.get('inventories', { params })

export const getInventoryVariants = params => xanyahApi.get('inventory_variants', { params })


export const getStores = () => xanyahApi.get('stores')

export const getVariantByBarcode = barcode => xanyahApi.get(`variants/${barcode}/by_barcode`)

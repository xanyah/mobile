import { decamelizeKeys } from 'humps'
import { apiClient } from '../constants/api-client'

export const getManufacturers = params =>
  apiClient.get<Manufacturer[]>('v2/manufacturers', decamelizeKeys({ params }))

export const getManufacturer = manufacturerId =>
  apiClient.get<Manufacturer>(`v2/manufacturers/${manufacturerId}`)

export const updateManufacturer = (manufacturerId, params) =>
  apiClient.patch<Manufacturer>(`v2/manufacturers/${manufacturerId}`, decamelizeKeys(params))

export const createManufacturer = newManufacturer =>
  apiClient.post<Manufacturer>('v2/manufacturers', decamelizeKeys(newManufacturer))

import { decamelizeKeys } from 'humps'
import { apiClient } from '../constants/api-client'

export const getProviders = params =>
  apiClient.get<Provider[]>('v2/providers', decamelizeKeys({ params }))

export const getProvider = providerId =>
  apiClient.get<Provider>(`v2/providers/${providerId}`)

export const updateProvider = (providerId, params) =>
  apiClient.patch<Provider>(`v2/providers/${providerId}`, decamelizeKeys(params))

export const createProvider = newProvider =>
  apiClient.post<Provider>('v2/providers', decamelizeKeys(newProvider))

/** @deprecated */
export const searchProvider = params =>
  apiClient.get('providers/search', decamelizeKeys({ params }))

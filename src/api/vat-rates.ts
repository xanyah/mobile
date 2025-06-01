import { decamelizeKeys } from 'humps'
import { apiClient } from '../constants/api-client'

export const getVatRates = params =>
  apiClient.get<VatRate[]>('v2/vat_rates', decamelizeKeys({ params }))

export const getVatRate = id =>
  apiClient.get<VatRate>(`v2/vat_rates/${id}`)

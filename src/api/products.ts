import { decamelizeKeys } from 'humps'
import { apiClient } from '../constants/api-client'

export const getProducts = (params: any) =>
  apiClient.get<Product[]>('v2/products', decamelizeKeys({ params }))

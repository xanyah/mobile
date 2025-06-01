import { decamelizeKeys } from 'humps'
import { apiClient } from '../constants/api-client'

export const getCategories = params =>
  apiClient.get<Category[]>('v2/categories', decamelizeKeys({ params }))

export const getCategory = categoryId =>
  apiClient.get<Category>(`v2/categories/${categoryId}`)

export const updateCategory = (categoryId, params) =>
  apiClient.patch<Category>(`v2/categories/${categoryId}`, decamelizeKeys(params))

export const createCategory = newCategory =>
  apiClient.post<Category>('v2/categories', decamelizeKeys(newCategory))

import { useQuery } from '@tanstack/react-query'
import { validate } from 'uuid'
import { getManufacturer, getManufacturers } from '../api'

export const useManufacturers = params => useQuery({
  queryFn: () => getManufacturers(params),
  queryKey: ['manufacturers', params],
})

export const useManufacturer = id => useQuery({
  enabled: validate(id),
  queryFn: () => getManufacturer(id),
  queryKey: ['manufacturers', { id }],
})

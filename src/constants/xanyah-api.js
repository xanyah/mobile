/* eslint-disable no-restricted-syntax, no-await-in-loop, no-param-reassign */

import axios from 'axios'
import {
  AsyncStorage,
} from 'react-native'
import {
  camelizeKeys,
  decamelizeKeys,
} from 'humps'

const keys = [
  'access-token',
  'client',
  'expiry',
  'token-type',
  'uid',
]

export const xanyahApi = axios.create({
  baseURL: 'https://xanyah-staging.herokuapp.com/',
  timeout: 5000,
})

xanyahApi.interceptors.request.use(async (config) => {
  for (const key of keys) {
    config.headers[key] = await AsyncStorage.getItem(`@Xanyah:${key}`)
  }
  config.data = decamelizeKeys(config.data)
  return config
}, error => Promise.reject(error))

xanyahApi.interceptors.response.use((response) => {
  keys.forEach((key) => {
    if (response.headers[key]) { AsyncStorage.setItem(`@Xanyah:${key}`, response.headers[key]) }
  })
  response.data = camelizeKeys(response.data)
  return response
}, error => Promise.reject(error))

export default xanyahApi

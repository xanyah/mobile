import axios from 'axios'
import {
  AsyncStorage,
} from 'react-native'
import {
  camelizeKeys,
  decamelizeKeys,
} from 'humps'

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
})

instance.interceptors.request.use(async config => {
  config.headers['access-token'] = await AsyncStorage.getItem('@Xanyah:access-token')
  config.headers['token-type'] = await AsyncStorage.getItem('@Xanyah:token-type')
  config.headers['client'] = await AsyncStorage.getItem('@Xanyah:client')
  config.headers['expiry'] = await AsyncStorage.getItem('@Xanyah:expiry')
  config.headers['uid'] = await AsyncStorage.getItem('@Xanyah:uid')
  config.data = decamelizeKeys(config.data)
  return config
}, error => Promise.reject(error))

instance.interceptors.response.use(response => {
  if (response.headers['access-token']) {
    AsyncStorage.setItem('@Xanyah:access-token', response.headers['access-token'])
  }
  if (response.headers['token-type']) {
    AsyncStorage.setItem('@Xanyah:token-type', response.headers['token-type'])
  }
  if (response.headers['client']) {
    AsyncStorage.setItem('@Xanyah:client', response.headers['client'])
  }
  if (response.headers['expiry']) {
    AsyncStorage.setItem('@Xanyah:expiry', response.headers['expiry'])
  }
  if (response.headers['uid']) {
    AsyncStorage.setItem('@Xanyah:uid', response.headers['uid'])
  }
  response.data = camelizeKeys(response.data)
  return response
}, error => Promise.reject(error))


export const validateToken = () => instance.get('auth/validate_token')

export const signIn = params => instance.post('auth/sign_in', params)

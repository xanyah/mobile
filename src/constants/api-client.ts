import axios from 'axios'
import {
  camelizeKeys,
  decamelizeKeys,
} from 'humps'
import SecureStorage from "react-native-fast-secure-storage";

export const apiClient = axios.create({
  baseURL: 'https://api.xanyah.io/',
  timeout: 5000,
})

apiClient.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = SecureStorage.getItemSync(`Xanyah:Bearer`)

    if (config.headers['Content-Type'] === 'application/json') {
      config.data = decamelizeKeys(config.data)
      config.params = decamelizeKeys(config.params)
    }

    return config
  },
  error => Promise.reject(error))

apiClient.interceptors.response.use(
  (response) => {
    response.data = camelizeKeys(response.data)
    return response
  },
  error => Promise.reject(error))

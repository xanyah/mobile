import { decamelizeKeys } from 'humps'
import { apiClient } from '../constants/api-client'

export const validateToken = () =>
  apiClient.get<AuthToken>('auth/validate_token')

export const getCurrentUser = () =>
  apiClient.get('v2/current_user')

export const signIn = (params: any) =>
  apiClient.post <AuthToken> ('oauth/token', decamelizeKeys(params))

export const signOut = (params: any) =>
  apiClient.post ('oauth/revoke', decamelizeKeys(params))

export const updateUserParams = (user: any) =>
  apiClient.patch('v2/current_user', decamelizeKeys({ user }))

import { xanyahApi } from '../constants/xanyah-api'

export const validateToken = () => xanyahApi.get('auth/validate_token')

export const signIn = params => xanyahApi.post('auth/sign_in', params)

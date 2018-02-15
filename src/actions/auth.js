import { AsyncStorage } from 'react-native'

import {
  AUTH_UPDATE_FIELD,
} from '../constants/actions'
import {
  signIn as apiSignIn,
  signOut as apiSignOut,
} from '../utils/api-helper'

export const updateAuthField = (field, value) => ({
  field,
  type: AUTH_UPDATE_FIELD,
  value,
})

export const signIn = (email, password, successCallback = null) =>
  (dispatch) => {
    dispatch(updateAuthField('loading', true))
    apiSignIn({ email, password })
      .then(() => {
        dispatch(updateAuthField('loading', false))
        dispatch(updateAuthField('signedIn', true))
        if (successCallback) {
          successCallback()
        }
      })
      .catch((r) => {
        dispatch(updateAuthField('loading', false))
        dispatch(updateAuthField('errors', r.response.data.errors))
      })
  }
export const signOut = successCallback =>
  dispatch =>
    apiSignOut()
      .then(() => {
        const keys = [
          'access-token',
          'client',
          'expiry',
          'token-type',
          'uid',
        ]
        keys.forEach(key =>
          AsyncStorage.removeItem(`@Xanyah:${key}`))
        dispatch(updateAuthField('signedIn', false))
        if (successCallback) {
          successCallback()
        }
      })

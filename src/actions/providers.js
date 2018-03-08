import {
  getProviders as getApiProviders,
} from '../utils/api-helper'
import {
  PROVIDERS_UPDATE_FIELD,
} from '../constants/actions'


export const updateProvidersField = (field, value) => ({
  field,
  type: PROVIDERS_UPDATE_FIELD,
  value,
})

export const getProviders = () =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateProvidersField('loading', true))
    getApiProviders({ storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateProvidersField('providers', data))
        dispatch(updateProvidersField('loading', false))
      })
  }

import {
  STORES_UPDATE_FIELD,
} from '../constants/actions'

import {
  getStores as getApiStores,
} from '../utils/api-helper'

export const updateStoresField = (field, value) => ({
  field,
  type: STORES_UPDATE_FIELD,
  value,
})

export const getStores = () =>
  dispatch => {
    dispatch(updateStoresField('loading', true))
    getApiStores()
      .then(({ data }) => {
        dispatch(updateStoresField('stores', data))
        dispatch(updateStoresField('loading', false))
      })
  }

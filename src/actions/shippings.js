import {
  createShipping as createApiShipping,
  getShippings as getApiShippings,
  getShippingVariants as getApiShippingVariants,
} from '../utils/api-helper'
import {
  SHIPPINGS_UPDATE_FIELD,
} from '../constants/actions'


export const updateShippingsField = (field, value) => ({
  field,
  type: SHIPPINGS_UPDATE_FIELD,
  value,
})

export const createShipping = providerId =>
  (dispatch, currentState) => {
    const state = currentState()
    createApiShipping({ providerId, storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateShippingsField('shippings', [
          ...state.shippings.shippings,
          data,
        ]))
        dispatch(updateShippingsField('currentShipping', data))
      })
  }

export const getShippings = () =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateShippingsField('loading', true))
    getApiShippings({ storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateShippingsField('shippings', data))
        dispatch(updateShippingsField('loading', false))
      })
  }

export const getShippingVariants = shippingId =>
  (dispatch) => {
    dispatch(updateShippingsField('loading', true))
    getApiShippingVariants({ shippingId })
      .then(({ data }) => {
        dispatch(updateShippingsField('variants', data))
        dispatch(updateShippingsField('loading', false))
      })
  }

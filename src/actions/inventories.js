import {
  INVENTORIES_UPDATE_FIELD,
} from '../constants/actions'

import {
  createInventory as createApiInventory,
  getInventories as getApiInventories,
  getInventoryVariants as getApiInventoryVariants,
} from '../utils/api-helper'

export const updateInventoriesField = (field, value) => ({
  field,
  type: INVENTORIES_UPDATE_FIELD,
  value,
})

export const createInventory = () =>
  (dispatch, currentState) => {
    const state = currentState()
    createApiInventory({ storeId: state.stores.stores[0].id })
      .then(({ data }) => {
        dispatch(updateInventoriesField('inventories', [
          ...state.inventories.inventories,
          data,
        ]))
        dispatch(updateInventoriesField('currentInventory', data))
      })
  }

export const getInventories = () =>
  (dispatch, currentState) => {
    const state = currentState()
    dispatch(updateInventoriesField('loading', true))
    getApiInventories({ storeId: state.stores.stores[0].id })
      .then(({ data }) => {
        dispatch(updateInventoriesField('inventories', data))
        dispatch(updateInventoriesField('loading', false))
      })
  }

export const getInventoryVariants = inventoryId =>
  (dispatch, currentState) => {
    dispatch(updateInventoriesField('loading', true))
    getApiInventoryVariants({ inventoryId })
      .then(({ data }) => {
        dispatch(updateInventoriesField('variants', data))
        dispatch(updateInventoriesField('loading', false))
      })
  }

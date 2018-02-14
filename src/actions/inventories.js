import {
  createInventory as createApiInventory,
  getInventories as getApiInventories,
  getInventoryVariants as getApiInventoryVariants,
} from '../utils/api-helper'
import {
  INVENTORIES_UPDATE_FIELD,
} from '../constants/actions'


export const updateInventoriesField = (field, value) => ({
  field,
  type: INVENTORIES_UPDATE_FIELD,
  value,
})

export const createInventory = () =>
  (dispatch, currentState) => {
    const state = currentState()
    createApiInventory({ storeId: state.stores.currentStore.id })
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
    getApiInventories({ storeId: state.stores.currentStore.id })
      .then(({ data }) => {
        dispatch(updateInventoriesField('inventories', data))
        dispatch(updateInventoriesField('loading', false))
      })
  }

export const getInventoryVariants = inventoryId =>
  (dispatch) => {
    dispatch(updateInventoriesField('loading', true))
    getApiInventoryVariants({ inventoryId })
      .then(({ data }) => {
        dispatch(updateInventoriesField('variants', data))
        dispatch(updateInventoriesField('loading', false))
      })
  }

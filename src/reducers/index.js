import { combineReducers } from 'redux'
import auth from './auth'
import inventories from './inventories'
import stores from './stores'

export const reducer = combineReducers({
  auth,
  inventories,
  stores,
})

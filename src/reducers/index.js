import { combineReducers } from 'redux'

import auth from './auth'
import inventories from './inventories'
import providers from './providers'
import shippings from './shippings'
import stores from './stores'

import { RootStackNavigator } from '../navigators'

const initialState = RootStackNavigator.router.getStateForAction(RootStackNavigator.router.getActionForPathAndParams('InitialLoading'))

const nav = (state = initialState, action) => {
  const nextState = RootStackNavigator.router.getStateForAction(action, state)

  return nextState || state
}

export const reducer = combineReducers({
  auth,
  inventories,
  nav,
  providers,
  shippings,
  stores,
})

export default reducer

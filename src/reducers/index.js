import { combineReducers } from 'redux'

import auth from './auth'
import camera from './camera'
import inventories from './inventories'
import notification from './notification'
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
  camera,
  inventories,
  nav,
  notification,
  providers,
  shippings,
  stores,
})

export default reducer

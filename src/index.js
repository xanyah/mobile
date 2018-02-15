import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import { ConnectedRootNavigator } from './navigators'

export default () => (
  <Provider store={store}>
    <ConnectedRootNavigator />
  </Provider>
)

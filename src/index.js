import React from 'react'
import {
  TouchableOpacity,
} from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import {
  signOut,
} from './actions'
import {
  Camera,
  Dashboard,
  InitialLoading,
  Inventory,
  Login,
} from './scenes'
import store from './store'
import { colors } from './constants/styles'

const RootNavigator = StackNavigator({
  Camera: {
    navigationOptions: {
      header: null,
    },
    screen: Camera,
  },
  Dashboard: {
    navigationOptions: {
      headerRight: <TouchableOpacity
        onPress={signOut}
        style={{
          backgroundColor: 'red',
          height: 20,
          width: 20,
        }}
      />,
    },
    screen: Dashboard,
  },
  InitialLoading: {
    navigationOptions: {
      header: null,
    },
    screen: InitialLoading,
  },
  Inventory: {
    screen: Inventory,
  },
  Login: {
    navigationOptions: {
      header: null,
    },
    screen: Login,
  },
}, {
  cardStyle: {
    backgroundColor: colors.white,
  },
  initialRouteName: 'InitialLoading',
})

export default () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
)

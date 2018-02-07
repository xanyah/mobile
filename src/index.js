import React from 'react'
import {
  TouchableOpacity,
  Platform,
  StatusBar,
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
  InitialLoading: {
    navigationOptions: {
      header: null,
    },
    screen: InitialLoading,
  },
  Camera: {
    navigationOptions: {
      header: null,
    },
    screen: Camera,
  },
  Login: {
    navigationOptions: {
      header: null,
    },
    screen: Login,
  },
  Dashboard: {
    navigationOptions: {
      headerRight: <TouchableOpacity
        onPress={signOut}
        style={{
          height: 20,
          width: 20,
          backgroundColor: 'red',
        }}
      />,
    },
    screen: Dashboard,
  },
  Inventory: {
    screen: Inventory,
  },
}, {
  cardStyle: {
    backgroundColor: colors.white,
  },
  initialRouteName: 'InitialLoading',
})

class App extends React.Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#1C277E')
    }
  }

  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    )
  }
}

export default App

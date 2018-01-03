import React from 'react'
import {
  Platform,
  StatusBar,
  Text,
} from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import {
  InitialLoading,
  Login,
} from './scenes'
import store from './store'

const RootNavigator = StackNavigator({
  InitialLoading: {
    navigationOptions: {
      header: null,
    },
    screen: InitialLoading,
  },
  Login: {
    navigationOptions: {
      header: null,
    },
    screen: Login,
  },
  Home: {
    screen: () => <Text>Home</Text>,
  },
}, {
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

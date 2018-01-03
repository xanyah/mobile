import React from 'react'
import {
  Platform,
  StatusBar,
  Text,
} from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import {
  Login,
} from './scenes'
import store from './store'

const RootNavigator = StackNavigator({
  Login: {
    navigationOptions: {
      header: null,
    },
    screen: Login,
  },
  Home: {
    screen: () => <Text>Home</Text>,
  },
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

/* eslint-disable react/prop-types */

import React from 'react'
import { connect } from 'react-redux'
import {
  BackHandler,
} from 'react-native'
import {
  StackNavigator,
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'

import { colors } from '../constants/styles'
import {
  Camera,
  Dashboard,
  InitialLoading,
  Inventory,
  Login,
  Shipping,
  ShippingForm,
} from '../scenes'
import HeaderLogoutButton from '../containers/header-logout-button'
import Notification from '../containers/notification'

export const RootStackNavigator = StackNavigator({
  Camera: {
    navigationOptions: {
      header: null,
    },
    screen: Camera,
  },
  Dashboard: {
    navigationOptions: {
      headerRight: <HeaderLogoutButton />,
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
  Shipping: {
    screen: Shipping,
  },
  ShippingForm: {
    screen: ShippingForm,
  },
}, {
  cardStyle: {
    backgroundColor: colors.white,
  },
  initialRouteName: 'InitialLoading',
})

const addListener = createReduxBoundAddListener('root')

export class RootNavigator extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.onBackPress())
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.onBackPress())
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }

  render() {
    const { nav, dispatch } = this.props

    return [
      <RootStackNavigator
        key="navigator"
        navigation={addNavigationHelpers({
          addListener,
          dispatch,
          state: nav,
        })}
      />,
      <Notification key="notification" />,
    ]
  }
}

const mapStateToProps = ({ nav }) => ({
  nav,
})

export const ConnectedRootNavigator = connect(mapStateToProps)(RootNavigator)

export default ConnectedRootNavigator

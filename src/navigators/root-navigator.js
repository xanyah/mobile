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

import { icons } from '../images'
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
import HeaderHello from '../containers/header-hello'
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
      headerLeft: <HeaderHello />,
      headerRight: <HeaderLogoutButton />,
      headerStyle: {
        backgroundColor: colors.white,
        borderBottomWidth: 0,
        borderColor: colors.white,
        elevation: 0,
      },
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
  navigationOptions: {
    headerBackImage: icons.previous,
    headerTitleStyle: {
      color: colors.secondaryBlue,
      fontSize: 18,
      fontWeight: '500',
      marginHorizontal: 20,
      textAlign: 'center',
      width: '100%',
    },
  },
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

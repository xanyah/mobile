/* eslint-disable react/prop-types */

import React from 'react'
import { connect } from 'react-redux'
import {
  StackNavigator,
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
} from '../scenes'
import HeaderLogoutButton from '../containers/header-logout-button'

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
}, {
  cardStyle: {
    backgroundColor: colors.white,
  },
  initialRouteName: 'InitialLoading',
})

const addListener = createReduxBoundAddListener('root')

export const RootNavigator = ({ nav, dispatch }) => (
  <RootStackNavigator
    navigation={addNavigationHelpers({
      addListener,
      dispatch,
      state: nav,
    })}
  />
)

const mapStateToProps = ({ nav }) => ({
  nav,
})

export const ConnectedRootNavigator = connect(mapStateToProps)(RootNavigator)

export default ConnectedRootNavigator

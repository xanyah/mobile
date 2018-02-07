import React from 'react'
import { Text } from 'react-native'
import { TabNavigator } from 'react-navigation'
import { colors } from '../../constants/styles'

import InventoriesDashboard from '../../containers/inventories-dashboard'

const Dashboard = TabNavigator({
  Shippings: {
    screen: () => <Text>Home</Text>,
  },
  Inventories: {
    screen: InventoriesDashboard,
  },
}, {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: 'top',
  tabBarOptions: {
    activeTintColor: colors.primaryBlue,
  },
})

export default Dashboard

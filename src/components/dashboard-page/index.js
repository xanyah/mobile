import React from 'react'
import { Text } from 'react-native'
import { TabNavigator } from 'react-navigation'

import { colors } from '../../constants/styles'
import InventoriesDashboard from '../../containers/inventories-dashboard'

const Dashboard = TabNavigator({
  Inventories: {
    screen: InventoriesDashboard,
  },
  Shippings: {
    screen: () => <Text>Home</Text>,
  },
}, {
  animationEnabled: true,
  initialRouteName: 'Shippings',
  order: [ 'Shippings', 'Inventories' ],
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: colors.primaryBlue,
  },
  tabBarPosition: 'top',
})

export default Dashboard

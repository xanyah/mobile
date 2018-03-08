import { TabNavigator } from 'react-navigation'

import { colors } from '../../constants/styles'
import InventoriesDashboard from '../../containers/inventories-dashboard'
import ShippingsDashboard from '../../containers/shippings-dashboard'

const Dashboard = TabNavigator({
  Inventories: {
    screen: InventoriesDashboard,
  },
  Shippings: {
    screen: ShippingsDashboard,
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

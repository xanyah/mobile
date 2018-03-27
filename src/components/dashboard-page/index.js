import {
  TabBarTop,
  TabNavigator,
} from 'react-navigation'

import { colors } from '../../constants/styles'
import InventoriesDashboard from '../../containers/inventories-dashboard'
import ShippingsDashboard from '../../containers/shippings-dashboard'
import I18n from '../../i18n'

const Dashboard = TabNavigator({
  [I18n.t('inventories')]: {
    screen: InventoriesDashboard,
  },
  [I18n.t('shippings')]: {
    screen: ShippingsDashboard,
  },
}, {
  animationEnabled: true,
  initialRouteName: I18n.t('shippings'),
  order: [ I18n.t('shippings'), I18n.t('inventories') ],
  swipeEnabled: true,
  tabBarComponent: TabBarTop,
  tabBarOptions: {
    activeTintColor: colors.primaryBlue,
    inactiveTintColor: colors.lightBlue,
    indicatorStyle: {
      backgroundColor: colors.primaryBlue,
    },
    labelStyle: {
      fontWeight: '500',
      width: '100%',
    },
    style: {
      backgroundColor: colors.white,
    },
  },
  tabBarPosition: 'top',
})

export default Dashboard

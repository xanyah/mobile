import React from 'react';
import {createStaticNavigation, StaticParamList} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons } from 'lucide-react-native';
import Profile from '../screens/profile';
import { InitialLoading, Shipping, ShippingNew, Shippings } from '../screens';
import SignIn from '../screens/signin';
import { useAuth } from '../contexts/AuthContext';

const getTabBarIcon = (iconName: keyof typeof icons) => (({ focused, color, size }: {
  focused: boolean;
  color: string;
  size: number;
}) => {
const LucideIcon = icons[iconName];
 return (
  <LucideIcon color={color} size={20} />
)
})

const ShippingsNavigator = createNativeStackNavigator({
  screens: {
    Shippings,
    Shipping,
    ShippingNew,
  },
  screenOptions: {
    headerShown: false,
  }
})

const MainBottomTabNavigator = createBottomTabNavigator({
  screens: {
    ShippingsNavigator: {
      screen: ShippingsNavigator,
      options: {
        tabBarIcon: getTabBarIcon('PackageOpen'),
      },
    },
    Inventories: {
      screen: Profile,
      options: {
        tabBarIcon: getTabBarIcon('ScanBarcode'),
      },
    },
    Profile: {
      screen: Profile,
      options: {
        tabBarIcon: getTabBarIcon('User')
      }
    },
  },
  screenOptions: {
    headerShown: false,
  }
});

const MainStackNavigator = createNativeStackNavigator({
  screens: {
    InitialLoading,
    MainBottomTabNavigator,
    SignIn,
  },
  initialRouteName: 'InitialLoading',
  screenOptions: {
    headerShown: false,
  }
});

const Navigator = createStaticNavigation(MainStackNavigator);

const AppNavigator = () => {
  const {isLoading} = useAuth();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
      <Navigator />
  );
};

type MainStackNavigatorParamList = StaticParamList<typeof MainStackNavigator>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackNavigatorParamList {}
  }
}

export default AppNavigator;

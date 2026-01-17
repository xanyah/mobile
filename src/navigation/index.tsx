import React from 'react';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons } from 'lucide-react-native';
import Profile from '../screens/profile';
import { InitialLoading, Inventories, Inventory, Shipping, ShippingNew, Shippings } from '../screens';
import SignIn from '../screens/signin';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const getTabBarLabel = (title: string) => ({ focused}: {focused: boolean}) => (
  <Text
  style={{
    color: focused ? '#9333ea' : '#d8b4fe',
    fontSize: 10,
    fontWeight: focused ? '600' : '500'
  }}
  >
    {title}
    </Text>
)

const getTabBarIcon = (iconName: keyof typeof icons) => (({ focused }: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  const LucideIcon = icons[iconName];
  return (
    <LucideIcon color={focused ? '#9333ea' : '#d8b4fe'} size={20} />
  );
});

const ShippingsNativeNavigator = createNativeStackNavigator()
const ShippingsNavigator = () => (
  <ShippingsNativeNavigator.Navigator screenOptions={{ headerShown: false }}>
    <ShippingsNativeNavigator.Screen name="Shippings" component={Shippings} />
    <ShippingsNativeNavigator.Screen name="Shipping" component={Shipping} />
    <ShippingsNativeNavigator.Screen name="ShippingNew" component={ShippingNew} />
  </ShippingsNativeNavigator.Navigator>
)

const InventoriesNativeNavigator = createNativeStackNavigator()
const InventoriesNavigator = () => (
  <InventoriesNativeNavigator.Navigator screenOptions={{ headerShown: false }}>
    <InventoriesNativeNavigator.Screen name="Inventories" component={Inventories} />
    <InventoriesNativeNavigator.Screen name="Inventory" component={Inventory} />
  </InventoriesNativeNavigator.Navigator>
)


const BottomTabNavigator = createBottomTabNavigator()
const MainBottomTabNavigator = () => {
  const { t } = useTranslation()

  return (
    <BottomTabNavigator.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabNavigator.Screen
        name="ShippingsNavigator"
        component={ShippingsNavigator}
        options={{
          tabBarLabel: getTabBarLabel(t('shippings.pageTitle')),
          tabBarIcon: getTabBarIcon('PackageOpen'),
        }}
      />
      <BottomTabNavigator.Screen
        name="InventoriesNavigator"
        component={InventoriesNavigator}
        options={{
          tabBarLabel: getTabBarLabel(t('inventories.pageTitle')),
          tabBarIcon: getTabBarIcon('ScanBarcode'),
        }}
      />
      <BottomTabNavigator.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: getTabBarLabel(t('profile.pageTitle')),
          tabBarIcon: getTabBarIcon('User'),
        }}
      />
    </BottomTabNavigator.Navigator>
  )
}

const MainStackNavigator = createNativeStackNavigator({
  screens: {
    InitialLoading,
    MainBottomTabNavigator,
    SignIn,
  },
  initialRouteName: 'InitialLoading',
  screenOptions: {
    headerShown: false,
  },
});

const Navigator = createStaticNavigation(MainStackNavigator);

const AppNavigator = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    interface RootParamList extends MainStackNavigatorParamList { }
  }
}

export default AppNavigator;

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import {icons} from 'lucide-react-native';
import ProfileScreen from '../../screens/profile';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Home Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Settings Screen</Text>
  </View>
);

const screenOptions = (name: string) => {
  const LucideIcon = icons[name];

  return {
    tabBarIcon: ({color}: {color: string; size: number}) => (
      <LucideIcon color={color} size={20} />
    ),
  };
};

export const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Livraisons"
        component={HomeScreen}
        options={screenOptions('PackageOpen')}
      />
      <Tab.Screen
        name="Inventaires"
        component={ProfileScreen}
        options={screenOptions('ScanBarcode')}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={screenOptions('User')}
      />
    </Tab.Navigator>
  );
};

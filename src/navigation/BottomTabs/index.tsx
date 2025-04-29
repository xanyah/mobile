import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons } from 'lucide-react-native';
import ProfileScreen from '../../screens/profile';
import { Shippings } from '../../screens';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const screenOptions = (name: string) => {
  const LucideIcon = icons[name as keyof typeof icons];

  return {
    tabBarIcon: ({ color }: { color: string; size: number }) => (
      <LucideIcon color={color} size={20} />
    ),
  };
};

export const BottomTabs = () => {
  const { t } = useTranslation()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={t('shippings.pageTitle')}
        component={Shippings}
        options={screenOptions('PackageOpen')}
      />
      <Tab.Screen
        name={t('inventories.pageTitle')}
        component={ProfileScreen}
        options={screenOptions('ScanBarcode')}
      />
      <Tab.Screen
        name={t('account.pageTitle')}
        component={ProfileScreen}
        options={screenOptions('User')}
      />
    </Tab.Navigator>
  );
};

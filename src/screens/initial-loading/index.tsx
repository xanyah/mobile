import { useEffect } from 'react';
import { getCurrentUser } from '../../api/auth';
import { useNavigation } from '@react-navigation/native';

const InitialLoading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    getCurrentUser()
      .then(() => navigation.reset({ key: '0', 'routes': [{ name: 'MainBottomTabNavigator' }] }))
      .catch(() => navigation.reset({ key: '0', 'routes': [{ name: 'SignIn' }] }));
  }, [navigation]);

  return null;
};

export default InitialLoading;

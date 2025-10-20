import { Button, MainLayout } from '../../components';
import { Container } from './styled-components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import { Text } from 'react-native';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut } from 'lucide-react-native';

type RootStackParamList = {
  SignIn: undefined;
  MainApp: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Profile = () => {
  const { t } = useTranslation()
  const { signOut, user } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const onSignOut = useCallback(() => {
    signOut();
    navigation.reset({ key: '0', 'routes': [{ name: 'SignIn' }] });
  }, [signOut, navigation]);

  return (
    <MainLayout title={t('profile.pageTitle')}>
      <Container>
        <Text>{user?.email}</Text>
        <Button onPress={onSignOut}>
          <LogOut color="#fff" />
          {t('profile.signOut')}
        </Button>
      </Container>
    </MainLayout>
  );
};

export default Profile;

import {Button} from '../../components';
import {Container} from './styled-components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../../contexts/AuthContext';
import {Text} from 'react-native';
import { useCallback } from 'react';

type RootStackParamList = {
  SignIn: undefined;
  MainApp: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Profile = () => {
  const {signOut, user} = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const onSignOut = useCallback(() => {
    signOut();
    navigation.reset({key: '0', 'routes': [{name: 'SignIn'}]});
  }, [signOut, navigation]);

  return (
    <Container>
      <Text>{user?.firstname}</Text>
      <Button onPress={onSignOut}>Se déconnecter</Button>
    </Container>
  );
};

export default Profile;

import {Button} from '../../components';
import {Container} from './styled-components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../../contexts/AuthContext';
import {Text} from 'react-native';

type RootStackParamList = {
  Signin: undefined;
  MainApp: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Profile = () => {
  const {signOut, user} = useAuth();
  const navigation = useNavigation<NavigationProp>();

  return (
    <Container>
      <Text>{user?.firstname}</Text>
      <Button onPress={() => signOut()}>Se déconnecter</Button>
    </Container>
  );
};

export default Profile;

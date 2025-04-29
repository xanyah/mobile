import { FlatList, SafeAreaView } from 'react-native';
import { MainLayout, ShippingState } from '../../components';
import { Date, LeftContainer, RightContainer, ShippingContainer, Title } from './styled-components';
import { useShippings } from '../../hooks';
import { ArrowRight } from 'lucide-react-native';
import { head, split } from 'lodash';
import { DateTime } from 'luxon';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Shippings = () => {
  const {t} = useTranslation()
  const navigation = useNavigation()
  const { data, refetch, isFetching } = useShippings({
    'q[s]': 'created_at desc',
  })

  return (
    <MainLayout title={t('shippings.pageTitle')}>
    <FlatList
      style={{flex: 1}}
      data={data?.data}
      renderItem={({ item }) => (
        <ShippingContainer onPress={() => navigation.navigate('MainBottomTabNavigator', {screen: 'Shippings', params: {screen: 'Shipping', params: {id: item.id}}})}>
          <LeftContainer>
            <Title>{head(split(item.id, '-'))} - {item.provider.name}</Title>
            <Date>{DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED)}</Date>
          </LeftContainer>
          <RightContainer>
            <ShippingState state={item.state} />
            <ArrowRight />
          </RightContainer>
        </ShippingContainer>
      )}
      refreshing={isFetching}
      onRefresh={() => refetch()}
      keyExtractor={item => item.id}
    />
    </MainLayout>
  );
};

export default Shippings;

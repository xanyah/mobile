import { FlatList } from 'react-native';
import { MainLayout, ShippingState } from '../../components';
import { Date, LeftContainer, RightContainer, ShippingContainer, ShippingIdContainer, ShippingIdContent, ShippingNameContainer, Title } from './styled-components';
import { useShippings } from '../../hooks';
import { ArrowRight, PlusIcon } from 'lucide-react-native';
import { head, split } from 'lodash';
import { DateTime } from 'luxon';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

const Shippings = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const { data, refetch, isFetching } = useShippings({
    'q[s]': 'created_at desc',
  });

  const openShipping = useCallback((shippingId?: Shipping['id']) => {
    if (shippingId) {
    navigation.navigate('MainBottomTabNavigator', {screen: 'ShippingsNavigator', params: {screen: 'Shipping', params: {id: shippingId}}});
    } else {
    navigation.navigate('MainBottomTabNavigator', {screen: 'ShippingsNavigator', params: {screen: 'ShippingNew'}});
    }
  },[ navigation]);

  return (
    <MainLayout
    title={t('shippings.pageTitle')}
    rightIcon={PlusIcon}
      rightAction={() => openShipping()}>
    <FlatList
      style={{flex: 1}}
      data={data?.data}
      renderItem={({ item }) => (
        <ShippingContainer onPress={() => openShipping(item.id)}>
          <LeftContainer>
            <ShippingNameContainer>
            <Title>{item.provider.name}</Title>
            <ShippingIdContainer>
              <ShippingIdContent>
              {head(split(item.id, '-'))}
              </ShippingIdContent>
            </ShippingIdContainer>
            </ShippingNameContainer>
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

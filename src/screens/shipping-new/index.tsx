import { Button, MainLayout } from '../../components';
import {
  MainContainer,
  Title,
} from './styled-components';
import { useCurrentStore } from '../../hooks';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createShipping } from '../../api/shippings';
import ProviderSelect from '../../components/provider-select';

const Shipping = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [providerId, setProviderId] = useState<string>();
  const store = useCurrentStore();

  const { mutate: createShippingMutate } = useMutation({
    mutationFn: () => createShipping({ providerId, storeId: store?.id }),
    onSuccess: (data) => {
      navigation.navigate('MainBottomTabNavigator', {screen: 'ShippingsNavigator', params: {screen: 'Shipping', params: {id: data.data.id}}});
    },
  });

  return (
    <MainLayout
      canGoBack
      title={t('shippingNew.pageTitle')}
    >
      <MainContainer>
        <Title>{t('shipping.provider')}</Title>
        <ProviderSelect
                onChange={setProviderId}
                value={providerId || ''}
                label={t('shippingNew.providerLabel')}
                placeholder={t('shippingNew.providerPlaceholder')}
              />

              <Button onPress={() => createShippingMutate()}>
                {t('global.save')}
              </Button>
      </MainContainer>
    </MainLayout>
  );
};

export default Shipping;

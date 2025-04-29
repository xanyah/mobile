import { FlatList, Text } from 'react-native';
import { MainLayout } from '../../components';
import { LeftContainer, MainContainer, ProductTitle, RightContainer, ShippingContainer, Title } from './styled-components';
import { useShipping, useShippingProducts } from '../../hooks';
import { StaticScreenProps } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { PlusIcon } from 'lucide-react-native';
import { head, split } from 'lodash';
import { useMemo } from 'react';

type Props = StaticScreenProps<{
  id: string;
}>;
const Shipping = ({ route }: Props) => {
  const { t } = useTranslation()
  const { data } = useShipping(route.params.id)
  const { data: productsData, refetch, isFetching } = useShippingProducts({
    'q[shipping_id_eq]': route.params.id,
    'q[s]': 'product.name asc',
  })
  const canCreateProduct = useMemo(() => data?.data.state === 'pending', [data])

  return (
    <MainLayout
      canGoBack
      title={t('shipping.pageTitle', { shippingNumber: head(split(data?.data.id, '-')) })}
      rightIcon={PlusIcon}
      rightAction={canCreateProduct
        ? () => console.log('add product')
        : undefined}
    >
      <MainContainer>
        <Title>{t('shipping.customer')}</Title>
        <Text>{data?.data.provider.name}</Text>
        <Title>{t('shipping.products')}</Title>
        <FlatList
          style={{ flex: 1 }}
          data={productsData?.data}
          renderItem={({ item }) => (
            <ShippingContainer>
              <LeftContainer>
                <ProductTitle>{item.product.name}</ProductTitle>
              </LeftContainer>
              <RightContainer>
                <Text>{item.quantity}</Text>
              </RightContainer>
            </ShippingContainer>
          )}
          refreshing={isFetching}
          onRefresh={() => refetch()}
          keyExtractor={item => item.id}
        />
      </MainContainer>
    </MainLayout>
  );
};

export default Shipping;

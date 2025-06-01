import { FlatList, Text } from 'react-native';
import { Button, MainLayout, ProductScanner } from '../../components';
import {
  LeftContainer,
  MainContainer,
  ProductTitle,
  RightContainer,
  ShippingContainer,
  Title,
} from './styled-components';
import { useShipping, useShippingProducts } from '../../hooks';
import { StaticScreenProps } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, PlusIcon, ScanBarcode } from 'lucide-react-native';
import { head, split } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createShippingProduct, updateShippingProduct } from '../../api/shippings';

type Props = StaticScreenProps<{
  id: string;
}>;

const Shipping = ({ route }: Props) => {
  const { t } = useTranslation()
  const { id } = route.params
  const [productScannerOpened, setProductScannerOpened] = useState(false)
  const { data } = useShipping(id)
  const { data: productsData, refetch, isFetching } = useShippingProducts({
    'q[shipping_id_eq]': id,
    'q[s]': 'product.name asc',
  })
  const canCreateProduct = useMemo(() => data?.data.state === 'pending', [data])

  const { mutate: createShippingProductMutate } = useMutation({
    mutationFn: createShippingProduct,
    onSuccess: () => refetch(),
  })

  const { mutate: updateShippingProductMutate } = useMutation({
    mutationFn: ({ shippingProductId, quantity }: { shippingProductId: ShippingProduct['id'], quantity: number }) =>
      updateShippingProduct(shippingProductId, { quantity }),
    onSuccess: () => refetch(),
  })

  const onProductSelect = useCallback((product: Product) => {
    setProductScannerOpened(false)
    createShippingProductMutate({ productId: product.id, shippingId: id, quantity: 1 })
  }, [id])

  return (
    <MainLayout
      canGoBack
      title={t('shipping.pageTitle', { shippingNumber: head(split(data?.data.id, '-')) })}
      rightIcon={ScanBarcode}
      rightAction={canCreateProduct
        ? () => setProductScannerOpened(true)
        : undefined}
    >
      <MainContainer>
        <Title>{t('shipping.provider')}</Title>
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
                <Button
                  onPress={() => updateShippingProductMutate({
                    shippingProductId: item.id,
                    quantity: item.quantity - 1
                  })}
                  size="sm"
                >
                  <Minus color="#fff" />
                </Button>
                <Text>{item.quantity}</Text>

                <Button
                  onPress={() => updateShippingProductMutate({
                    shippingProductId: item.id,
                    quantity: item.quantity + 1
                  })}
                  size="sm"
                >
                  <Plus color="#fff" />
                </Button>
              </RightContainer>
            </ShippingContainer>
          )}
          refreshing={isFetching}
          onRefresh={() => refetch()}
          keyExtractor={item => item.id}
        />
      </MainContainer>
      <ProductScanner
        onClose={() => setProductScannerOpened(false)}
        onProductSelect={onProductSelect}
        isOpen={productScannerOpened}
      />
    </MainLayout>
  );
};

export default Shipping;

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
import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScanBarcode, Trash } from 'lucide-react-native';
import { find, head, split } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createShippingProduct, deleteShippingProduct, updateShippingProduct, validateShipping } from '../../api/shippings';
import QuantityInput from '../../components/quantity-input';

type Props = StaticScreenProps<{
  id: string;
}>;

const Shipping = ({ route }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { id } = route.params;
  const [productScannerOpened, setProductScannerOpened] = useState(false);
  const { data } = useShipping(id);
  const { data: productsData, refetch, isFetching } = useShippingProducts({
    'q[shipping_id_eq]': id,
    'q[s]': 'product.name asc',
  });
  const canCreateProduct = useMemo(() => data?.data.state === 'pending', [data]);

  const { mutate: createShippingProductMutate } = useMutation({
    mutationFn: createShippingProduct,
    onSuccess: () => refetch(),
  });

  const { mutate: updateShippingProductMutate } = useMutation({
    mutationFn: ({ shippingProductId, quantity }: { shippingProductId: ShippingProduct['id'], quantity: number }) =>
      updateShippingProduct(shippingProductId, { quantity }),
    onSuccess: () => refetch(),
  });

  const { mutate: deleteShippingProductMutate } = useMutation({
    mutationFn: (shippingProductId: ShippingProduct['id']) =>
      deleteShippingProduct(shippingProductId),
    onSuccess: () => refetch(),
  });

  const { mutate: validateShippingMutate } = useMutation({
    mutationFn: () =>
      validateShipping(id),
    onSuccess: () => navigation.goBack(),
  });

  const onProductSelect = useCallback((product: Product, quantity: number) => {
    const existingShippingProduct = find(productsData?.data, shippingProduct => shippingProduct.product.id === product.id);

    if (existingShippingProduct) {
      updateShippingProductMutate({ shippingProductId: existingShippingProduct.id, quantity: existingShippingProduct.quantity + quantity });
    } else {
      createShippingProductMutate({ productId: product.id, shippingId: id, quantity });
    }
  }, [id, productsData, createShippingProductMutate, updateShippingProductMutate]);

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
          ListEmptyComponent={<Button onPress={() => setProductScannerOpened(true)}>Commencer à scanner</Button>}
          renderItem={({ item }) => (
            <ShippingContainer>
              <LeftContainer>
                <ProductTitle>{item.product.name}</ProductTitle>
                <Button style={{backgroundColor: 'transparent', paddingRight: 0, paddingLeft: 0}} onPress={() => deleteShippingProductMutate(item.id)}>
                  <Trash size={16} color="#ef4444" />
                  <Text style={{color: '#ef4444'}}>Supprimer</Text>
                </Button>
              </LeftContainer>
              <RightContainer>
                <QuantityInput
                  quantity={item.quantity}
                  onChange={(quantity) => updateShippingProductMutate({ shippingProductId: item.id, quantity })}
                  />
              </RightContainer>
            </ShippingContainer>
          )}
          refreshing={isFetching}
          onRefresh={() => refetch()}
          keyExtractor={item => item.id}
        />
        <Button onPress={() =>validateShippingMutate()}>Valider la livraison</Button>
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

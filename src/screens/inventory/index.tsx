import { FlatList, Text } from 'react-native';
import { Button, MainLayout, ProductScanner } from '../../components';
import {
  LeftContainer,
  MainContainer,
  ProductTitle,
  RightContainer,
  InventoryContainer,
  Title,
} from './styled-components';
import { useInventory, useInventoryProducts } from '../../hooks/inventories';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScanBarcode, Trash } from 'lucide-react-native';
import { find } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createInventoryProduct, deleteInventoryProduct, updateInventoryProduct, validateInventory } from '../../api/inventories';
import QuantityInput from '../../components/quantity-input';
import { DateTime } from 'luxon';

const Inventory = () => {
  const {params} = useRoute<any>()
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { id } = params;
  console.warn(id)
  const [productScannerOpened, setProductScannerOpened] = useState(false);
  const { data } = useInventory(id);
  const { data: productsData, refetch, isFetching } = useInventoryProducts({
    'q[inventory_id_eq]': id,
    'q[s]': 'product.name asc',
  });
  const canCreateProduct = useMemo(() => !data?.data.lockedAt, [data]);

  const { mutate: createInventoryProductMutate } = useMutation({
    mutationFn: createInventoryProduct,
    onSuccess: () => refetch(),
  });

  const { mutate: updateInventoryProductMutate } = useMutation({
    mutationFn: ({ shippingProductId, quantity }: { shippingProductId: InventoryProduct['id'], quantity: number }) =>
      updateInventoryProduct(shippingProductId, { quantity }),
    onSuccess: () => refetch(),
  });

  const { mutate: deleteInventoryProductMutate } = useMutation({
    mutationFn: (shippingProductId: InventoryProduct['id']) =>
      deleteInventoryProduct(shippingProductId),
    onSuccess: () => refetch(),
  });

  const { mutate: validateInventoryMutate } = useMutation({
    mutationFn: () =>
      validateInventory(id),
    onSuccess: () => navigation.goBack(),
  });

  const onProductSelect = useCallback((product: Product, quantity: number) => {
    const existingInventoryProduct = find(productsData?.data, shippingProduct => shippingProduct.product.id === product.id);

    if (existingInventoryProduct) {
      updateInventoryProductMutate({ shippingProductId: existingInventoryProduct.id, quantity: existingInventoryProduct.quantity + quantity });
    } else {
      createInventoryProductMutate({ productId: product.id, inventoryId: id, quantity });
    }
  }, [id, productsData, createInventoryProductMutate, updateInventoryProductMutate]);

  return (
    <MainLayout
      canGoBack
      title={t('inventory.pageTitle', { inventoryDate: data?.data.createdAt ? DateTime.fromISO(data?.data.createdAt).toLocaleString(DateTime.DATE_MED) : null })}
      rightIcon={ScanBarcode}
      rightAction={canCreateProduct
        ? () => setProductScannerOpened(true)
        : undefined}
    >
      <MainContainer>
        <Title>{t('inventory.products')}</Title>
        <FlatList
          style={{ flex: 1 }}
          data={productsData?.data}
          ListEmptyComponent={<Button onPress={() => setProductScannerOpened(true)}>
            <ScanBarcode size={20} color="#fff" />
            {t('global.startScanning')}
            </Button>}
          renderItem={({ item }) => (
            <InventoryContainer>
              <LeftContainer>
                <ProductTitle>{item.product.name}</ProductTitle>
                <Button style={{backgroundColor: 'transparent', paddingRight: 0, paddingLeft: 0}} onPress={() => deleteInventoryProductMutate(item.id)}>
                  <Trash size={16} color="#ef4444" />
                  <Text style={{color: '#ef4444'}}>{t('global.delete')}</Text>
                </Button>
              </LeftContainer>
              <RightContainer>
                <QuantityInput
                  quantity={item.quantity}
                  onChange={(quantity) => updateInventoryProductMutate({ shippingProductId: item.id, quantity })}
                  />
              </RightContainer>
            </InventoryContainer>
          )}
          refreshing={isFetching}
          onRefresh={() => refetch()}
          keyExtractor={item => item.id}
        />
        <Button onPress={() =>validateInventoryMutate()}>{t('inventory.validate')}</Button>
      </MainContainer>
      <ProductScanner
        onClose={() => setProductScannerOpened(false)}
        onProductSelect={onProductSelect}
        isOpen={productScannerOpened}
      />
    </MainLayout>
  );
};

export default Inventory;

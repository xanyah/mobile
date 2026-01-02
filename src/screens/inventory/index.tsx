import { FlatList, Text, ActivityIndicator, Alert } from 'react-native';
import { Button, InventoryBarcodeScanner, MainLayout, QuantityInput } from '../../components';
import {
  LeftContainer,
  MainContainer,
  ProductTitle,
  RightContainer,
  InventoryContainer,
  Title,
} from './styled-components';
import { useInventory, useInventoryProducts } from '../../hooks/inventories';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScanBarcode, Trash } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteInventoryProduct, updateInventoryProduct } from '../../api/inventories';
import { DateTime } from 'luxon';

const Inventory = () => {
  const { params } = useRoute<any>()
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { id } = params;
  const [productScannerOpened, setProductScannerOpened] = useState(false);
  const { data } = useInventory(id);
  const {
    data: productsData,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInventoryProducts({
    'q[inventory_id_eq]': id,
    'q[s]': 'updated_at asc',
  });
  const canCreateProduct = useMemo(() => !data?.data.lockedAt, [data]);

  const products = useMemo(() => productsData?.pages.flatMap(page => page.data) ?? [], [productsData]);

  const { mutate: updateInventoryProductMutate } = useMutation({
    mutationFn: ({ shippingProductId, quantity }: { shippingProductId: InventoryProduct['id'], quantity: number }) =>
      updateInventoryProduct(shippingProductId, { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inventoryProducts'] }),
  });

  const { mutate: deleteInventoryProductMutate } = useMutation({
    mutationFn: (shippingProductId: InventoryProduct['id']) =>
      deleteInventoryProduct(shippingProductId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inventoryProducts'] }),
  });


  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleDeleteProduct = (productId: InventoryProduct['id'], productName: string) => {
    Alert.alert(
      t('global.confirmDelete'),
      t('global.confirmDeleteMessage', { name: productName }),
      [
        {
          text: t('global.cancel'),
          style: 'cancel',
        },
        {
          text: t('global.delete'),
          style: 'destructive',
          onPress: () => deleteInventoryProductMutate(productId),
        },
      ],
    );
  };

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
          data={products}
          ListEmptyComponent={<Button onPress={() => setProductScannerOpened(true)}>
            <ScanBarcode size={20} color="#fff" />
            {t('global.startScanning')}
          </Button>}
          renderItem={({ item }) => (
            <InventoryContainer>
              <LeftContainer>
                <ProductTitle>{item.product.name}</ProductTitle>
                <Button style={{ backgroundColor: 'transparent', paddingRight: 0, paddingLeft: 0 }} onPress={() => handleDeleteProduct(item.id, item.product.name)}>
                  <Trash size={16} color="#ef4444" />
                  <Text style={{ color: '#ef4444' }}>{t('global.delete')}</Text>
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
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" style={{ marginVertical: 20 }} /> : null}
          keyExtractor={item => item.id}
        />
      </MainContainer>
      <InventoryBarcodeScanner
        inventoryId={id}
        onClose={() => setProductScannerOpened(false)}
        isOpen={productScannerOpened}
      />
    </MainLayout>
  );
};

export default Inventory;

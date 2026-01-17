import { Alert, FlatList } from 'react-native';
import { Button, MainLayout } from '../../components';
import { Date, LeftContainer, RightContainer, ShippingContainer, ShippingNameContainer, Title } from './styled-components';
import { ArrowRight, PlusIcon } from 'lucide-react-native';
import { DateTime } from 'luxon';
import {  useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useInventories } from '../../hooks/inventories';
import { useMutation } from '@tanstack/react-query';
import { createInventory, deleteInventory } from '../../api/inventories';
import { useCurrentStore } from '../../hooks';

const Shippings = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const store = useCurrentStore();
  const { data, refetch, isFetching } = useInventories({
    'q[store_id_eq]': store?.id,
    'q[s]': 'created_at desc',
  });

  const openInventory = useCallback((inventoryId: Inventory['id']) => {
    navigation.navigate('MainBottomTabNavigator', { screen: 'InventoriesNavigator', params: { screen: 'Inventory', params: { id: inventoryId } } } as any)
  }, [navigation])

  const { mutate: createInventoryMutate } = useMutation({
    mutationFn: () => createInventory({ storeId: store?.id }),
    onSuccess: (data) => openInventory(data.data.id)
  })

  const { mutate: deleteInventoryMutate } = useMutation({
    mutationFn: (inventoryId: Inventory['id']) => deleteInventory(inventoryId),
    onSuccess: () => refetch()
  })

  const onInventoryDelete = useCallback((inventoryId: Inventory['id']) => {
    Alert.alert(
      t('inventories.delete.title'),
      t('inventories.delete.description'),
      [
        { text: t('global.cancel'), style: 'cancel' },
        { text: t('inventories.delete.confirmDeletion'), style: 'destructive', onPress: () => deleteInventoryMutate(inventoryId) },
      ]
    )
  }, [deleteInventoryMutate, t])

  return (
    <MainLayout
      title={t('inventories.pageTitle')}
      rightIcon={PlusIcon}
      rightAction={() => createInventoryMutate()}>
      <FlatList
        style={{ flex: 1 }}
        data={data?.data}
        ListEmptyComponent={<Button onPress={() => createInventoryMutate()}>
          <PlusIcon color="#fff" />{t('inventories.create')}
        </Button>}
        renderItem={({ item }) => (
          <ShippingContainer onPress={() => openInventory(item.id)} onLongPress={() => onInventoryDelete(item.id)}>
            <LeftContainer>
              <ShippingNameContainer>
                <Title>{DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATE_MED)}</Title>
              </ShippingNameContainer>
              <Date>{DateTime.fromISO(item.updatedAt).toLocaleString(DateTime.DATETIME_MED)}</Date>
            </LeftContainer>
            <RightContainer>
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

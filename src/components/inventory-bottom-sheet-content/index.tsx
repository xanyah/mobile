import { isEmpty, map } from 'lodash';
import { ProductContainer, ProductDetailsContainer, ProductImage, ProductInfosContainer, ProductsContainer, ProductSubtitle, ProductTitle } from './styled-components';
import { useInventoryProducts } from '../../hooks';
import QuantityInput from '../quantity-input';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInventoryProduct } from '../../api/inventories';

type InventoryBottomSheetContentProps = {
  inventoryId: Inventory['id']
}

const InventoryBottomSheetContent = ({ inventoryId }: InventoryBottomSheetContentProps) => {
  const queryClient = useQueryClient();
  const { data: productsData } = useInventoryProducts({
    'q[inventory_id_eq]': inventoryId,
    'q[s]': 'updated_at desc',
  });

  const products = useMemo(() => productsData?.pages[0]?.data ?? [], [productsData]);

  const { mutate: updateInventoryProductMutate } = useMutation({
    mutationFn: ({ inventoryProductId, quantity }: { inventoryProductId: InventoryProduct['id'], quantity: number }) =>
      updateInventoryProduct(inventoryProductId, { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inventoryProducts'] }),
  });

  return (
    <>
      <ProductsContainer>
        {map(products, ({ id, product, quantity }) => (
          <ProductContainer key={product.id}>
            <ProductInfosContainer>
              {!isEmpty(product.images) && <ProductImage source={{ uri: product.images[0].thumbnail }} />}
              <ProductDetailsContainer>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductSubtitle>{product.manufacturerSku}</ProductSubtitle>
              </ProductDetailsContainer>
            </ProductInfosContainer>
            <QuantityInput
              quantity={quantity}
              onChange={(newQuantity) => updateInventoryProductMutate({ quantity: newQuantity, inventoryProductId: id })}
            />
          </ProductContainer>
        ))}
      </ProductsContainer>
    </>
  );
};

export default InventoryBottomSheetContent;

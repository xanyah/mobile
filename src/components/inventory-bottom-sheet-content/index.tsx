import { isEmpty, map } from 'lodash';
import { ProductContainer, ProductDetailsContainer, ProductImage, ProductInfosContainer, ProductsContainer, ProductSubtitle, ProductTitle } from './styled-components';
import { useInventoryProducts } from '../../hooks';
import QuantityInput from '../quantity-input';
import { useMutation } from '@tanstack/react-query';
import { updateInventoryProduct } from '../../api/inventories';

type InventoryBottomSheetContentProps = {
  inventoryId: Inventory['id']
}

const InventoryBottomSheetContent = ({ inventoryId }: InventoryBottomSheetContentProps) => {
  const { data: productsData, refetch } = useInventoryProducts({
    'q[inventory_id_eq]': inventoryId,
    'q[s]': 'updated_at desc',
  });

  const { mutate: updateInventoryProductMutate } = useMutation({
    mutationFn: ({ inventoryProductId, quantity }: { inventoryProductId: InventoryProduct['id'], quantity: number }) =>
      updateInventoryProduct(inventoryProductId, { quantity }),
    onSuccess: () => refetch(),
  });

  return (
    <>
      <ProductsContainer>
        {map(productsData?.data, ({ id, product, quantity }) => (
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

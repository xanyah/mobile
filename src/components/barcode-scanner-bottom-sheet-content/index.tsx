import { head, isEmpty, map } from 'lodash';
import Button from '../button';
import { ButtonCloseContainer, ProductContainer, ProductDetailsContainer, ProductImage, ProductInfosContainer, ProductsContainer, ProductSubtitle, ProductTitle } from './styled-components';
import { ArrowRight, X } from 'lucide-react-native';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import QuantityInput from '../quantity-input';

type BarcodeScannerBottomSheetContentProps = {
  products: Product[]
  onClose: () => void
  onProductSelect: (product: Product, quantity: number) => void
}

const BarcodeScannerBottomSheetContent = ({ products, onClose, onProductSelect }: BarcodeScannerBottomSheetContentProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    setSelectedProduct(head(products));
    setSelectedQuantity(1);
  }, [products, setSelectedProduct, setSelectedQuantity]);

  if (isEmpty(products)) {
    return <Text>Scanner un code pour démarrer</Text>;
  }

  if (selectedProduct) {
    return (
      <>
        <ButtonCloseContainer onPress={onClose}>
          <X color="#fff" />
        </ButtonCloseContainer>
        <ProductContainer key={selectedProduct.id}>
          <ProductInfosContainer style={{ flexDirection: 'column' }}>
            {!isEmpty(selectedProduct.images) && (
              <ProductImage
                style={{ height: 120, width: 120 }}
                source={{ uri: selectedProduct.images[0].thumbnail }}
              />)}
            <ProductDetailsContainer style={{ alignItems: 'center' }}>
              <ProductTitle style={{ fontSize: 32 }}>{selectedProduct.name}</ProductTitle>
              <ProductSubtitle>{selectedProduct.manufacturerSku}</ProductSubtitle>
            </ProductDetailsContainer>
          </ProductInfosContainer>
          <QuantityInput quantity={selectedQuantity} onChange={setSelectedQuantity} />
          <Button size="md" onPress={() => onProductSelect(selectedProduct, selectedQuantity)}>
            Confirmer
          </Button>
        </ProductContainer>
      </>
    );
  }

  return (
    <>
      <Button onPress={onClose}>x</Button>
      {map(products, product => (
        <ProductsContainer key={product.id}>
          <ProductInfosContainer>
            {!isEmpty(product.images) && <ProductImage source={{ uri: product.images[0].thumbnail }} />}
            <ProductImage source={{ uri: 'https://placehold.co/400' }} />
            <ProductDetailsContainer>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductSubtitle>{product.manufacturerSku}</ProductSubtitle>
            </ProductDetailsContainer>
          </ProductInfosContainer>
          <Button onPress={() => setSelectedProduct(product)}>
            <ArrowRight color="#fff" size={16} />
          </Button>
        </ProductsContainer>
      ))}
      <Button size="md" onPress={onClose}>
        Annuler
      </Button>
    </>
  );
};

export default BarcodeScannerBottomSheetContent;

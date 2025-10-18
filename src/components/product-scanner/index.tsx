import { useCameraPermission } from 'react-native-vision-camera';
import { useEffect } from 'react';
import BarcodeScanner from '../barcode-scanner';

type ProductScannerProps = {
  onProductSelect: (product: Product, quantity: number) => void
  isOpen?: boolean,
  onClose?: () => void
}

const ProductScanner = ({ onProductSelect, isOpen, onClose }: ProductScannerProps) => {
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  return (<>
    <BarcodeScanner
      isOpen={isOpen}
      onClose={onClose}
      onProductSelect={onProductSelect}
      />
  </>);
};

export default ProductScanner;

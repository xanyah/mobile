import { Alert, Modal, StyleSheet } from 'react-native';
import { Camera, CodeScanner, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {
  CameraCloseContainer,
  CameraContainer,
  CameraOverlayBottomContainer,
  CameraOverlayLeftContainer,
  CameraOverlayRightContainer,
  CameraOverlayTopContainer,
} from './styled-components';
import { head, isEmpty } from 'lodash';
import { getProducts } from '../../api';
import { X } from 'lucide-react-native';
import BarcodeScannerBottomSheetContent from '../barcode-scanner-bottom-sheet-content';
import { useAudioPlayer } from '../../hooks/audio';
import { barcodeScannerError, barcodeScannerSuccess } from '../../assets/audios';

type ProductScannerProps = {
  onProductSelect: (product: Product, quantity: number) => void
  isOpen?: boolean,
  onClose?: () => void
}

const BarcodeScanner = ({ isOpen, onClose, onProductSelect }: ProductScannerProps) => {
  const {play: playError} = useAudioPlayer(barcodeScannerError)
  const {play: playSuccess} = useAudioPlayer(barcodeScannerSuccess)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const scanPending = useRef(false);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const onSearch = useCallback(async (scannedCode: string) => {
    scanPending.current = true;
    const productsQuery = await getProducts({
      'q[skuOrUpcOrManufacturerSkuEq]': scannedCode,
    });

    if (isEmpty(productsQuery.data)) {
      playError()
      Alert.alert(
        'Produit introuvable',
        `Aucun produit trouvé avec le code barre ${scannedCode}`,
        [{ text: 'OK', onPress: () => { scanPending.current = false; } }]
      );
    } else {
      playSuccess()
      setSelectedProducts(productsQuery.data);
      bottomSheetRef.current?.expand();
      scanPending.current = false;
    }
  }, [setSelectedProducts, playError, playSuccess]);

  const onScan = useCallback<CodeScanner['onCodeScanned']>((codes) => {
    const scannedCode = head(codes)?.value;

    if (scannedCode && isEmpty(selectedProducts) && !scanPending.current) {
      onSearch(scannedCode);
    }
  }, [onSearch, selectedProducts]);


  const codeScanner = useCodeScanner({
    codeTypes: ['code-128', 'ean-13', 'ean-8', 'upc-a', 'upc-e'],
    onCodeScanned: onScan,
  });

  const onBottomSheetClose = useCallback(() => {
    setSelectedProducts([]);
    bottomSheetRef.current?.collapse();
  }, [setSelectedProducts, bottomSheetRef]);

  const selectProductAndResetForm = useCallback((product: Product, quantity: number) => {
    onProductSelect(product, quantity);
    onBottomSheetClose();
  }, [onProductSelect, onBottomSheetClose]);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  return (<Modal
    presentationStyle="fullScreen"
    visible={isOpen}
    animationType="slide"
    onRequestClose={onClose}
  >
    <GestureHandlerRootView>
      <CameraContainer>
        {device && <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />}
        <CameraOverlayTopContainer />
        <CameraOverlayLeftContainer />
        <CameraOverlayRightContainer />
        <CameraOverlayBottomContainer />
        <BottomSheet ref={bottomSheetRef} snapPoints={[200, '70%']} >
          <BottomSheetView style={{
            flex: 1,
            padding: 36,
            alignItems: 'center',
          }}>
            <BarcodeScannerBottomSheetContent
              products={selectedProducts}
              onClose={onBottomSheetClose}
              onProductSelect={selectProductAndResetForm}
            />
          </BottomSheetView>
        </BottomSheet>
      </CameraContainer>
    </GestureHandlerRootView>
    <CameraCloseContainer onPress={onClose}>
      <X color="white" size={24} />
    </CameraCloseContainer>
  </Modal>);
};

export default BarcodeScanner;

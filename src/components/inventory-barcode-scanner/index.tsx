import { Alert, Modal, StyleSheet } from 'react-native';
import { Camera, CodeScanner, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
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
import { head, isEmpty, size } from 'lodash';
import { getProducts } from '../../api';
import { X } from 'lucide-react-native';
import InventoryBottomSheetContent from '../inventory-bottom-sheet-content';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createInventoryProduct, getInventoryProducts, updateInventoryProduct } from '../../api/inventories';
import { useAudioPlayer } from '../../hooks/audio';
import { barcodeScannerError, barcodeScannerSuccess } from '../../assets/audios';

type ProductScannerProps = PropsWithChildren<{
  inventoryId: Inventory['id']
  isOpen?: boolean,
  onClose?: () => void
}>

const InventoryBarcodeScanner = ({ isOpen, onClose, inventoryId }: ProductScannerProps) => {
  const { play: playError } = useAudioPlayer(barcodeScannerError)
  const { play: playSuccess } = useAudioPlayer(barcodeScannerSuccess)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const scanPending = useRef(false);
  const latestScannedCode = useRef<string>(null)
  const device = useCameraDevice('back');
  const queryClient = useQueryClient()
  const { hasPermission, requestPermission } = useCameraPermission();

  const invalidateQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['inventoryProducts']
    })
  }, [queryClient])

  const { mutateAsync: createInventoryProductMutate } = useMutation({
    mutationFn: createInventoryProduct,
    onSuccess: () => invalidateQueries(),
  });

  const { mutateAsync: updateInventoryProductMutate } = useMutation({
    mutationFn: ({ inventoryProductId, quantity }: { inventoryProductId: InventoryProduct['id'], quantity: number }) =>
      updateInventoryProduct(inventoryProductId, { quantity }),
    onSuccess: () => invalidateQueries(),
  });

  const onSearch = useCallback(async (scannedCode: string) => {
    scanPending.current = true;

    try {
      const productsQuery = await getProducts({ 'q[skuOrUpcOrManufacturerSkuEq]': scannedCode });

      if (isEmpty(productsQuery.data)) {
        scanPending.current = false;
        return playError()
      }

      if (size(productsQuery.data) > 1) {
        Alert.alert(`Deux articles avec le même code barre ${scannedCode}`)
        scanPending.current = false;
        return playError()
      }

      const productId = head(productsQuery.data)?.id as Product['id']
      const inventoryProductsQuery = await getInventoryProducts({
        'q[inventoryIdEq]': inventoryId,
        'q[productIdEq]': productId
      });

      if (isEmpty(inventoryProductsQuery.data)) {
        await createInventoryProductMutate({ inventoryId, productId, quantity: 1 })
      } else {
        const inventoryProduct = head(inventoryProductsQuery.data) as InventoryProduct
        await updateInventoryProductMutate({ inventoryProductId: inventoryProduct.id, quantity: inventoryProduct.quantity + 1 })
      }
      playSuccess()

    } catch (err) {
      console.error(err)
      playError()
    }
    scanPending.current = false;
  }, [createInventoryProductMutate, updateInventoryProductMutate, inventoryId, playError, playSuccess]);

  const onScan = useCallback<CodeScanner['onCodeScanned']>((codes) => {
    const scannedCode = head(codes)?.value;

    if (scannedCode && !scanPending.current && scannedCode !== latestScannedCode.current) {
      latestScannedCode.current = scannedCode
      onSearch(scannedCode);
      setTimeout(() => {
        if (latestScannedCode.current === scannedCode) {
          latestScannedCode.current = null
        }
      }, 5000)
    }
  }, [onSearch]);

  const codeScanner = useCodeScanner({
    codeTypes: ['code-128', 'ean-13', 'ean-8', 'upc-a', 'upc-e'],
    onCodeScanned: onScan,
  });

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
            <InventoryBottomSheetContent inventoryId={inventoryId} />
          </BottomSheetView>
        </BottomSheet>
      </CameraContainer>
    </GestureHandlerRootView>
    <CameraCloseContainer onPress={onClose}>
      <X color="white" size={24} />
    </CameraCloseContainer>
  </Modal>);
};

export default InventoryBarcodeScanner;

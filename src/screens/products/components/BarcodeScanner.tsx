import React from 'react';
import { StyleSheet } from 'react-native';
import { Camera, CameraDevice } from 'react-native-vision-camera';
import { useTranslation } from 'react-i18next';

import {
  CameraContainer,
  CameraOverlayTopContainer,
  CameraOverlayBottomContainer,
  CameraOverlayLeftContainer,
  CameraOverlayRightContainer,
  ScanInstructionText,
} from '../styled-components';

interface BarcodeScannerProps {
  device: CameraDevice;
  isActive: boolean;
  onBarcodeScanned: (codes: any) => void;
  onError: (error: any) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  device,
  isActive,
  onBarcodeScanned,
  onError,
}) => {
  const { t } = useTranslation();

  return (
    <CameraContainer>
      <Camera
        style={[{borderTopRightRadius: 16, borderTopLeftRadius: 16}, StyleSheet.absoluteFill]}
        device={device}
        isActive={isActive}
        onError={onError}
        codeScanner={{
          codeTypes: ['ean-13', 'ean-8', 'upc-a', 'upc-e', 'code-128', 'code-39'],
          onCodeScanned: onBarcodeScanned,
        }}
        photo={true}
        photoQualityBalance="balanced"
      />
      <CameraOverlayTopContainer />
      <CameraOverlayBottomContainer />
      <CameraOverlayLeftContainer />
      <CameraOverlayRightContainer />
      <ScanInstructionText>
        {t('products.scanBarcode', 'Scan a product barcode')}
      </ScanInstructionText>
    </CameraContainer>
  );
};

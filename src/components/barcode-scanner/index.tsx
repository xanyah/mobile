import { Modal, StyleSheet } from "react-native"
import { Camera, CodeScanner, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera"
import { useEffect } from "react"
import {
  CameraContainer,
  CameraOverlayBottomContainer,
  CameraOverlayLeftContainer,
  CameraOverlayRightContainer,
  CameraOverlayTopContainer,
} from "./styled-components"

type ProductScannerProps = {
  onScan: CodeScanner['onCodeScanned']
  isOpen?: boolean,
  onClose?: () => void
}

const BarcodeScanner = ({ isOpen, onClose, onScan }: ProductScannerProps) => {
  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()
  const codeScanner = useCodeScanner({
    codeTypes: ['code-128', 'ean-13', 'ean-8', 'upc-a', 'upc-e'],
    onCodeScanned: onScan,
  })

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission, requestPermission])

  return (<Modal
    presentationStyle="fullScreen"
    visible={isOpen}
    animationType="slide"
    onRequestClose={onClose}
  >
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
    </CameraContainer>
  </Modal>)
}

export default BarcodeScanner

import { Modal, StyleSheet, Text } from "react-native"
import TextInput from "../text-input"
import { Camera, CodeScanner, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera"
import { useCallback, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { CameraContainer, CameraOverlayBottomContainer, CameraOverlayLeftContainer, CameraOverlayRightContainer, CameraOverlayTopContainer, ProductBarcodeFormContainer, ProductBarcodeInputContainer, ProductContainer, ProductDetailsContainer, ProductFormContainer, ProductImage, ProductInfosContainer, ProductSubtitle, ProductTitle, Camera as StyledCamera } from "./styled-components"
import { head, isEmpty, map } from "lodash"
import Button from "../button"
import { Plus, Search } from "lucide-react-native"
import { getProducts } from "../../api/products"
import ProductForm from "../product-form"
import BarcodeScanner from "../barcode-scanner"

const barcodeSchema = z.object({
  value: z.string(),
});

type ProductScannerProps = {
  onProductSelect?: (product: Product) => void
  isOpen?: boolean,
  onClose?: () => void
}

const ProductScanner = ({ onProductSelect, isOpen, onClose }: ProductScannerProps) => {
  const [products, setProducts] = useState<Product[]>()
  const { hasPermission, requestPermission } = useCameraPermission()
  const [isScanning, setIsScanning] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  const onSearch = useCallback(async (scannedCode: string) => {
    const productsQuery = await getProducts({
      'q[skuOrUpcOrManufacturerSkuEq]': scannedCode,
    })

    if (productsQuery.data.length === 1) {
      onProductSelect?.(productsQuery.data[0])
    } else if (productsQuery.data.length > 1) {
      setProducts(productsQuery.data)
    } else {
      setIsCreating(true)
    }
    setIsScanning(false)
  }, [setProducts, setIsCreating, onProductSelect])

  const onScan = useCallback<CodeScanner['onCodeScanned']>((codes) => {
    const scannedCode = head(codes)?.value

    if (scannedCode) {
      onSearch(scannedCode)
    }
  }, [onSearch])

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission, requestPermission])

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true)
      setProducts([])
    } else {
      setIsCreating(false)
      setProducts([])
    }
  }, [setProducts, isOpen])


  return (<>
    <BarcodeScanner onScan={onScan} isOpen={isOpen && isScanning} />
    <Modal
      presentationStyle="formSheet"
      visible={isOpen && !isScanning}
      animationType="slide"
      onRequestClose={onClose}
    >
      {isCreating && <ProductForm onSuccess={data => onProductSelect?.(data.data)} />}
      {map(products, product => (
        <ProductContainer key={product.id}>
          <ProductInfosContainer>
            {!isEmpty(product.images) && <ProductImage source={{ uri: product.images[0].thumbnail }} />}
            <ProductImage source={{ uri: 'https://placehold.co/400' }} />
            <ProductDetailsContainer>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductSubtitle>{product.manufacturerSku}</ProductSubtitle>
            </ProductDetailsContainer>
          </ProductInfosContainer>
          <Button onPress={() => onProductSelect?.(product)}>
            <Plus color="#fff" size={16} />
          </Button>
        </ProductContainer>
      ))}
    </Modal>
  </>)
}

export default ProductScanner

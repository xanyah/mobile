import { Modal, StyleSheet, Text } from "react-native"
import TextInput from "../text-input"
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera"
import { useCallback, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { CameraContainer, CameraOverlayBottomContainer, CameraOverlayLeftContainer, CameraOverlayRightContainer, CameraOverlayTopContainer, ProductBarcodeFormContainer, ProductBarcodeInputContainer, ProductContainer, ProductDetailsContainer, ProductFormContainer, ProductImage, ProductInfosContainer, ProductSubtitle, ProductTitle, Camera as StyledCamera } from "./styled-components"
import { head, isEmpty, map } from "lodash"
import Button from "../button"
import { Plus, Search } from "lucide-react-native"
import { getProducts } from "../../api/products"

const barcodeSchema = z.object({
  value: z.string(),
});

type ProductScannerProps = {
  onProductSelect?: (product: Product) => void
  isOpen?: boolean,
  onClose?: () => void
}

const ProductScanner = ({ onProductSelect, isOpen, onClose }: ProductScannerProps) => {
  const device = useCameraDevice('back')
  const [products, setProducts] = useState<Product[]>()
  const { hasPermission, requestPermission } = useCameraPermission()
  const { control, setValue, getValues, reset } = useForm({
    resolver: zodResolver(barcodeSchema),
  })
  const codeScanner = useCodeScanner({
    codeTypes: ['code-128', 'ean-13', 'ean-8', 'upc-a', 'upc-e'],
    onCodeScanned: (codes) => {
      const scannedCode = head(codes)?.value

      if (scannedCode) {
        setValue('value', scannedCode)
        onSearch()
      }
    }
  })

  const onSearch = useCallback(async () => {
    const productsQuery = await getProducts({
      'q[skuOrUpcOrManufacturerSkuEq]': getValues().value,
    })

    setProducts(productsQuery.data)
  }, [setProducts, getValues])

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission, requestPermission])

  useEffect(() => {
    if (!isOpen) {
      reset({ value: '' })
      setProducts([])
    }
  }, [reset, setProducts, isOpen])

  return (<Modal
    presentationStyle="formSheet"
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
    <ProductFormContainer>
      <ProductBarcodeFormContainer>
        <ProductBarcodeInputContainer>
          <Controller
            control={control}
            name="value"
            render={({ field, fieldState: { error } }) => (
              <TextInput
                label="Code barre du produit"
                errors={error ? ([error.message] as string[]) : undefined}
                placeholder="Code barre du produit"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                keyboardType="number-pad"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
        </ProductBarcodeInputContainer>
        <Button onPress={onSearch}><Search color="#fff" size={17} /></Button>
      </ProductBarcodeFormContainer>
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
    </ProductFormContainer>
  </Modal>)
}

export default ProductScanner

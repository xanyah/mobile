import React, { useCallback, useRef, useState } from 'react';
import { Alert, View, Text, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serialize } from 'object-to-formdata';
import { omit } from 'lodash';
import { decamelizeKeys } from 'humps';
import styled from 'styled-components/native';
import { getProductByBarcode, updateProduct, getAiSuggestions } from '../../api/products';
import { MainLayout } from '../../components';
import { useAudioPlayer } from '../../hooks/audio';
import { barcodeScannerError, barcodeScannerSuccess } from '../../assets/audios';
import { BarcodeScanner, PhotoCapture, ProductEditor, FullScreenImageModal } from './components';

const Container = styled.View`
  flex: 1;
`;

const CenterContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Products = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { play: playError } = useAudioPlayer(barcodeScannerError);
  const { play: playSuccess } = useAudioPlayer(barcodeScannerSuccess);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const cameraRef = useRef<Camera>(null);
  const scanPending = useRef(false);

  const [isScanning, setIsScanning] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imagesToDestroy, setImagesToDestroy] = useState<Set<string>>(new Set());
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const { mutate: updateProductMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ productId, formData }: { productId: string; formData: FormData }) =>
      updateProduct(productId, formData),
    onSuccess: (data) => {
      playSuccess();
      Alert.alert(t('global.saved'), t('products.productUpdated'));
      setSelectedProduct(data.data);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      playError();
      Alert.alert(t('global.savingError'), t('products.updateError'));
    },
  });



  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  React.useEffect(() => {
    if (selectedProduct) {
      setImagesToDestroy(new Set());
    }
  }, [selectedProduct]);

  const onBarcodeScanned = useCallback(
    async (codes: any) => {
      if (scanPending.current || !isScanning) return;

      const scannedCode = codes[0]?.value;
      if (!scannedCode) return;

      scanPending.current = true;
      setIsCameraActive(false);

      try {
        const response = await getProductByBarcode(scannedCode);

        if (response.data.length === 0) {
          playError();
          Alert.alert(
            t('products.productNotFound'),
            t('products.noProductWithBarcode', { barcode: scannedCode }),
            [{ text: 'OK', onPress: () => {
              scanPending.current = false;
              setIsCameraActive(true);
            } }]
          );
        } else {
          playSuccess();
          setSelectedProduct(response.data[0]);
          setIsScanning(false);
        }
      } catch (error) {
        playError();
        Alert.alert(t('global.savingError'), t('products.loadError'));
        scanPending.current = false;
        setIsCameraActive(true);
      }
    },
    [isScanning, playError, playSuccess, t]
  );

  const handleOpenCamera = useCallback(() => {
    setIsTakingPhoto(true);
  }, []);

  const handleTakePhoto = useCallback(async () => {
    if (!cameraRef.current || !selectedProduct) return;

    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
        enableShutterSound: true,
      });

      const formData = new FormData();

      // Add existing images first (not marked for deletion)
      const imagesToKeep = selectedProduct.images.filter((image: any) => {
        const imageId = image.signed_id || image.signedId;
        return !imagesToDestroy.has(imageId);
      });

      imagesToKeep.forEach((image: any) => {
        formData.append('product[images][]', image.signed_id || image.signedId);
      });

      // Add the new photo
      formData.append('product[images][]', {
        uri: `file://${photo.path}`,
        type: 'image/jpeg',
        name: `photo_${Date.now()}.jpg`,
      } as any);

      setIsTakingPhoto(false);
      updateProductMutate({ productId: selectedProduct.id, formData });
    } catch (error) {
      playError();
      Alert.alert(t('global.savingError'), t('products.photoError'));
      setIsTakingPhoto(false);
    }
  }, [selectedProduct, playError, updateProductMutate, imagesToDestroy, t]);

  const handleToggleImageDestroy = useCallback(
    (signedId: string) => {
      setImagesToDestroy(prev => {
        const next = new Set(prev);
        if (next.has(signedId)) {
          next.delete(signedId);
        } else {
          next.add(signedId);
        }
        return next;
      });
    },
    []
  );

  const handleSaveProduct = useCallback((formData: { name: string; description?: string; productCustomAttributesAttributes?: Array<{ id?: string; customAttributeId: string; value?: string | null }> }) => {
    if (!selectedProduct) return;

    // Filter custom attributes: keep if it has an existing id OR has a value
    const filteredCustomAttributes = formData.productCustomAttributesAttributes?.filter((attr) => {
      // Keep if it has an existing id (even if value is empty, to allow updates/deletions)
      if (attr?.id) return true;
      // Keep if it has a value (new attribute being created)
      if (attr?.value) return true;
      // Filter out attributes with no id and no value
      return false;
    });

    const serializedFormData = serialize({
      product: omit(
        decamelizeKeys({
          name: formData.name,
          description: formData.description || '',
          productCustomAttributesAttributes: filteredCustomAttributes || [],
        }),
        'images'
      ),
    });

    // Add images - only include signed_ids for images NOT marked for deletion
    const imagesToKeep = selectedProduct.images.filter((image: any) => {
      const imageId = image.signed_id || image.signedId;
      return !imagesToDestroy.has(imageId);
    });

    if (imagesToKeep.length > 0) {
      imagesToKeep.forEach((image: any) => {
        serializedFormData.append('product[images][]', image.signed_id || image.signedId);
      });
    } else {
      // Send empty array if no images to keep
      serializedFormData.append('product[images][]', '');
    }

    updateProductMutate({ productId: selectedProduct.id, formData: serializedFormData });
  }, [selectedProduct, imagesToDestroy, updateProductMutate]);

  const handleBackToScanning = useCallback(() => {
    setSelectedProduct(null);
    setIsScanning(true);
    setIsCameraActive(true);
    scanPending.current = false;
  }, []);

  const handleGenerateSuggestions = useCallback(async (formData: { name: string; description?: string }) => {
    if (!selectedProduct) {
      Alert.alert(t('global.savingError'), t('product.saveProductFirst'));
      return;
    }

    setIsGeneratingSuggestions(true);
    try {
      const response = await getAiSuggestions(selectedProduct.id, {
        title: formData.name,
        description: formData.description || '',
      });

      const { title, description } = response.data;

      if (!title && !description) {
        playError();
        Alert.alert(t('global.saved'), t('product.aiSuggestionsNoResults'));
        return;
      }

      // Update the product with AI suggestions
      const updatedProduct = {
        ...selectedProduct,
        name: title || selectedProduct.name,
        description: description || selectedProduct.description,
      };
      setSelectedProduct(updatedProduct);

      playSuccess();
      let message = '';
      if (title && description) {
        message = t('product.aiSuggestionsApplied');
      } else if (title) {
        message = t('product.titleSuggested');
      } else if (description) {
        message = t('product.descriptionGenerated');
      }
      Alert.alert(t('global.saved'), message);
    } catch (error: any) {
      playError();
      const errorMessage = error.response?.data?.error || t('product.aiSuggestionsError');
      Alert.alert(t('global.savingError'), errorMessage);
    } finally {
      setIsGeneratingSuggestions(false);
    }
  }, [selectedProduct, t, playError, playSuccess]);

  if (!hasPermission) {
    return (
      <MainLayout title={t('products.pageTitle')}>
        <CenterContainer>
          <Text>{t('products.cameraPermissionRequired')}</Text>
        </CenterContainer>
      </MainLayout>
    );
  }

  if (!device) {
    return (
      <MainLayout title={t('products.pageTitle')}>
        <CenterContainer>
          <ActivityIndicator size="large" />
        </CenterContainer>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={t('products.pageTitle')}>
      <Container>
        {isScanning ? (
          <BarcodeScanner
            device={device}
            isActive={isCameraActive}
            onBarcodeScanned={onBarcodeScanned}
            onError={(error) => console.error('Camera error:', error)}
          />
        ) : isTakingPhoto ? (
          <PhotoCapture
            device={device}
            cameraRef={cameraRef}
            onClose={() => setIsTakingPhoto(false)}
            onCapture={handleTakePhoto}
            onError={(error) => console.error('Camera error:', error)}
          />
        ) : (
          <>
            <ProductEditor
              product={selectedProduct!}
              imagesToDestroy={imagesToDestroy}
              isUpdating={isUpdating}
              isGeneratingSuggestions={isGeneratingSuggestions}
              onToggleImageDestroy={handleToggleImageDestroy}
              onOpenCamera={handleOpenCamera}
              onImagePress={setFullScreenImage}
              onSave={handleSaveProduct}
              onBackToScanning={handleBackToScanning}
              onGenerateSuggestions={handleGenerateSuggestions}
            />
            <FullScreenImageModal
              imageUrl={fullScreenImage}
              onClose={() => setFullScreenImage(null)}
            />
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default Products;

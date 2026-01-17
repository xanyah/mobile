import React, { useEffect, useMemo } from 'react';
import { ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Camera as CameraIcon, Trash2 } from 'lucide-react-native';
import styled from 'styled-components/native';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { find } from 'lodash';

import { Button, TextInput } from '../../../components';
import { useCurrentStore, useCustomAttributes } from '../../../hooks';
import {
  ProductEditorContainer,
  SectionTitle,
  ImagesContainer,
  ImageWrapper,
  DeleteImageButton,
  AddPhotoButton,
  FormSection,
  CustomAttributeRow,
  CustomAttributeLabel,
} from '../styled-components';

const ScrollContainer = styled.ScrollView.attrs({contentContainerStyle: { padding: 16 }})`
  flex: 1;
`;

const ProductImageStyled = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const AddPhotoText = styled.Text`
  margin-top: 8px;
  color: #9333ea;
  font-size: 12px;
  font-weight: 600;
`;

const ScanButton = styled(Button)`
  margin-top: 12px;
  background-color: #6b7280;
`;

const AiButton = styled(Button)`
  margin-top: 8px;
  background-color: #9333ea;
`;

const UndoText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`;

const productCustomAttributesAttributesSchema = z.object({
  id: z.string().optional(),
  customAttributeId: z.string(),
  value: z.string().optional().nullable(),
});

const productEditorSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  productCustomAttributesAttributes: z
    .array(productCustomAttributesAttributesSchema)
    .optional(),
});

type ProductEditorFormData = z.infer<typeof productEditorSchema>;

interface ProductEditorProps {
  product: Product;
  imagesToDestroy: Set<string>;
  isUpdating: boolean;
  isGeneratingSuggestions: boolean;
  onToggleImageDestroy: (signedId: string) => void;
  onOpenCamera: () => void;
  onImagePress: (url: string) => void;
  onSave: (data: ProductEditorFormData) => void;
  onBackToScanning: () => void;
  onGenerateSuggestions: (data: ProductEditorFormData) => void;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({
  product,
  imagesToDestroy,
  isUpdating,
  isGeneratingSuggestions,
  onToggleImageDestroy,
  onOpenCamera,
  onImagePress,
  onSave,
  onBackToScanning,
  onGenerateSuggestions,
}) => {
  const { t } = useTranslation();
  const store = useCurrentStore();

  const { data: customAttributesData } = useCustomAttributes({
    'q[storeIdEq]': store?.id,
  });

  // Sort custom attributes to match the order in initialValues
  const sortedCustomAttributes = useMemo(
    () => [...(customAttributesData?.data || [])].sort((a, b) => a.id.localeCompare(b.id)),
    [customAttributesData?.data]
  );

  const methods = useForm<ProductEditorFormData>({
    resolver: zodResolver(productEditorSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      productCustomAttributesAttributes: [],
    },
  });

  const { handleSubmit, control, watch, reset } = methods;

  // Initialize form with product data when product changes
  useEffect(() => {
    if (product && sortedCustomAttributes.length > 0) {
      // Map all store custom attributes to product values
      const productCustomAttributesAttributes = sortedCustomAttributes.map((customAttribute) => {
        const existingCustomAttribute = find(
          product.productCustomAttributes,
          (productCustomAttribute) =>
            productCustomAttribute.customAttribute.id === customAttribute.id
        );
        return {
          id: existingCustomAttribute?.id,
          customAttributeId: customAttribute.id,
          value: existingCustomAttribute?.value || '',
        };
      });

      reset({
        name: product.name,
        description: product.description || '',
        productCustomAttributesAttributes,
      });
    }
  }, [product, sortedCustomAttributes, reset]);

  const onSubmit = (data: ProductEditorFormData) => {
    onSave(data);
  };

  const handleGenerateAI = () => {
    const formData = watch();
    onGenerateSuggestions(formData);
  };

  return (
    <FormProvider {...methods}>
      <ProductEditorContainer>
        <ScrollContainer indicatorStyle="black">
          <FormSection>
            <SectionTitle>{t('products.productInfo')}</SectionTitle>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextInput
                  label={t('product.nameLabel')}
                  value={value}
                  onChangeText={onChange}
                  placeholder={t('product.namePlaceholder')}
                  errors={error?.message ? [error.message] : undefined}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label={t('product.descriptionLabel')}
                  value={value || ''}
                  onChangeText={onChange}
                  placeholder={t('product.descriptionLabel')}
                  multiline
                  numberOfLines={4}
                  style={{ textAlignVertical: 'top', minHeight: 100 }}
                />
              )}
            />
            <AiButton
              onPress={handleGenerateAI}
              disabled={isGeneratingSuggestions || !product}
            >
              {isGeneratingSuggestions ? t('product.generatingAiSuggestions') : t('product.getAiSuggestions')}
            </AiButton>
          </FormSection>

          <FormSection>
            <SectionTitle>{t('product.customAttributes')}</SectionTitle>
            {sortedCustomAttributes.map((customAttribute, index) => (
              <CustomAttributeRow key={customAttribute.id}>
                <CustomAttributeLabel>
                  {customAttribute.name}
                </CustomAttributeLabel>
                <Controller
                  control={control}
                  name={`productCustomAttributesAttributes.${index}.value`}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value || ''}
                      onChangeText={onChange}
                      placeholder={t('products.enterValue')}
                    />
                  )}
                />
              </CustomAttributeRow>
            ))}
          </FormSection>

          <FormSection>
            <SectionTitle>{t('products.photos')}</SectionTitle>
          <ImagesContainer>
            {product?.images?.map((image: any) => {
              const imageId = image.signed_id || image.signedId;
              const isMarkedForDeletion = imagesToDestroy.has(imageId);
              return (
                <ImageWrapper key={imageId} style={{ opacity: isMarkedForDeletion ? 0.4 : 1 }}>
                  <TouchableOpacity
                    onPress={() => onImagePress(`https://api.xanyah.io${image.large || image.medium}`)}
                    activeOpacity={0.8}
                  >
                    <ProductImageStyled source={{ uri: `https://api.xanyah.io${image.medium}` }} />
                  </TouchableOpacity>
                  <DeleteImageButton
                    onPress={() => onToggleImageDestroy(imageId)}
                    style={{ backgroundColor: isMarkedForDeletion ? '#10b981' : '#ef4444' }}
                  >
                    {isMarkedForDeletion ? (
                      <UndoText>↺</UndoText>
                    ) : (
                      <Trash2 size={16} color="#fff" />
                    )}
                  </DeleteImageButton>
                </ImageWrapper>
              );
            })}
            <AddPhotoButton onPress={onOpenCamera}>
              <CameraIcon size={32} color="#9333ea" />
              <AddPhotoText>{t('products.addPhoto')}</AddPhotoText>
            </AddPhotoButton>
          </ImagesContainer>
        </FormSection>

        <Button onPress={handleSubmit(onSubmit)} disabled={isUpdating}>
          {isUpdating ? t('global.saving') : t('global.save')}
        </Button>

        <ScanButton onPress={onBackToScanning}>
          {t('products.scanAnother')}
        </ScanButton>
      </ScrollContainer>
    </ProductEditorContainer>
    </FormProvider>
  );
};

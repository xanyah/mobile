import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { formSchemaType } from './config';
import FormSection from '../form-section';
import TextInput from '../text-input';
import ManufacturerSelect from '../manufacturer-select';
import CategorySelect from '../category-select';

const ProductFormGeneral = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<formSchemaType>();

  return (
    <FormSection title={t('product.generalInformations')}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInput
            errors={error?.message ? [error.message] : undefined}
            onChange={onChange}
            value={value}
            placeholder={t('product.namePlaceholder')}
            label={t('product.nameLabel')}
          />
        )}
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CategorySelect
            error={error?.message}
            onChange={onChange}
            value={value}
            label={t('product.categoryLabel')}
            placeholder={t('product.categoryPlaceholder')}
          />
        )}
      />
      <Controller
        control={control}
        name="manufacturerId"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <ManufacturerSelect
            error={error?.message}
            onChange={onChange}
            value={value}
            label={t('product.manufacturerLabel')}
            placeholder={t('product.manufacturerPlaceholder')}
          />
        )}
      />

    </FormSection>
  );
};

export default ProductFormGeneral;

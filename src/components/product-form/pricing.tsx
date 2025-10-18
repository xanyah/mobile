import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ceil, isNumber, round, toNumber, toString } from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';
import { formSchemaType } from './config';
import FormSection from '../form-section';
import TextInput from '../text-input';
import { useVatRate } from '../../hooks/vat-rates';
import { Switch, Text } from 'react-native';
import VatRateSelect from '../vat-rate-select';

const ProductFormPricing = () => {
  const { t } = useTranslation();
  const { control, setValue, watch } = useFormContext<formSchemaType>();
  const vatRateId = watch('vatRateId');
  const ratioValue = watch('ratio');
  const buyingAmount = watch('buyingAmount');
  const ratioEnabled = watch('ratioEnabled');

  const { data: vatRateData } = useVatRate(vatRateId);

  const processedVatRate = useMemo(
    () => (vatRateData?.data.ratePercentCents || 0) / 10000,
    [vatRateData?.data],
  );

  const setPriceFromRatio = useCallback(() => {
    if (isNaN(buyingAmount) || !isNumber(ratioValue) || isNaN(ratioValue)) {
      return;
    }

    const total = buyingAmount * ratioValue;

    setValue('amount', round(total, 2));
    setValue('taxFreeAmount', round(ceil(total / (1 + processedVatRate), 2), 2));
  }, [buyingAmount, processedVatRate, setValue, ratioValue]);

  const setPriceFromTaxFreePrice = useCallback(
    (value: number) => {
      if (isNaN(value)) {
        return;
      }

      setValue('taxFreeAmount', value);
      setValue('amount', ceil(value * (1 + processedVatRate), 2));
    },
    [processedVatRate, setValue],
  );

  const setTaxFreeFromPrice = useCallback(
    (value: number) => {
      if (isNaN(value)) {
        return;
      }

      setValue('amount', value);
      setValue('taxFreeAmount', ceil(value / (1 + processedVatRate), 2));
    },
    [processedVatRate, setValue],
  );

  useEffect(() => {
    if (ratioEnabled) {
      setPriceFromRatio();
    }
  }, [setPriceFromRatio, ratioEnabled]);

  return (
    <FormSection title={t('product.pricing')}>
      <Controller
        control={control}
        name="buyingAmount"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInput
            // icon={<Euro />}
            // step="0.1"
            // type="number"
            // hint={t('product.buyingAmountHint')}
            placeholder={t('product.buyingAmountPlaceholder')}
            label={t('product.buyingAmountLabel')}
            value={toString(value)}
            keyboardType="numeric"
            onChangeText={e => onChange(toNumber(e))}
            errors={error?.message ? [error.message] : undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="vatRateId"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <VatRateSelect
            error={error?.message}
            onChange={onChange}
            value={value}
            label={t('product.vatLabel')}
            placeholder={t('product.vatPlaceholder')}
          />
        )}
      />

      <Controller
        control={control}
        name="ratioEnabled"
        render={({ field: { onChange, value } }) => (
          <>
              <Switch
              value={value}
              onValueChange={onChange}
              />
              <Text>
              {t('product.ratioCheckbox')}
              </Text>
          </>
        )}
      />

      {ratioEnabled && (
        <Controller
          control={control}
          name="ratio"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInput
              // step="0.1"
              // type="number"
              // hint={t('product.ratioHint')}
              placeholder={t('product.ratioPlaceholder')}
              label={t('product.ratioLabel')}
              value={toString(value)}
              keyboardType="numeric"
              onChangeText={e => onChange(toNumber(e))}
              errors={error?.message ? [error?.message] : undefined}
            />
          )}
        />
      )}

      <Controller
        control={control}
        name="taxFreeAmount"
        render={({ field: { value }, fieldState: { error } }) => (
          <TextInput
            // hint={t('product.taxFreeAmountHint')}
            placeholder={t('product.taxFreeAmountPlaceholder')}
            label={t('product.taxFreeAmountLabel')}
            value={toString(value)}
            editable={!ratioEnabled}
            onChangeText={e => setPriceFromTaxFreePrice(toNumber(e))}
            errors={error?.message ? [error?.message] : undefined}
          />
        )}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field: { value }, fieldState: { error } }) => (
          // TODO: Should be tax_free amount * category.vat_rate
          <TextInput
            // icon={<Euro />}
            // step="0.1"
            // type="number"
            // hint={t('product.amountHint')}
            placeholder={t('product.amountPlaceholder')}
            label={t('product.amountLabel')}
            value={toString(value)}
            onChangeText={e => setTaxFreeFromPrice(toNumber(e))}
            errors={error?.message ? [error?.message] : undefined}
          />
        )}
      />
    </FormSection>
  );
};

export default ProductFormPricing;

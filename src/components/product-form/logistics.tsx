import { useTranslation } from 'react-i18next'
import { Controller, useFormContext } from 'react-hook-form'
import { formSchemaType } from './config'
import { useCallback, useState } from 'react'
import { useCurrentStore } from '../../hooks/stores'
import { getNextProductSku } from '../../api'
import FormSection from '../form-section'
import TextInput from '../text-input'
import Button from '../button'
import { View } from 'react-native'
import BarcodeScanner from '../barcode-scanner'
import { CodeScanner } from 'react-native-vision-camera'
import { head } from 'lodash'
import { SkuButtonsContainer, TextInputButtonContainer } from './styled-components'
import { Barcode, Copy, RefreshCcw } from 'lucide-react-native'

const ProductFormLogistics = () => {
  const store = useCurrentStore()
  const { t } = useTranslation()
  const { control, setValue, watch } = useFormContext<formSchemaType>()
  const [scannedField, setScannedField] = useState<keyof formSchemaType>()

  const copyUpc = useCallback(() => {
    setValue('sku', watch('upc'))
  }, [setValue, watch])

  const generateSku = useCallback(async () => {
    try {
      const { data } = await getNextProductSku({ storeId: store?.id })
      setValue('sku', data.nextSku.toString())
    }
    catch (err) {
      // captureException(err)
    }
  }, [store, setValue])

  const onScan = useCallback<CodeScanner['onCodeScanned']>((codes) => {
    const scannedCode = head(codes)?.value
    if (scannedField && scannedCode) {
      setValue(scannedField, scannedCode)
    }
    setScannedField(undefined)
  }, [setValue, scannedField, setScannedField])

  return (
    <FormSection title={t('product.logistics')}>
      <BarcodeScanner
        onScan={onScan}
        isOpen={!!scannedField}
        onClose={() => setScannedField(undefined)}
      />
      <Controller
        control={control}
        name="manufacturerSku"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInputButtonContainer>
            <TextInput
              containerStyle={{ flex: 1 }}
              // hint={t('product.manufacturerSkuHint')}
              errors={error?.message ? [error?.message] : undefined}
              onChange={onChange}
              value={value}
              placeholder={t('product.manufacturerSkuPlaceholder')}
              label={t('product.manufacturerSkuLabel')}
            />
            <Button onPress={() => setScannedField('manufacturerSku')}><Barcode size={18} color="white" /></Button>
          </TextInputButtonContainer>
        )}
      />

      <Controller
        control={control}
        name="upc"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextInputButtonContainer>
            <TextInput
              containerStyle={{ flex: 1 }}
              // hint={t('product.upcHint')}
              errors={error?.message ? [error?.message] : undefined}
              onChange={onChange}
              value={value}
              placeholder={t('product.upcPlaceholder')}
              label={t('product.upcLabel')}
            />

            <Button onPress={() => setScannedField('upc')}><Barcode size={18} color="white" /></Button>
          </TextInputButtonContainer>
        )}
      />

      <View>
        <Controller
          control={control}
          name="sku"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextInputButtonContainer>
              <TextInput
                containerStyle={{ flex: 1 }}
                // hint={t('product.skuHint')}
                errors={error?.message ? [error?.message] : undefined}
                onChange={onChange}
                value={value}
                placeholder={t('product.skuPlaceholder')}
                label={t('product.skuLabel')}
              />
              <Button onPress={() => setScannedField('sku')}><Barcode size={18} color="white" /></Button>
            </TextInputButtonContainer>
          )}
        />
        <SkuButtonsContainer>
          <Button onPress={copyUpc} style={{ flex: 1 }}>
            <Copy color="white" size={16} />
            {t('product.copyUpcToSku')}
          </Button>
          <Button onPress={generateSku} style={{ flex: 1 }}>
            <RefreshCcw color="white" size={16} />
            {t('product.generateSku')}
          </Button>
        </SkuButtonsContainer>
      </View>
    </FormSection>
  )
}

export default ProductFormLogistics

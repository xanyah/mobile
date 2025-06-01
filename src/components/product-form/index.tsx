import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isEmpty, omit } from 'lodash'
import { decamelizeKeys } from 'humps'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosResponse } from 'axios'
import { serialize } from 'object-to-formdata'
import ProductFormGeneral from './general'
import ProductFormLogistics from './logistics'
import ProductFormPricing from './pricing'
import { formSchema, formSchemaType } from './config'
import { useCurrentStore } from '../../hooks/stores'
import { createProduct } from '../../api'
import { MainContainer } from './styled-components'
import { useKeyboard } from '@react-native-community/hooks'
import Button from '../button'

type ProductFormProps = {
  onCancel?: () => void
  onSuccess?: (data: AxiosResponse<Product, any>) => void
}

const ProductForm = ({ onCancel, onSuccess }: ProductFormProps) => {
  const store = useCurrentStore()
  const { t } = useTranslation()
  const methods = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const {keyboardHeight, keyboardShown} = useKeyboard()
  const { handleSubmit, setValue } = methods

  const { mutate: createApiProduct } = useMutation({
    mutationFn: (newData: FormData) => createProduct(newData),
    onSuccess: (data) => {
      // toast.success(t('global.saved'), { id: toastId?.current || undefined })
      onSuccess?.(data)
    },
    onMutate: () => {
      // toastId.current = toast.loading(t('global.loading'))
    },
    onError: () => {
      // toast.error(t('global.savingError'), {
      //   id: toastId?.current || undefined,
      // })
    },
  })

  const onSubmit = useCallback(
    (data: formSchemaType) => {
      const formData = serialize({
        product: omit(decamelizeKeys(data), 'images'),
      })

      if (!isEmpty(data.images) && data.images) {
        data.images.forEach((item) => {
          if (item instanceof File) {
            formData.append('product[images][]', item)
          }
          else if (item.signed_id) {
            formData.append('product[images][]', item.signed_id)
          }
        })
      }
      else {
        formData.append('product[images][]', '')
      }

      createApiProduct(formData)
    },
    [createApiProduct],
  )

  useEffect(() => {
    if (store) {
      setValue('storeId', store?.id)
    }
  }, [setValue, store])

  return (
    <FormProvider {...methods}>
      <MainContainer style={{marginBottom: keyboardShown ? keyboardHeight : 0}}>
        <ProductFormGeneral />
        <ProductFormLogistics />
        <ProductFormPricing />
      <Button onPress={handleSubmit(onSubmit)}>{t('global.save')}</Button>
      </MainContainer>
    </FormProvider>
  )
}

export default ProductForm

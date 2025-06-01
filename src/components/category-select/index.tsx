import { useCurrentStore, useCategory } from '../../hooks'
import { useCallback } from 'react'
import { getCategories } from '../../api'
import ApiDataSelect from '../api-data-select'

interface CategorySelectProps {
  onChange: (newValue?: Category['id']) => void
  value?: Category['id']
  label: string
  placeholder: string
  error?: string
}

const CategorySelect = ({
  onChange,
  value,
  placeholder,
  label,
  error,
}: CategorySelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback(
    (searchQuery) => {
      return getCategories({
        'q[storeIdEq]': store?.id,
        'q[nameCont]': searchQuery,
        'q[s]': 'name',
      })
    },
    [store],
  )

  return (
    <ApiDataSelect
      key={store?.id}
      error={error}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      useRecordHook={useCategory}
      getRecordValue={(record: Category) => record.id}
      getRecordLabel={(record: Category) => record.name}
      getFilteredRecords={getFilteredRecords}
    />
  )
}

export default CategorySelect

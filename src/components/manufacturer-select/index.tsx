import { useCallback } from 'react'
import ApiDataSelect from '../api-data-select'
import { getManufacturers } from '../../api/manufacturers'
import { useManufacturer } from '../../hooks/manufacturers'
import { useCurrentStore } from '../../hooks/stores'

interface ManufacturerSelectProps {
  onChange: (newValue?: Manufacturer['id']) => void
  value: Manufacturer['id']
  label: string
  placeholder: string
  error?: string
}

const ManufacturerSelect = ({
  onChange,
  value,
  label,
  error,
  placeholder,
}: ManufacturerSelectProps) => {
  const store = useCurrentStore()

  const getFilteredRecords = useCallback(
    (searchQuery: string) => {
      return getManufacturers({
        'q[storeIdEq]': store?.id,
        'q[nameOrNotesCont]': searchQuery,
        'q[s]': 'name',
      })
    },
    [store],
  )

  return (
    <ApiDataSelect
      key={store?.id}
      label={label}
      error={error}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      useRecordHook={useManufacturer}
      getRecordValue={(record: Manufacturer) => record.id}
      getRecordLabel={(record: Manufacturer) => record.name}
      getFilteredRecords={getFilteredRecords}
    />
  )
}

export default ManufacturerSelect

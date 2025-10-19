import { useCallback, useEffect, useMemo, useState } from 'react';
import { map } from 'lodash';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Modal, Text } from 'react-native';
import TextInput from '../text-input';
import { Error, ErrorsContainer, Label, MainContainer, ResultContainer, ResultsContainer, SelectedContainer, SelectedMainContainer } from './styled-components';
import { ChevronDown } from 'lucide-react-native';

interface ApiDataSelectProps {
  onChange: (newValue?: string) => void
  value?: string
  useRecordHook: (recordId?: string) => UseQueryResult<AxiosResponse<any>>
  getRecordValue: (record: any) => string
  getRecordLabel: (record: any) => string
  getFilteredRecords: (searchQuery: string) => Promise<AxiosResponse<any[]>>
  label: string
  error?: string
  placeholder: string
}

const ApiDataSelect = ({
  onChange,
  value,
  useRecordHook,
  getRecordLabel,
  getRecordValue,
  getFilteredRecords,
  label,
  error,
  placeholder,
}: ApiDataSelectProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const { data } = useRecordHook(value);
  const [options, setOptions] = useState<{ label: string, value: any }[]>([]);

  const formatRecord = useCallback(
    (record: unknown) => {
      return {
        value: getRecordValue(record),
        label: getRecordLabel(record),
      };
    },
    [getRecordLabel, getRecordValue],
  );

  const selectValue = useMemo(() => {
    if (data?.data) {
      return formatRecord(data.data);
    }
    return null;
  }, [data, formatRecord]);

  const loadOptions = useCallback(
    async (inputValue: string) => {
      const { data } = await getFilteredRecords(inputValue);
      setOptions(map(data, formatRecord));
    },
    [getFilteredRecords, formatRecord],
  );

  const onResultPress = useCallback((result: any) => {
    onChange(result);
    setIsOpened(false);
  }, [onChange, setIsOpened]);

  useEffect(() => {
    if (isOpened) {
      loadOptions('');
    }
  }, [isOpened, loadOptions]);

  return (<>
    <SelectedMainContainer>
      {label && <Label>{label}</Label>}
      <SelectedContainer onPress={() => setIsOpened(true)}>
        <Text style={{ opacity: selectValue ? 1 : 0.2 }}>
          {selectValue ? selectValue.label : placeholder}
        </Text>
        <ChevronDown size={12} style={{opacity: 0.5}} />
      </SelectedContainer>
      {error && (
        <ErrorsContainer>
          <Error key={error}>{error}</Error>
        </ErrorsContainer>
      )}
    </SelectedMainContainer>

    <Modal
      visible={isOpened}
      presentationStyle="formSheet"
      animationType="slide"
      onRequestClose={() => setIsOpened(false)}
    >
      <MainContainer>
        <TextInput
          label={label}
          autoFocus
          onChangeText={loadOptions}
          placeholder={placeholder}
        />

        <ResultsContainer>
          {map(options, option => (
            <ResultContainer
              key={option.value}
              onPress={() => onResultPress(option.value)}
            >
              <Text>{option.label}</Text>
            </ResultContainer>
          ))}
        </ResultsContainer>
      </MainContainer>
    </Modal>
  </>);
};

export default ApiDataSelect;

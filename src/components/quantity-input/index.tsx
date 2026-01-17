import { Minus, Plus } from 'lucide-react-native';
import { Button, Container, TextInput } from './styled-components';
import { useEffect, useState } from 'react';

type QuantityInputProps = {
  quantity: number
  onChange?: (newValue: number) => void
}

const QuantityInput = ({ quantity, onChange }: QuantityInputProps) => {
  const [tempQuantity, setTempQuantity] = useState(quantity);

  useEffect(() => {
    setTempQuantity(quantity);
  }, [quantity]);

  return (
    <Container>
      <Button
        onPress={() => onChange?.(quantity - 1)}
      >
        <Minus size={24} color="grey" />
      </Button>
      <TextInput
        value={String(tempQuantity)}
        onChangeText={text => setTempQuantity(Number(text))}
        onBlur={() => onChange?.(tempQuantity)}
        keyboardType="numeric"
      />

      <Button
        onPress={() => onChange?.(quantity + 1)}
      >
        <Plus size={24} color="grey" />
      </Button>
    </Container>
  );
};

export default QuantityInput;

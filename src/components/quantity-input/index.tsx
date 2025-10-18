import { Minus, Plus } from 'lucide-react-native';
import { Button, Container, Text } from './styled-components';

type QuantityInputProps = {
  quantity: number
  onChange?: (newValue: number) => void
}

const QuantityInput = ({ quantity, onChange }: QuantityInputProps) => {
  return (
    <Container>
      <Button
        onPress={() => onChange?.(quantity - 1)}
      >
        <Minus size={24} color="grey" />
      </Button>
      <Text>{quantity}</Text>

      <Button
        onPress={() => onChange?.(quantity + 1)}
      >
        <Plus size={24} color="grey" />
      </Button>
    </Container>
  );
};

export default QuantityInput;

import { useMemo } from 'react';
import { Container, Text } from './styled-components';
import { useTranslation } from 'react-i18next';

type ShippingStateProps = {
  state: Shipping['state']
}

const ShippingState = ({ state }: ShippingStateProps) => {
  const { t } = useTranslation();
  const backgroundColor = useMemo(() => {
    switch (state) {
      case 'cancelled':
        return '#64748b';
      case 'validated':
        return '#22c55e';
      case 'pending':
        return '#f97316';
    }
  }, [state]);

  return (
    <Container style={{ backgroundColor }}>
      <Text>{t(`shipping.states.${state}`)}</Text>
    </Container>
  );
};

export default ShippingState;

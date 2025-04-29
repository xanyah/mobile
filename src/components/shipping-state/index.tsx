import { useMemo } from "react";
import { Container, Text } from "./styled-components";
import { useTranslation } from "react-i18next";

type ShippingStateProps = {
  state: Shipping['state']
}

const ShippingState = ({ state }: ShippingStateProps) => {
  const { t } = useTranslation()
  const backgroundColor = useMemo(() => {
    switch (state) {
      case 'cancelled':
        return '#FF0000'
      case 'validated':
        return '#FFC700'
      case 'pending':
        return '#FFFF00'
    }
  }, [state])

  return (
    <Container style={{ backgroundColor }}>
      <Text>{t(`shipping.states.${state}`)}</Text>
    </Container>
  )
};

export default ShippingState;

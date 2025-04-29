import styled from "styled-components/native";

export const ShippingContainer = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`

export const LeftContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
`

export const RightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
`

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
`

export const Date = styled.Text`
  color: #555;
`

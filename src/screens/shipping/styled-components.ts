import styled from "styled-components/native";

export const MainContainer = styled.View`
  padding: 20px;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`

export const ShippingContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
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

export const ProductTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
`

export const Date = styled.Text`
  color: #555;
`

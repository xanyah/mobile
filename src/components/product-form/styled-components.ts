import styled from "styled-components/native";

export const MainContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 32,
  }
})``

export const TextInputButtonContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  align-items: flex-end;
`

export const SkuButtonsContainer = styled.View`
  align-self: stretch;
  flex-direction: row;
  gap: 8px;
  margin-top: 8px;
`

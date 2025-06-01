import styled from "styled-components/native";

export const Container = styled.View`
  align-items: stretch;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;
`

export const Label = styled.Text`
  font-size: 12px;
  font-weight: 500;
`

export const Hint = styled.Text`
  font-size: 12px;
`

export const TextInput = styled.TextInput`
  border: 1px solid hsl(0 0% 89.8%);
  border-radius: 6px;
  padding: 8px 12px;
`

export const ErrorsContainer = styled.View`
  align-items: flex-end;
  flex-direction: column;
  gap: 2px;
`

export const Error = styled.Text`
  color: red;
  font-size: 12px;
`

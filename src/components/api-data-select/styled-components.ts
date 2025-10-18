import styled from 'styled-components/native';

export const MainContainer = styled.View`
  flex-direction: column;
  padding: 20px;
`;

export const ResultsContainer = styled.ScrollView``;


export const ResultContainer = styled.TouchableOpacity`
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ededed;
`;

export const SelectedContainer = styled.TouchableOpacity`
  border: 1px solid hsl(0 0% 89.8%);
  border-radius: 6px;
  padding: 8px 12px;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
`;

export const SelectedMainContainer = styled.View`
  align-items: stretch;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;
`;

export const Label = styled.Text`
  font-size: 12px;
  font-weight: 500;
`;

export const ErrorsContainer = styled.View`
  align-items: flex-end;
  flex-direction: column;
  gap: 2px;
`;

export const Error = styled.Text`
  color: red;
  font-size: 12px;
`;

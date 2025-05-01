import styled from "styled-components/native";

export const Container = styled.TouchableOpacity<{ size: 'md' | 'sm' }>`
  background: rgb(79, 70, 229);
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  padding: ${props => props.size === 'md' ? '8px 16px' : '4px 8px'};
`

export const Text = styled.Text`
  color: #fff;
  font-weight: 600;
`

import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity<{ size: 'md' | 'sm' }>`
  background: #7e22ce;
  border-radius: ${props => props.size === 'md' ? '12px' : '8px'};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 4px;
  padding: ${props => props.size === 'md' ? '8px 16px' : '4px 8px'};
`;

export const Text = styled.Text`
  align-items: center;
  gap: 16px;
  color: #fff;
  font-weight: 600;
`;

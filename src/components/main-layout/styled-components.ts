import styled from 'styled-components/native';

export const MainContainer = styled.View`
  background: #6d28d9;
  flex: 1;
`;

export const HeaderContainer = styled.View`
`;

export const HeaderContentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  gap: 16px;
`;

export const HeaderIconContainer = styled.View`
  height: 24px;
  width: 24px;
`;

export const HeaderTitleContainer = styled.View`
  flex: 1;
`;

export const HeaderTitle = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
`;

export const MainContentContainer = styled.View`
  background: #fff;
  border: 1px solid #6b21a8;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  border-bottom-width: 0;
  margin-horizontal: 4px;
  flex: 1;
`;

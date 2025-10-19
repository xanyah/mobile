import styled from 'styled-components/native';

export const CameraContainer = styled.View`
  background: #000;
  padding: 120px 80px;
`;

export const Camera = styled.View`
  border: 2px solid #fff;
  height: 120px;
`;

export const ProductFormContainer = styled.View`
  padding: 20px;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
`;

const CameraOverlayContainer = styled.View`
  background: rgba(0, 0, 0, .5);
  position: absolute;
`;

export const CameraOverlayTopContainer = styled(CameraOverlayContainer)`
  top: 0;
  left: 0;
  height: 60px;
  right: 0;
`;

export const CameraOverlayBottomContainer = styled(CameraOverlayContainer)`
  bottom: 0;
  left: 0;
  height: 60px;
  right: 0;
`;

export const CameraOverlayLeftContainer = styled(CameraOverlayContainer)`
  top: 60px;
  left: 0;
  bottom: 60px;
  width: 60px;
`;

export const CameraOverlayRightContainer = styled(CameraOverlayContainer)`
  top: 60px;
  bottom: 60px;
  width: 60px;
  right: 0;
`;

export const ProductBarcodeFormContainer = styled.View`
  align-items: flex-end;
  flex-direction: row;
  gap: 16px;
`;

export const ProductBarcodeInputContainer = styled.View`
  flex: 1;
`;

export const ProductImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ccc;
`;

export const ProductTitle = styled.Text`
  font-weight: 600;
`;

export const ProductSubtitle = styled.Text`
  color: #AAA;
`;

export const ProductContainer = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 16px;
  justify-content: space-between;
`;

export const ProductInfosContainer = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 8px;
`;

export const ProductDetailsContainer = styled.View`
  flex-direction: column;
`;

import styled from 'styled-components/native';

export const CameraContainer = styled.View`
  flex: 1;
  position: relative;
`;

export const CameraOverlayTopContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CameraOverlayBottomContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ScanInstructionText = styled.Text`
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export const CameraOverlayLeftContainer = styled.View`
  position: absolute;
  top: 200px;
  bottom: 200px;
  left: 0;
  width: 20px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CameraOverlayRightContainer = styled.View`
  position: absolute;
  top: 200px;
  bottom: 200px;
  right: 0;
  width: 20px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CameraCloseContainer = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  padding: 8px;
`;

export const ProductEditorContainer = styled.View`
  flex: 1;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
`;

export const FormSection = styled.View`
  margin-bottom: 24px;
`;

export const ImagesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ImageWrapper = styled.View`
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-color: #e5e7eb;
`;

export const DeleteImageButton = styled.TouchableOpacity`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: #ef4444;
  border-radius: 12px;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

export const AddPhotoButton = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 2px dashed #9333ea;
  background-color: #faf5ff;
  align-items: center;
  justify-content: center;
`;

export const CustomAttributeRow = styled.View`
  margin-bottom: 16px;
`;

export const CustomAttributeLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Camera, CameraDevice } from 'react-native-vision-camera';
import { X } from 'lucide-react-native';
import styled from 'styled-components/native';

import { CameraContainer, CameraCloseContainer } from '../styled-components';

const PhotoControls = styled.View`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  align-items: center;
`;

const CaptureButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: rgba(255, 255, 255, 0.3);
  justify-content: center;
  align-items: center;
`;

const CaptureButtonInner = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #fff;
`;

interface PhotoCaptureProps {
  device: CameraDevice;
  cameraRef: React.RefObject<Camera|null>;
  onClose: () => void;
  onCapture: () => void;
  onError: (error: any) => void;
}

export const PhotoCapture: React.FC<PhotoCaptureProps> = ({
  device,
  cameraRef,
  onClose,
  onCapture,
  onError,
}) => {
  return (
    <CameraContainer>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        onError={onError}
        photo={true}
        photoQualityBalance="balanced"
      />
      <CameraCloseContainer onPress={onClose}>
        <X size={24} color="#fff" />
      </CameraCloseContainer>
      <PhotoControls>
        <CaptureButton onPress={onCapture}>
          <CaptureButtonInner />
        </CaptureButton>
      </PhotoControls>
    </CameraContainer>
  );
};

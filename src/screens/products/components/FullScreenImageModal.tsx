import React from 'react';
import { Modal, Image, Dimensions, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import styled from 'styled-components/native';

const FullScreenModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.95);
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: 10;
  padding: 10px;
`;

const FullScreenImageStyled = styled.Image`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

interface FullScreenImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

export const FullScreenImageModal: React.FC<FullScreenImageModalProps> = ({
  imageUrl,
  onClose,
}) => {
  return (
    <Modal
      visible={imageUrl !== null}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <FullScreenModalContainer>
        <CloseButton onPress={onClose}>
          <X size={32} color="#fff" />
        </CloseButton>
        {imageUrl && (
          <FullScreenImageStyled
            source={{ uri: imageUrl }}
            resizeMode="contain"
          />
        )}
      </FullScreenModalContainer>
    </Modal>
  );
};

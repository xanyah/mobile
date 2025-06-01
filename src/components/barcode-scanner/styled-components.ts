import styled from "styled-components/native";

export const CameraContainer = styled.View`
  background: #000;
  height: 100%;
`

const CameraOverlayContainer = styled.View`
  background: rgba(0, 0, 0, .5);
  position: absolute;
`

export const CameraOverlayTopContainer = styled(CameraOverlayContainer)`
  top: 0;
  left: 0;
  height: 45%;
  right: 0;
`

export const CameraOverlayBottomContainer = styled(CameraOverlayContainer)`
  bottom: 0;
  left: 0;
  height: 45%;
  right: 0;
`

export const CameraOverlayLeftContainer = styled(CameraOverlayContainer)`
  top: 45%;
  left: 0;
  bottom: 45%;
  width: 60px;
`

export const CameraOverlayRightContainer = styled(CameraOverlayContainer)`
  top: 45%;
  bottom: 45%;
  width: 60px;
  right: 0;
`

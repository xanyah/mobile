import React from 'react'
import { Text } from 'react-native'
import Camera from 'react-native-camera'

export default () => (
  <Camera
    onBarCodeRead={e => console.log(e)}
    aspect={Camera.constants.Aspect.fill}
    style={{flex: 1}}
  >
  </Camera>
)

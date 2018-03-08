import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  View,
} from 'react-native'
import RNFS from 'react-native-fs'
import Camera from 'react-native-camera'

import {
  getVariantByBarcode,
} from '../../utils/api-helper'

export default class CameraView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false,
      imagePath: null,
      loading: false,
      variant: null,
    }
  }

  componentWillUnmount() {
    if (this.state.imagePath) {
      RNFS.unlink(this.state.imagePath)
    }
  }

  getByBarcode(e) {
    this.camera.capture().then((image) => {
      this.setState({
        editing: true, imagePath: image.path, loading: true,
      })
      getVariantByBarcode(e.data).then(({ data }) =>
        this.setState({ loading: false, variant: data }))
    })
  }

  render() {
    return this.state.editing
      ? (
        <ImageBackground source={{ isStatic: true, uri: this.state.imagePath }} style={{ height: '100%', width: '100%' }}>
          <View style={{
            alignItems: 'center', backgroundColor: 'white', borderRadius: 4, flex: 1, justifyContent: 'center', marginHorizontal: 20, marginVertical: 100,
          }}
          >
            {this.state.loading
              ? <ActivityIndicator color="black" />
              : (
                <View>
                  <Text style={{ color: 'blue', fontSize: 14 }}>{this.state.variant.product.name}</Text>
                  <Text style={{ color: 'blue', fontSize: 14 }}>{this.state.variant.barcode}</Text>
                  <Text style={{ color: 'blue', fontSize: 14 }}>{this.state.variant.product.manufacturer.name}</Text>
                  <Text style={{ color: 'blue', fontSize: 14 }}>{this.state.variant.product.category.name}</Text>
                </View>)}
          </View>
        </ImageBackground>
      )
      : (
        <Camera
          ref={(ref) => { this.camera = ref }}
          captureTarget={Camera.constants.CaptureTarget.temp}
          onBarCodeRead={e => this.getByBarcode(e)}
          aspect={Camera.constants.Aspect.fill}
          style={{ flex: 1 }}
        />
      )
  }
}

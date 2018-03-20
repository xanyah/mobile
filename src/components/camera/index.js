/* eslint-disable no-shadow */
import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import RNFS from 'react-native-fs'
import Camera from 'react-native-camera'
import PropTypes from 'prop-types'

import {
  colors,
} from '../../constants/styles'
import {
  getVariantByBarcode,
  getShippingVariantByShipping,
  updateShippingVariant,
} from '../../utils/api-helper'

export default class CameraView extends React.Component {
  componentWillMount() {
    this.resetState()
  }

  componentWillUnmount() {
    if (this.state.imagePath) {
      RNFS.unlink(this.state.imagePath)
    }
  }


  getVariant(barcode, getFunction) {
    const { entityId } = this.props
    getVariantByBarcode(barcode)
      .then(({ data: { id } }) =>
        getFunction(entityId, id)
          .then(({
            data: {
              id,
              quantity,
              variant,
            },
          }) => {
            this.setState({
              id,
              loading: false,
              quantity,
              variant,
            })
          })
          .catch(() =>
            this.setState({ loading: false, variant: {} })))
      .catch(() =>
        this.setState({ loading: false, variant: {} }))
  }

  getByBarcode(e) {
    this.camera.capture().then((image) => {
      this.setState({
        editing: true, imagePath: image.path, loading: true,
      }, () => (this.props.space === 'inventory'
        ? () => null
        : this.getVariant(e.data, getShippingVariantByShipping)))
    })
  }

  updateVariant() {
    const { id, quantity } = this.state
    const updateFunction = this.props.space === 'inventory'
      ? () => null
      : updateShippingVariant
    updateFunction(id, { quantity })
      .then(() => {
        this.props.infoNotification('Variant mis à jour')
        this.resetState()
      })
      .catch(() =>
        this.props.errorNotification('Erreur lors de la mise à jour'))
  }

  resetState() {
    this.setState({
      editing: false,
      id: '',
      imagePath: null,
      loading: false,
      quantity: 0,
      variant: null,
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
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    marginBottom: 20,
                    padding: 20,
                    width: '100%',
                  }}
                >
                  <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ color: colors.secondaryBlue, fontSize: 24 }}>
                        {this.state.variant.product.name}
                      </Text>
                      <Text style={{ color: colors.lightBlue, fontSize: 14 }}>
                        {this.state.variant.barcode}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.resetState()}>
                      <Text>X</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginVertical: 20 }}>
                    <Text style={{ color: colors.lightBlue, fontSize: 14 }}>
                      Manufacturer
                    </Text>
                    <Text style={{ color: colors.secondaryBlue, fontSize: 24 }}>
                      {this.state.variant.product.manufacturer.name}
                    </Text>
                  </View>
                  <View style={{ marginVertical: 20 }}>
                    <Text style={{ color: colors.lightBlue, fontSize: 14 }}>
                      Category
                    </Text>
                    <Text style={{ color: colors.secondaryBlue, fontSize: 24 }}>
                      {this.state.variant.product.category.name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => (this.state.quantity > 0
                        ? this.setState({ quantity: this.state.quantity - 1 })
                        : null)}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      keyboardType="numeric"
                      onChangeText={(value => this.setState({ quantity: parseInt(value, 10) }))}
                      style={{ flex: 1 }}
                      value={this.state.quantity.toString()}
                    />
                    <TouchableOpacity
                      onPress={() => this.setState({ quantity: this.state.quantity + 1 })}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.updateVariant()}
                  >
                    <Text>Enregistrer</Text>
                  </TouchableOpacity>
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

CameraView.propTypes = {
  entityId: PropTypes.string.isRequired,
  errorNotification: PropTypes.func.isRequired,
  infoNotification: PropTypes.func.isRequired,
  space: PropTypes.string.isRequired,
}

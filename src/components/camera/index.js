/* eslint-disable no-shadow */
import React from 'react'
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import I18n from 'react-native-i18n'
import RNFS from 'react-native-fs'
import Camera from 'react-native-camera'
import PropTypes from 'prop-types'

import Button from '../button'
import { icons } from '../../images'
import {
  colors,
} from '../../constants/styles'
import {
  getVariantByBarcode,
  getShippingVariantByShipping,
  updateShippingVariant,
  getInventoryVariantByInventory,
  updateInventoryVariant,
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
            this.setState({ editing: false, loading: false, variant: {} }, () =>
              this.props.errorNotification(I18n.t('variant_not_found')))))
      .catch(() =>
        this.setState({ editing: false, loading: false, variant: {} }, () =>
          this.props.errorNotification(I18n.t('variant_not_found'))))
  }

  getByBarcode(e) {
    this.camera.capture().then((image) => {
      this.setState({
        editing: true, imagePath: image.path, loading: true,
      }, () => (this.props.space === 'inventory'
        ? this.getVariant(e.data, getInventoryVariantByInventory)
        : this.getVariant(e.data, getShippingVariantByShipping)))
    })
  }

  updateVariant() {
    const { id, quantity } = this.state
    const updateFunction = this.props.space === 'inventory'
      ? updateInventoryVariant
      : updateShippingVariant
    updateFunction(id, { quantity })
      .then(() => {
        this.props.successNotification(I18n.t('variant_updated'))
        this.resetState()
      })
      .catch(() =>
        this.props.errorNotification(I18n.t('variant_update_error')))
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
    return [
      <TouchableOpacity
        key="back-button"
        onPress={this.props.goBack}
        style={{
          height: 50,
          left: 0,
          paddingHorizontal: 20,
          paddingVertical: 10,
          position: 'absolute',
          top: 0,
          width: 40,
          zIndex: 5,
        }}
      >
        <Image source={icons.previousWhite} />
      </TouchableOpacity>,
      this.state.editing
        ? (
          <ImageBackground key="editor" source={{ isStatic: true, uri: this.state.imagePath }} style={{ height: '100%', width: '100%' }}>
            <View style={{
              alignItems: 'center', backgroundColor: 'white', borderRadius: 4, flex: 1, justifyContent: 'center', marginHorizontal: 20, marginVertical: 100,
            }}
            >
              {this.state.loading
                ? <ActivityIndicator color="black" />
                : (
                  <ScrollView
                    style={{
                      flex: 1,
                      width: '100%',
                    }}
                    contentContainerStyle={{
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      marginBottom: 20,
                      padding: 20,
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
                        <Image source={icons.close} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                      <Text style={{ color: colors.lightBlue, fontSize: 14 }}>
                        {I18n.t('manufacturer')}
                      </Text>
                      <Text style={{ color: colors.secondaryBlue, fontSize: 24 }}>
                        {this.state.variant.product.manufacturer.name}
                      </Text>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                      <Text style={{ color: colors.lightBlue, fontSize: 14 }}>
                        {I18n.t('category')}
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
                        style={{
                          alignItems: 'center',
                          flex: 1,
                          justifyContent: 'center',
                        }}
                      >
                        <Image source={icons.minus} />
                      </TouchableOpacity>
                      <TextInput
                        keyboardType="numeric"
                        onChangeText={(value =>
                          this.setState({ quantity: parseInt(value, 10) || 0 }))}
                        style={{ flex: 1, fontSize: 24, textAlign: 'center' }}
                        value={this.state.quantity.toString()}
                      />
                      <TouchableOpacity
                        onPress={() => this.setState({ quantity: this.state.quantity + 1 })}
                        style={{
                          alignItems: 'center',
                          flex: 1,
                          justifyContent: 'center',
                        }}
                      >
                        <Image source={icons.plus} />
                      </TouchableOpacity>
                    </View>
                    <Button
                      onPress={() => this.updateVariant()}
                    >
                      {I18n.t('save')}
                    </Button>
                  </ScrollView>)}
            </View>
          </ImageBackground>
        )
        : (
          <Camera
            key="camera"
            ref={(ref) => { this.camera = ref }}
            captureTarget={Camera.constants.CaptureTarget.temp}
            onBarCodeRead={e => this.getByBarcode(e)}
            aspect={Camera.constants.Aspect.fill}
            style={{ flex: 1 }}
          />
        ),
    ]
  }
}

CameraView.propTypes = {
  entityId: PropTypes.string.isRequired,
  errorNotification: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  space: PropTypes.string.isRequired,
  successNotification: PropTypes.func.isRequired,
}

import React from 'react'
import {
  Text,
} from 'react-native'
import PropTypes from 'prop-types'

import FloatingButton from '../floating-button'

class InventoryPage extends React.Component {
  componentWillMount() {
    this.props.getVariants()
  }
  render() {
    return [
      ...this.props.variants.map(variant => <Text key={variant.id}>{variant.variant_id}</Text>),
      <FloatingButton
        key="action-button"
        onPress={this.props.goToCamera}
      />,
    ]
  }
}

InventoryPage.propTypes = {
  getVariants: PropTypes.func.isRequired,
  goToCamera: PropTypes.func.isRequired,
  variants: PropTypes.array.isRequired,
}

export default InventoryPage

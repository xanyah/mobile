import React from 'react'
import {
  FlatList,
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
      <FlatList
        data={this.props.variants}
        key="variants-list"
        keyExtractor={item => item.id}
        onRefresh={() => this.props.getVariants()}
        refreshing={this.props.loading}
        renderItem={({ item }) =>
          <Text key={item.id}>{item.quantity + item.variant.product.name}</Text>}
      />,
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
  loading: PropTypes.bool.isRequired,
  variants: PropTypes.array.isRequired,
}

export default InventoryPage

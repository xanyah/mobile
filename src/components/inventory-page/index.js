import React from 'react'
import {
  Text,
} from 'react-native'

class InventoryPage extends React.Component {
  componentWillMount() {
    this.props.getVariants()
  }
  render() {
    return this.props.variants.map(variant => <Text>{variant.variant_id}</Text>)
  }
}

export default InventoryPage

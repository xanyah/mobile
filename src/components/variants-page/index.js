import React from 'react'
import {
  FlatList,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'

import FloatingButton from '../floating-button'
import I18n from '../../i18n'
import { shortDate } from '../../utils/date-helper'

class InventoryPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state

    return {
      title: params ? params.title : '',
    }
  }

  componentWillMount() {
    this.props.getVariants()
    this.props.navigation.setParams({
      title: this.props.type === 'inventory'
        ? I18n.t('inventory_title', { date: shortDate(this.props.currentInventory.createdAt) })
        : this.props.currentShipping.provider.name,
    })
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
  currentInventory: PropTypes.object,
  currentShipping: PropTypes.object,
  getVariants: PropTypes.func.isRequired,
  goToCamera: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  type: PropTypes.string,
  variants: PropTypes.array.isRequired,
}

InventoryPage.defaultProps = {
  currentInventory: {},
  currentShipping: {},
  type: '',
}

export default InventoryPage

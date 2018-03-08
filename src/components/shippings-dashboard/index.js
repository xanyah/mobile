import React from 'react'
import {
  SectionList,
  Text,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

import FloatingButton from '../floating-button'
import {
  hasPermission,
} from '../../utils/permissions-helper'


class ShippingsDashboard extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.stores !== this.props.stores
      && nextProps.stores.length > 0
      && nextProps.shippings.length === 0
    ) {
      this.props.getShippings()
    }
  }

  render() {
    const {
      createShipping, currentStore, shippings, getShippings, loading, openShipping,
    } = this.props
    return [
      (
        <SectionList
          key="list"
          keyExtractor={item => item.id}
          onRefresh={getShippings}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openShipping(item)}
              style={styles.itemContainer}
            >
              <Text style={styles.itemTitle}>
                {item.provider.name}
              </Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
          sections={[
            { data: shippings.filter(shipping => !shipping.locked_at), title: 'current' },
            { data: shippings.filter(shipping => shipping.locked_at), title: 'locked' },
          ]}
        />
      ),
      currentStore && currentStore.storeMembership && hasPermission(currentStore.storeMembership.role, 'admin')
        ? (
          <FloatingButton
            key="button"
            onPress={createShipping}
          />
        )
        : null,
    ]
  }
}

ShippingsDashboard.propTypes = {
  createShipping: PropTypes.func.isRequired,
  currentStore: PropTypes.object.isRequired,
  getShippings: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  openShipping: PropTypes.func.isRequired,
  shippings: PropTypes.array.isRequired,
  stores: PropTypes.array.isRequired,
}

export default ShippingsDashboard

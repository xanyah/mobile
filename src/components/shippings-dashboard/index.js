import React from 'react'
import {
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

import FloatingButton from '../floating-button'
import I18n from '../../i18n'
import {
  hasPermission,
} from '../../utils/permissions-helper'
import {
  timeAgo,
} from '../../utils/date-helper'


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

  renderShipping(item) {
    const { openShipping } = this.props

    return (
      <TouchableOpacity
        onPress={() => openShipping(item)}
        style={styles.itemContainer}
      >
        <View>
          <Text style={styles.itemTitle}>{item.provider.name}</Text>
          <Text style={styles.itemSubtitle}>
            {item.locked_at
              ? I18n.t('done_at', { date: timeAgo(item.createdAt) })
              : I18n.t('started_at', { date: timeAgo(item.createdAt) })}
          </Text>
        </View>
        <View style={styles.articlesCountContainer}>
          <Text style={styles.itemCount}>{item.shippingVariantsCount}</Text>
          <Text style={styles.itemCountLabel}>{I18n.t('articles').toLowerCase()}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      createShipping, currentStore, shippings, getShippings, loading,
    } = this.props
    return [
      (
        <SectionList
          key="list"
          keyExtractor={item => item.id}
          onRefresh={getShippings}
          refreshing={loading}
          renderItem={({ item }) => this.renderShipping(item)}
          renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
          sections={[
            { data: shippings.filter(shipping => !shipping.locked_at), title: I18n.t('current') },
            { data: shippings.filter(shipping => shipping.locked_at), title: I18n.t('done') },
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

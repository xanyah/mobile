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
  shortDate,
  timeAgo,
} from '../../utils/date-helper'


class InventoriesDashboard extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.stores !== this.props.stores
      && nextProps.stores.length > 0
      && nextProps.inventories.length === 0
    ) {
      this.props.getInventories()
    }
  }

  renderInventory(item) {
    const { openInventory } = this.props

    return (
      <TouchableOpacity
        onPress={() => openInventory(item)}
        style={styles.itemContainer}
      >
        <View>
          <Text numberOfLines={1} style={styles.itemTitle}>{I18n.t('inventory_title', { date: shortDate(item.createdAt) })}</Text>
          <Text style={styles.itemSubtitle}>
            {item.lockedAt
              ? I18n.t('done_at', { date: timeAgo(item.createdAt) })
              : I18n.t('started_at', { date: timeAgo(item.createdAt) })}
          </Text>
        </View>
        <View style={styles.articlesCountContainer}>
          <Text style={styles.itemCount}>{item.inventoryVariantsCount}</Text>
          <Text style={styles.itemCountLabel}>{I18n.t('articles').toLowerCase()}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      createInventory, currentStore, inventories, getInventories, loading,
    } = this.props
    return [
      (
        <SectionList
          key="list"
          keyExtractor={item => item.id}
          onRefresh={getInventories}
          refreshing={loading}
          renderItem={({ item }) => this.renderInventory(item)}
          renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
          sections={[
            { data: inventories.filter(inventory => !inventory.lockedAt), title: I18n.t('current') },
            { data: inventories.filter(inventory => inventory.lockedAt), title: I18n.t('done') },
          ]}
        />
      ),
      currentStore && currentStore.storeMembership && hasPermission(currentStore.storeMembership.role, 'admin')
        ? (
          <FloatingButton
            key="button"
            onPress={createInventory}
          />
        )
        : null,
    ]
  }
}

InventoriesDashboard.propTypes = {
  createInventory: PropTypes.func.isRequired,
  currentStore: PropTypes.object.isRequired,
  getInventories: PropTypes.func.isRequired,
  inventories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  openInventory: PropTypes.func.isRequired,
  stores: PropTypes.array.isRequired,
}

export default InventoriesDashboard

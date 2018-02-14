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

  render() {
    const {
      createInventory, currentStore, inventories, getInventories, loading, openInventory,
    } = this.props
    return [
      (
        <SectionList
          key="list"
          keyExtractor={item => item.id}
          onRefresh={getInventories}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openInventory(item)}
              style={styles.itemContainer}
            >
              <Text style={styles.itemTitle}>{item.createdAt}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
          sections={[
            { data: inventories.filter(inventory => !inventory.locked_at), title: 'current' },
            { data: inventories.filter(inventory => inventory.locked_at), title: 'locked' },
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

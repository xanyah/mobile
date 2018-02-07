import React from 'react'
import {
  SectionList,
  Text,
  TouchableOpacity,
} from 'react-native'

import styles from './styles'

class InventoriesDashboard extends React.Component {
  componentWillReceiveProps(nextProps){
    if(nextProps.stores.length > 0 && nextProps.inventories.length === 0) {
      this.props.getInventories()
    }
  }

  render() {
    const { createInventory, inventories, getInventories, loading, openInventory } = this.props
    return [
      (
        <SectionList
          key="list"
          keyExtractor={item => item.id}
          onRefresh={getInventories}
          refreshing={loading}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => openInventory(item)}
              style={styles.itemContainer}
            >
              <Text style={styles.itemTitle}>{item.createdAt}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section}) => <Text style={styles.header}>{section.title}</Text>}
          sections={[
            {data: inventories.filter(inventory => !inventory.locked_at), title: 'current'},
            {data: inventories.filter(inventory => inventory.locked_at), title: 'locked'},
          ]}
        />
      ),
      (
        <TouchableOpacity
          key="button"
          onPress={createInventory}
          style={styles.actionButton}
        />
      ),
    ]
  }
}

export default InventoriesDashboard

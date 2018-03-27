import React from 'react'
import {
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

import I18n from '../../i18n'

export default class ShippingForm extends React.Component {
  static navigationOptions = {
    title: I18n.t('new_shipping'),
  }

  componentWillMount() {
    this.props.getProviders()
  }

  render() {
    const {
      createShipping,
      getProviders,
      loading,
      providers,
    } = this.props
    return [
      <Text key="title" style={styles.headerText}>{I18n.t('select_provider')}</Text>,
      <FlatList
        key="list"
        data={providers.sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })}
        keyExtractor={({ id }) => id}
        onRefresh={getProviders}
        refreshing={loading}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => createShipping(item.id)}
            style={styles.providerContainer}
          >
            <Text style={styles.provider}>{item.name}</Text>
          </TouchableOpacity>)}
      />,
    ]
  }
}

ShippingForm.propTypes = {
  createShipping: PropTypes.func.isRequired,
  getProviders: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  providers: PropTypes.array.isRequired,
}

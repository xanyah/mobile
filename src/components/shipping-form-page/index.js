import React from 'react'
import {
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

export default class ShippingForm extends React.Component {
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
    return (
      <FlatList
        data={providers}
        keyExtractor={({ id }) => id}
        onRefresh={getProviders}
        refreshing={loading}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => createShipping(item.id)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>)}
      />
    )
  }
}

ShippingForm.propTypes = {
  createShipping: PropTypes.func.isRequired,
  getProviders: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  providers: PropTypes.array.isRequired,
}

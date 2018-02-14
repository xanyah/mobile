import React from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

import { colors } from '../../constants/styles'

const Button = ({
  children,
  loading,
  onPress,
}) => (
  <TouchableOpacity
    key={JSON.stringify(loading)}
    onPress={loading ? null : onPress}
    style={loading ? styles.loadingContainer : styles.container}
  >
    {loading
      ? <ActivityIndicator color={colors.white} />
      : <Text style={styles.text}>{children.toUpperCase()}</Text>}
  </TouchableOpacity>
)

export default Button

Button.propTypes = {
  children: PropTypes.string,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
}

Button.defaultProps = {
  children: '',
  loading: false,
  onPress: () => null,
}

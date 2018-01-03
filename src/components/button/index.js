import React from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native'

import { colors } from '../../constants/styles'
import styles from './styles'

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

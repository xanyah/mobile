import React from 'react'
import {
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const FloatingButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.actionButton}
  />
)

FloatingButton.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default FloatingButton

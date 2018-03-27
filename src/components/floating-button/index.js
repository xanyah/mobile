import React from 'react'
import {
  Image,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

import { icons } from '../../images'

const FloatingButton = ({ onPress, icon }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.actionButton}
  >
    <Image source={icons[icon]} style={styles.actionButtonImage} />
  </TouchableOpacity>
)

FloatingButton.propTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func.isRequired,
}

FloatingButton.defaultProps = {
  icon: 'add',
}

export default FloatingButton

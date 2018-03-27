import React from 'react'
import {
  Image,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

import { icons } from '../../images'

const LogoutButton = ({ signOut }) => (
  <TouchableOpacity
    onPress={signOut}
    style={{
      marginHorizontal: 20,
    }}
  >
    <Image source={icons.power} />
  </TouchableOpacity>
)

LogoutButton.propTypes = {
  signOut: PropTypes.func.isRequired,
}

export default LogoutButton

import React from 'react'
import {
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

const LogoutButton = ({ signOut }) => (
  <TouchableOpacity
    onPress={signOut}
    style={{
      backgroundColor: 'red',
      height: 20,
      width: 20,
    }}
  />
)

LogoutButton.propTypes = {
  signOut: PropTypes.func.isRequired,
}

export default LogoutButton

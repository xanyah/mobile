import React from 'react'
import {
  TextInput,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

class LoginInput extends React.Component {
  componentDidMount() {
    this.props.reference(this.input)
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          {...this.props}
          underlineColorAndroid="transparent"
          ref={(ref) => { this.input = ref }}
          style={styles.input}
        />
      </View>
    )
  }
}

LoginInput.propTypes = {
  reference: PropTypes.func,
}

LoginInput.defaultProps = {
  reference: () => null,
}

export default LoginInput

import React from 'react'
import {
  ImageBackground,
  StatusBar,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

import Button from '../button'
import LoginInput from '../login-input'
import { wallpaper } from '../../images'
import i18n from '../../i18n'


export default class Login extends React.Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content')
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content')
  }

  render() {
    const {
      email, errors, loading, password, passwordInput, signIn, updateField,
    } = this.props
    return (
      <ImageBackground source={wallpaper} style={styles.mainContainer}>
        {errors.map(error =>
          <Text key={error} style={styles.error}>{error}</Text>)}
        <LoginInput
          autoFocus
          keyboardType="email-address"
          onChangeText={value => updateField('email', value)}
          onSubmitEditing={() => passwordInput.focus()}
          placeholder={i18n.t('email')}
          reference={value => updateField('emailInput', value)}
          returnKeyType="next"
          value={email}
        />
        <LoginInput
          onChangeText={value => updateField('password', value)}
          onSubmitEditing={signIn}
          placeholder={i18n.t('password')}
          reference={value => updateField('passwordInput', value)}
          returnKeyType="go"
          secureTextEntry
          value={password}
        />
        <Button
          loading={loading}
          onPress={signIn}
        >
          {i18n.t('login')}
        </Button>
      </ImageBackground>
    )
  }
}

Login.propTypes = {
  email: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  password: PropTypes.string,
  passwordInput: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),
  signIn: PropTypes.func,
  updateField: PropTypes.func,
}

Login.defaultProps = {
  email: '',
  errors: [],
  loading: false,
  password: '',
  passwordInput: null,
  signIn: () => null,
  updateField: () => null,
}

import React from 'react'
import {
  ImageBackground,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

import { wallpaper } from '../../images'
import { validateToken } from '../../utils/api-helper'
import { resetTo } from '../../utils/navigation-helper'
import { setDarkStatusbar, setLightStatusbar, setTranslucent } from '../../utils/statusbar-helper'


export default class Loading extends React.Component {
  componentDidMount() {
    const { getStores, navigation: { dispatch } } = this.props
    setTranslucent()
    setDarkStatusbar()
    validateToken()
      .then(() => {
        getStores()
        dispatch(resetTo('Dashboard'))
        setLightStatusbar()
      })
      .catch(() =>
        dispatch(resetTo('Login')))
  }

  render() {
    return (
      <ImageBackground source={wallpaper} style={styles.mainContainer} />
    )
  }
}

Loading.propTypes = {
  getStores: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}

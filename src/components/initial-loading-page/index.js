import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

import { colors } from '../../constants/styles'
import { wallpaper } from '../../images'
import { validateToken } from '../../utils/api-helper'
import { resetTo } from '../../utils/navigation-helper'
import { setDarkStatusbar, setLightStatusbar, setTranslucent } from '../../utils/statusbar-helper'


export default class Loading extends React.Component {
  componentDidMount() {
    const { dispatch, getStores, setFirstname } = this.props
    setTranslucent()
    setDarkStatusbar()
    validateToken()
      .then(({ data: { data: { firstname } } }) => {
        getStores()
        dispatch(resetTo('Dashboard'))
        setFirstname(firstname)
        setLightStatusbar()
      })
      .catch(() =>
        dispatch(resetTo('Login')))
  }

  render() {
    return (
      <ImageBackground source={wallpaper} style={styles.mainContainer}>
        <ActivityIndicator
          color={colors.white}
          size="large"
        />
      </ImageBackground>
    )
  }
}

Loading.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getStores: PropTypes.func.isRequired,
  setFirstname: PropTypes.func.isRequired,
}

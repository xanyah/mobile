import React from 'react'
import {
  Image,
  StatusBar,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import { wallpaper } from '../../images'
import { validateToken } from '../../utils/api-helper'
import { resetTo } from '../../utils/navigation-helper'

import styles from './styles'

export default class Loading extends React.Component {
  componentDidMount() {
    const { getInventories, getStores, navigation: { dispatch }} = this.props
    StatusBar.setBarStyle('light-content')
    validateToken()
      .then(() => {
        getStores()
        dispatch(resetTo('Dashboard'))
      })
      .catch(() => dispatch(resetTo('Login')))
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content')
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={wallpaper} style={styles.wallpaper} />
      </View>
    )
  }
}

Loading.propTypes = {
  navigation: PropTypes.object.isRequired,
}

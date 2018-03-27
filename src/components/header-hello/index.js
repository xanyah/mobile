import React from 'react'
import {
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'

import styles from './styles'

import I18n from '../../i18n'

const getHello = () => {
  const hour = parseInt(moment().hour(), 10)
  if (hour < 3) {
    return 'hello_evening'
  } else if (hour < 12) {
    return 'hello_morning'
  } else if (hour < 18) {
    return 'hello_afternoon'
  }
  return 'hello_evening'
}

const Hello = ({ firstname }) => (
  <Text
    style={styles.text}
  >
    {I18n.t(getHello(), { name: firstname })}
  </Text>
)

Hello.propTypes = {
  firstname: PropTypes.string,
}

Hello.defaultProps = {
  firstname: '',
}

export default Hello

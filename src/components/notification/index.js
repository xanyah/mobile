import React from 'react'
import {
  Text,
  TouchableOpacity,
} from 'react-native'
import TimerMixin from 'react-timer-mixin'
import PropTypes from 'prop-types'

import styles from './styles'

import { getNotificationColor } from '../../utils/notifications-helper'

export default class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.mixins = [ TimerMixin ]
  }

  componentWillReceiveProps(newProps) {
    if (newProps.notification.text !== this.props.notification.text) {
      setTimeout(() => this.props.destroyNotification(), 5000)
    }
  }

  render() {
    const { destroyNotification, notification: { text, type } } = this.props
    const colors = getNotificationColor(type)
    return (text
      ? (
        <TouchableOpacity
          onPress={destroyNotification}
          style={[ styles.notificationContainer, { backgroundColor: colors.background } ]}
        >
          <Text style={[ styles.notificationContent, { color: colors.text } ]}>
            {text.toUpperCase()}
          </Text>
        </TouchableOpacity>
      )
      : null)
  }
}

Notification.propTypes = {
  destroyNotification: PropTypes.func.isRequired,
  notification: PropTypes.object,
}

Notification.defaultProps = {
  notification: {},
}

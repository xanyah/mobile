import {
  NOTIFICATION_CREATE,
  NOTIFICATION_DESTROY,
} from '../constants/actions'

const createNotification = notification => ({
  notification,
  type: NOTIFICATION_CREATE,
})

export const destroyNotification = () => ({
  type: NOTIFICATION_DESTROY,
})

export const errorNotification = text =>
  createNotification({ text, type: 'error' })

export const infoNotification = text =>
  createNotification({ text, type: 'info' })

export const successNotification = text =>
  createNotification({ text, type: 'success' })

export const warningNotification = text =>
  createNotification({ text, type: 'warning' })

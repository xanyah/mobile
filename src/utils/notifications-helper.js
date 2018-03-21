import { colors } from '../constants/styles'

export const getNotificationColor = (type) => {
  switch (type) {
  case 'error':
    return {
      background: '#E53935',
      text: colors.white,
    }
  case 'success':
    return {
      background: '#43A047',
      text: colors.white,
    }
  case 'warning':
    return {
      background: '#FDD835',
      text: colors.black,
    }
  default:
    return {
      background: '#1E88E5',
      text: colors.white,
    }
  }
}

export default getNotificationColor

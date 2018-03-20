import {
  NOTIFICATION_CREATE,
  NOTIFICATION_DESTROY,
} from '../constants/actions'

export default (state = {}, action) => {
  switch (action.type) {
  case NOTIFICATION_CREATE:
    return action.notification
  case NOTIFICATION_DESTROY:
    return {}
  default:
    return state
  }
}

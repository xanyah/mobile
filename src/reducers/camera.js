import {
  CAMERA_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  entityId: '',
  space: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case CAMERA_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}

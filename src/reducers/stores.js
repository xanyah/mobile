import {
  STORES_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  stores: [],
  loading: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
  case STORES_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}

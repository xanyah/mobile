import {
  SHIPPINGS_UPDATE_FIELD,
} from '../constants/actions'

const initialState = {
  currentShipping: {},
  loading: false,
  shippings: [],
  variants: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case SHIPPINGS_UPDATE_FIELD:
    return {
      ...state,
      [action.field]: action.value,
    }
  default:
    return state
  }
}

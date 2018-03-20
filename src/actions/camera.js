import {
  CAMERA_UPDATE_FIELD,
} from '../constants/actions'

export const updateCameraField = (field, value) => ({
  field,
  type: CAMERA_UPDATE_FIELD,
  value,
})

export default {
  updateCameraField,
}

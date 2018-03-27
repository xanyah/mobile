import { connect } from 'react-redux'

import { successNotification, errorNotification } from '../../actions'
import Camera from '../../components/camera'
import { goBack } from '../../utils/navigation-helper'

const mapStateToProps = ({ camera: { entityId, space } }) => ({
  entityId,
  space,
})

const mapDispatchToProps = dispatch => ({
  errorNotification: text => dispatch(errorNotification(text)),
  goBack: () => dispatch(goBack()),
  successNotification: text => dispatch(successNotification(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)

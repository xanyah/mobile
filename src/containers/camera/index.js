import { connect } from 'react-redux'

import { infoNotification, errorNotification } from '../../actions'
import Camera from '../../components/camera'

const mapStateToProps = ({ camera: { entityId, space } }) => ({
  entityId,
  space,
})

const mapDispatchToProps = dispatch => ({
  errorNotification: text => dispatch(errorNotification(text)),
  infoNotification: text => dispatch(infoNotification(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)

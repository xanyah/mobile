import { connect } from 'react-redux'

import { destroyNotification } from '../../actions'
import Notification from '../../components/notification'

const mapStateToProps = ({ notification }) => ({
  notification,
})

const mapDispatchToProps = dispatch => ({
  destroyNotification: () => dispatch(destroyNotification()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)

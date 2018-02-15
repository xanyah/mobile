import { connect } from 'react-redux'

import { signOut } from '../../actions'
import { resetTo } from '../../utils/navigation-helper'
import LogoutButton from '../../components/header-logout-button'

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  signOut: () => dispatchProps.dispatch(signOut(() =>
    dispatchProps.dispatch(resetTo('InitialLoading')))),
})

export default connect(null, mapDispatchToProps, mergeProps)(LogoutButton)

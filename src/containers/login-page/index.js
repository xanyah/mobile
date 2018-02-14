import { connect } from 'react-redux'

import { signIn, updateAuthField } from '../../actions'
import { resetTo } from '../../utils/navigation-helper'
import Login from '../../components/login-page'

const mapStateToProps = ({
  auth: {
    email, errors, loading, password, passwordInput,
  },
}) => ({
  email,
  errors,
  loading,
  password,
  passwordInput,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  updateField: (field, value) => dispatch(updateAuthField(field, value)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  signIn: () => dispatchProps.dispatch(signIn(
    stateProps.email,
    stateProps.password,
    () => ownProps.navigation.dispatch(resetTo('InitialLoading'))
  )),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login)

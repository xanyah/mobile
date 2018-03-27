import { connect } from 'react-redux'

import Loading from '../../components/initial-loading-page'
import { getInventories, getStores, updateAuthField } from '../../actions'

const mapDispatchToProps = dispatch => ({
  dispatch,
  getInventories: () => dispatch(getInventories()),
  getStores: () => dispatch(getStores()),
  setFirstname: firstname => dispatch(updateAuthField('firstname', firstname)),
})

export default connect(null, mapDispatchToProps)(Loading)

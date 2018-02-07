import { connect } from 'react-redux'
import Loading from '../../components/initial-loading-page'
import { getInventories, getStores } from '../../actions'

const mapDispatchToProps = dispatch => ({
  getInventories: () => dispatch(getInventories()),
  getStores: () => dispatch(getStores()),
})

export default connect(null, mapDispatchToProps)(Loading)

import { connect } from 'react-redux'

import Hello from '../../components/header-hello'

const mapStateToProps = ({ auth: { firstname } }) => ({
  firstname,
})

export default connect(mapStateToProps)(Hello)

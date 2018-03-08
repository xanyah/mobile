import { connect } from 'react-redux'

import {
  createShipping,
  getProviders,
} from '../../actions'
import ShippingForm from '../../components/shipping-form-page'
import { goTo } from '../../utils/navigation-helper'

const mapStateToProps = ({ providers: { loading, providers } }) => ({
  loading,
  providers,
})

const mapDispatchToProps = dispatch => ({
  createShipping: (providerId) => {
    dispatch(createShipping(providerId))
    dispatch(goTo('Shipping'))
  },
  getProviders: () => dispatch(getProviders()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm)

import { connect } from 'react-redux'

import ShippingsDashboard from '../../components/shippings-dashboard'
import { goTo } from '../../utils/navigation-helper'
import { createShipping, getShippings, updateShippingsField } from '../../actions'

const mapStateToProps = ({
  shippings: { shippings, loading },
  stores: { currentStore, stores },
}) => ({
  currentStore,
  loading,
  shippings,
  stores,
})

const mapDispatchToProps = dispatch => ({
  createShipping: () => dispatch(createShipping()),
  dispatch,
  getShippings: () => dispatch(getShippings()),
  updateShippingsField: (field, value) =>
    dispatch(updateShippingsField(field, value)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  createShipping: () =>
    dispatchProps.dispatch(goTo('ShippingForm')),
  openShipping: (shipping) => {
    dispatchProps.updateShippingsField('currentShipping', shipping)
    dispatchProps.dispatch(goTo('Shipping'))
  },
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ShippingsDashboard)

import { connect } from 'react-redux'

import Variants from '../../components/variants-page'
import { getShippingVariants } from '../../actions'
import { goTo } from '../../utils/navigation-helper'

const mapStateToProps = ({ shippings: { currentShipping, variants } }) => ({
  currentShipping,
  variants,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  getVariants: () => dispatchProps.dispatch(getShippingVariants(stateProps.currentShipping)),
  goToCamera: () => dispatchProps.dispatch(goTo('Camera')),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Variants)

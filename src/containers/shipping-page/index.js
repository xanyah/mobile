import { connect } from 'react-redux'

import Variants from '../../components/variants-page'
import {
  getShippingVariants,
  updateCameraField,
} from '../../actions'
import { goTo } from '../../utils/navigation-helper'

const mapStateToProps = ({ shippings: { currentShipping, loading, variants } }) => ({
  currentShipping,
  loading,
  variants,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  getVariants: () => dispatchProps.dispatch(getShippingVariants(stateProps.currentShipping.id)),
  goToCamera: () => {
    dispatchProps.dispatch(updateCameraField('space', 'shipping'))
    dispatchProps.dispatch(updateCameraField('entityId', stateProps.currentShipping.id))
    dispatchProps.dispatch(goTo('Camera'))
  },
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Variants)

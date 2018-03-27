import { connect } from 'react-redux'

import Variants from '../../components/variants-page'
import {
  getInventoryVariants,
  updateCameraField,
} from '../../actions'
import { lockInventory, deleteInventory } from '../../utils/api-helper'
import { goTo, goBack } from '../../utils/navigation-helper'

const mapStateToProps = ({ inventories: { currentInventory, loading, variants } }) => ({
  currentInventory,
  delete: deleteInventory,
  loading,
  lock: lockInventory,
  type: 'inventory',
  variants,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  goBack: () => dispatch(goBack()),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  getVariants: () => dispatchProps.dispatch(getInventoryVariants(stateProps.currentInventory)),
  goToCamera: () => {
    dispatchProps.dispatch(updateCameraField('space', 'inventory'))
    dispatchProps.dispatch(updateCameraField('entityId', stateProps.currentInventory.id))
    dispatchProps.dispatch(goTo('Camera'))
  },
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Variants)

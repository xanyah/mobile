import { connect } from 'react-redux'

import Inventory from '../../components/inventory-page'
import { getInventoryVariants } from '../../actions'
import { goTo } from '../../utils/navigation-helper'

const mapStateToProps = ({ inventories: { currentInventory, variants } }) => ({
  currentInventory,
  variants,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  getVariants: () => dispatchProps.dispatch(getInventoryVariants(stateProps.currentInventory)),
  goToCamera: () => dispatchProps.dispatch(goTo('Camera')),
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Inventory)

import { connect } from 'react-redux'
import Inventory from '../../components/inventory-page'
import { getInventoryVariants } from '../../actions'

const mapStateToProps = ({inventories: { currentInventory, variants }}) => ({
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
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Inventory)

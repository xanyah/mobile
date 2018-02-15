import { connect } from 'react-redux'

import InventoriesDashboard from '../../components/inventories-dashboard'
import { goTo } from '../../utils/navigation-helper'
import { createInventory, getInventories, updateInventoriesField } from '../../actions'

const mapStateToProps = ({
  inventories: { inventories, loading },
  stores: { currentStore, stores },
}) => ({
  currentStore,
  inventories,
  loading,
  stores,
})

const mapDispatchToProps = dispatch => ({
  createInventory: () => dispatch(createInventory()),
  dispatch,
  getInventories: () => dispatch(getInventories()),
  updateInventoriesField: (field, value) =>
    dispatch(updateInventoriesField(field, value)),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  ...stateProps,
  createInventory: () => {
    dispatchProps.createInventory()
    dispatchProps.dispatch(goTo('Inventory'))
  },
  openInventory: (inventory) => {
    dispatchProps.updateInventoriesField('currentInventory', inventory)
    dispatchProps.dispatch(goTo('Inventory'))
  },
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(InventoriesDashboard)

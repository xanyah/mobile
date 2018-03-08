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
  createInventory: () => {
    dispatch(createInventory())
    dispatch(goTo('Inventory'))
  },
  dispatch,
  getInventories: () => dispatch(getInventories()),
  openInventory: (value) => {
    dispatch(updateInventoriesField('currentInventory', value))
    dispatch(goTo('Inventory'))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(InventoriesDashboard)

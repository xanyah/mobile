interface Inventory {
  id: string
  lockedAt: string
  createdAt: string
  updatedAt: string
}

interface InventoryProduct {
  id: string
  quantity: number
  createdAt: string
  updatedAt: string
  product: Product
  inventory: Inventory
}

import { computed } from "vue"
import { useProductsStore } from "~/stores/products"

export const useProducts = () => {
  const productsStore = useProductsStore()

  return {
    // State
    products: computed(() => productsStore.products),
    searchQuery: computed({
      get: () => productsStore.searchQuery,
      set: (value) => productsStore.setSearchQuery(value),
    }),
    selectedCategory: computed({
      get: () => productsStore.selectedCategory,
      set: (value) => productsStore.setSelectedCategory(value),
    }),
    stockFilter: computed({
      get: () => productsStore.stockFilter,
      set: (value) => productsStore.setStockFilter(value),
    }),
    showProductForm: computed(() => productsStore.showProductForm),
    editingProduct: computed(() => productsStore.editingProduct),
    productForm: computed(() => productsStore.productForm),

    // Getters
    categories: computed(() => productsStore.categories),
    filteredProducts: computed(() => productsStore.filteredProducts),
    lowStockProducts: computed(() => productsStore.lowStockProducts),
    outOfStockProducts: computed(() => productsStore.outOfStockProducts),

    // Actions
    openProductForm: productsStore.openProductForm,
    closeProductForm: productsStore.closeProductForm,
    saveProduct: productsStore.saveProduct,
    deleteProduct: productsStore.deleteProduct,
    updateStock: productsStore.updateStock,
  }
}
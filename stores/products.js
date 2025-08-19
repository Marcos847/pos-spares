import { defineStore } from "pinia"

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [
      { id: 1, name: "Brake Pads", sku: "BP001", category: "Engine Parts", price: 1500, stock: 25, min_stock: 5 },
      { id: 2, name: "Air Filter", sku: "AF001", category: "Engine Parts", price: 800, stock: 15, min_stock: 10 },
      { id: 3, name: "Headlight Bulb", sku: "HB001", category: "Electrical", price: 300, stock: 50, min_stock: 20 },
      { id: 4, name: "Spark Plug", sku: "SP001", category: "Engine Parts", price: 450, stock: 30, min_stock: 15 },
      { id: 5, name: "Oil Filter", sku: "OF001", category: "Engine Parts", price: 600, stock: 20, min_stock: 8 },
      { id: 6, name: "Battery", sku: "BT001", category: "Electrical", price: 3500, stock: 8, min_stock: 5 },
      { id: 7, name: "Brake Fluid", sku: "BF001", category: "Engine Parts", price: 450, stock: 12, min_stock: 5 },
      { id: 8, name: "Wiper Blades", sku: "WB001", category: "Electrical", price: 250, stock: 35, min_stock: 10 },
    ],
    searchQuery: "",
    selectedCategory: "",
    stockFilter: "",
    showProductForm: false,
    editingProduct: null,
    productForm: {
      name: "",
      sku: "",
      category: "",
      price: 0,
      stock: 0,
      min_stock: 0,
      description: "",
    },
  }),

  getters: {
    categories: (state) => {
      return [...new Set(state.products.map((p) => p.category))]
    },

    filteredProducts: (state) => {
      let filtered = state.products

      if (state.searchQuery) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(state.searchQuery.toLowerCase()),
        )
      }

      if (state.selectedCategory) {
        filtered = filtered.filter((p) => p.category === state.selectedCategory)
      }

      if (state.stockFilter) {
        switch (state.stockFilter) {
          case "in-stock":
            filtered = filtered.filter((p) => p.stock > (p.min_stock || 0))
            break
          case "low-stock":
            filtered = filtered.filter((p) => p.stock <= (p.min_stock || 0) && p.stock > 0)
            break
          case "out-of-stock":
            filtered = filtered.filter((p) => p.stock === 0)
            break
        }
      }

      return filtered
    },

    lowStockProducts: (state) => {
      return state.products.filter((p) => p.stock <= (p.min_stock || 0) && p.stock > 0)
    },

    outOfStockProducts: (state) => {
      return state.products.filter((p) => p.stock === 0)
    },
  },

  actions: {
    setSearchQuery(query) {
      this.searchQuery = query
    },

    setSelectedCategory(category) {
      this.selectedCategory = category
    },

    setStockFilter(filter) {
      this.stockFilter = filter
    },

    openProductForm(product = null) {
      if (product) {
        this.editingProduct = product
        this.productForm = { ...product }
      } else {
        this.editingProduct = null
        this.productForm = {
          name: "",
          sku: "",
          category: "",
          price: 0,
          stock: 0,
          min_stock: 0,
          description: "",
        }
      }
      this.showProductForm = true
    },

    closeProductForm() {
      this.showProductForm = false
      this.editingProduct = null
    },

    saveProduct() {
      if (this.editingProduct) {
        // Update existing product
        const index = this.products.findIndex((p) => p.id === this.editingProduct.id)
        if (index !== -1) {
          this.products[index] = { ...this.productForm }
        }
      } else {
        // Add new product
        const newProduct = {
          ...this.productForm,
          id: Date.now(),
          price: Number.parseFloat(this.productForm.price),
          stock: Number.parseInt(this.productForm.stock),
          min_stock: Number.parseInt(this.productForm.min_stock),
        }
        this.products.push(newProduct)
      }
      this.closeProductForm()
    },

    deleteProduct(id) {
      if (confirm("Are you sure you want to delete this product?")) {
        this.products = this.products.filter((p) => p.id !== id)
      }
    },

    updateStock(productId, newStock) {
      const product = this.products.find((p) => p.id === productId)
      if (product) {
        product.stock = newStock
      }
    },
  },
})

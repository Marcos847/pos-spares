import { ref, computed } from "vue"

export function useProducts() {
  const products = ref([
    {
      id: 1,
      name: "Brake Pads",
      sku: "BP001",
      category: "Engine Parts",
      price: 1500,
      stock: 25,
      min_stock: 5,
      description: "High quality brake pads for tuktuk",
    },
    {
      id: 2,
      name: "Air Filter",
      sku: "AF001",
      category: "Engine Parts",
      price: 800,
      stock: 15,
      min_stock: 10,
      description: "Engine air filter",
    },
    {
      id: 3,
      name: "Headlight Bulb",
      sku: "HB001",
      category: "Electrical",
      price: 300,
      stock: 50,
      min_stock: 20,
      description: "LED headlight bulb",
    },
    {
      id: 4,
      name: "Spark Plug",
      sku: "SP001",
      category: "Engine Parts",
      price: 450,
      stock: 30,
      min_stock: 15,
      description: "High performance spark plug",
    },
    {
      id: 5,
      name: "Oil Filter",
      sku: "OF001",
      category: "Engine Parts",
      price: 600,
      stock: 20,
      min_stock: 8,
      description: "Engine oil filter",
    },
    {
      id: 6,
      name: "Battery",
      sku: "BT001",
      category: "Electrical",
      price: 3500,
      stock: 8,
      min_stock: 5,
      description: "12V tuktuk battery",
    },
  ])

  const searchQuery = ref("")
  const selectedCategory = ref("")
  const stockFilter = ref("")
  const showProductForm = ref(false)
  const editingProduct = ref(null)

  const productForm = ref({
    name: "",
    sku: "",
    category: "",
    price: 0,
    stock: 0,
    min_stock: 0,
    description: "",
  })

  const categories = computed(() => {
    const cats = [...new Set(products.value.map((p) => p.category))]
    return cats
  })

  const filteredProducts = computed(() => {
    let filtered = products.value

    if (searchQuery.value) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    }

    if (selectedCategory.value) {
      filtered = filtered.filter((p) => p.category === selectedCategory.value)
    }

    if (stockFilter.value) {
      switch (stockFilter.value) {
        case "in-stock":
          filtered = filtered.filter((p) => p.stock > p.min_stock)
          break
        case "low-stock":
          filtered = filtered.filter((p) => p.stock <= p.min_stock && p.stock > 0)
          break
        case "out-of-stock":
          filtered = filtered.filter((p) => p.stock === 0)
          break
      }
    }

    return filtered
  })

  const openProductForm = (product = null) => {
    if (product) {
      editingProduct.value = product
      productForm.value = { ...product }
    } else {
      editingProduct.value = null
      productForm.value = {
        name: "",
        sku: "",
        category: "",
        price: 0,
        stock: 0,
        min_stock: 0,
        description: "",
      }
    }
    showProductForm.value = true
  }

  const closeProductForm = () => {
    showProductForm.value = false
    editingProduct.value = null
  }

  const saveProduct = () => {
    if (editingProduct.value) {
      // Update existing product
      const index = products.value.findIndex((p) => p.id === editingProduct.value.id)
      if (index !== -1) {
        products.value[index] = { ...productForm.value }
      }
    } else {
      // Add new product
      const newProduct = {
        ...productForm.value,
        id: Date.now(),
        price: Number.parseFloat(productForm.value.price),
        stock: Number.parseInt(productForm.value.stock),
        min_stock: Number.parseInt(productForm.value.min_stock),
      }
      products.value.push(newProduct)
    }
    closeProductForm()
  }

  const deleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      products.value = products.value.filter((p) => p.id !== id)
    }
  }

  return {
    products,
    searchQuery,
    selectedCategory,
    stockFilter,
    categories,
    filteredProducts,
    showProductForm,
    editingProduct,
    productForm,
    openProductForm,
    closeProductForm,
    saveProduct,
    deleteProduct,
  }
}

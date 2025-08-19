import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin(() => {
  const { useCartStore } = require("~/stores/cart")
  const { useProductsStore } = require("~/stores/products")
  const { useCreditStore } = require("~/stores/credit")

  const cartStore = useCartStore()
  const productsStore = useProductsStore()
  const creditStore = useCreditStore()

  if (process.client) {
    console.log("🔧 PLUGIN: Initializing Pinia stores on client...")

    console.log("🛒 PLUGIN: Cart store initialized with", cartStore.items?.length || 0, "items")
    console.log("📦 PLUGIN: Products store initialized with", productsStore.products?.length || 0, "products")
    console.log("💳 PLUGIN: Credit store initialized with", creditStore.creditSales?.length || 0, "credit sales")

    // Test cart functionality
    console.log("🧪 PLUGIN: Testing cart store methods...")
    console.log("🧪 PLUGIN: Cart addToCart method:", typeof cartStore.addToCart)
    console.log("🧪 PLUGIN: Cart items getter:", typeof cartStore.items)
  }
})

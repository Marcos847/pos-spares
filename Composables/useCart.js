import { storeToRefs } from "pinia"
import { useCartStore } from "~/stores/cart"

export const useCart = () => {
  const cartStore = useCartStore()

  console.log("🔧 useCart: Initializing composable")
  console.log("🔧 useCart: Store items:", cartStore.items?.length || 0)

  // Use storeToRefs for reactive state
  const { items, selectedCustomer, selectedPaymentMethod } = storeToRefs(cartStore)

  // Use storeToRefs for getters to ensure reactivity
  const { subtotal, vat, total, itemCount } = storeToRefs(cartStore)

  console.log("🔧 useCart: Reactive refs created")

  return {
    // Reactive state
    cart: items,
    selectedCustomer,
    selectedPaymentMethod,

    // Reactive getters
    subtotal,
    vat,
    total,
    itemCount,

    // Actions with enhanced logging
    addToCart: (product) => {
      console.log("🔧 useCart: addToCart called with:", product)
      console.log("🔧 useCart: Current cart length before:", items.value?.length || 0)

      try {
        cartStore.addToCart(product)
        console.log("🔧 useCart: addToCart completed, new length:", items.value?.length || 0)
      } catch (error) {
        console.error("❌ useCart: Error in addToCart:", error)
      }
    },

    updateQuantity: (productId, newQuantity) => {
      console.log("🔧 useCart: updateQuantity called:", productId, newQuantity)
      cartStore.updateQuantity(productId, newQuantity)
    },

    removeFromCart: (productId) => {
      console.log("🔧 useCart: removeFromCart called:", productId)
      cartStore.removeFromCart(productId)
    },

    clearCart: () => {
      console.log("🔧 useCart: clearCart called")
      cartStore.clearCart()
    },

    processPayment: (partialPaymentData) => {
      console.log("🔧 useCart: processPayment called with:", partialPaymentData)
      return cartStore.processPayment(partialPaymentData)
    },
  }
}
import { reactive, computed } from "vue"

export function useCart() {
  // Use reactive instead of ref for better object reactivity
  const state = reactive({
    cart: [],
    selectedCustomer: "",
    selectedPaymentMethod: "Cash",
    creditAmountPaid: 0,
  })

  const subtotal = computed(() => {
    return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const vat = computed(() => {
    return Math.round(subtotal.value * 0.16)
  })

  const total = computed(() => {
    return subtotal.value + vat.value
  })

  const addToCart = (product) => {
    const existingItemIndex = state.cart.findIndex((item) => item.id === product.id)

    if (existingItemIndex !== -1) {
      // Update existing item
      state.cart[existingItemIndex].quantity += 1
    } else {
      // Add new item
      state.cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: 1,
      })
    }
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    const itemIndex = state.cart.findIndex((item) => item.id === id)
    if (itemIndex !== -1) {
      state.cart[itemIndex].quantity = newQuantity
    }
  }

  const removeFromCart = (id) => {
    const index = state.cart.findIndex((item) => item.id === id)
    if (index !== -1) {
      state.cart.splice(index, 1)
    }
  }

  const clearCart = () => {
    state.cart.length = 0
    state.selectedCustomer = ""
    state.selectedPaymentMethod = "Cash"
    state.creditAmountPaid = 0
  }

  const processPayment = () => {
    if (state.cart.length === 0) {
      alert("Cart is empty!")
      return
    }

    // Create receipt
    const receipt = {
      transaction_id: "TXN" + Date.now(),
      items: [...state.cart],
      subtotal: subtotal.value,
      vat: vat.value,
      total: total.value,
      payment_method: state.selectedPaymentMethod,
      customer_name: state.selectedCustomer || "Walk-in Customer",
      date: new Date().toLocaleString(),
    }

    // Show receipt (you can replace this with a modal later)
    const receiptText = `
BLESSINGS AUTO SPARE
Receipt #: ${receipt.transaction_id}
Date: ${receipt.date}
Customer: ${receipt.customer_name}

Items:
${receipt.items.map((item) => `${item.name} x${item.quantity} = KSh ${(item.price * item.quantity).toLocaleString()}`).join("\n")}

Subtotal: KSh ${receipt.subtotal.toLocaleString()}
VAT (16%): KSh ${receipt.vat.toLocaleString()}
Total: KSh ${receipt.total.toLocaleString()}

Payment Method: ${receipt.payment_method}
Thank you for your business!
    `

    alert(receiptText)
    clearCart()
  }

  return {
    // Expose reactive state
    cart: computed(() => state.cart),
    selectedCustomer: computed({
      get: () => state.selectedCustomer,
      set: (value) => (state.selectedCustomer = value),
    }),
    selectedPaymentMethod: computed({
      get: () => state.selectedPaymentMethod,
      set: (value) => (state.selectedPaymentMethod = value),
    }),
    creditAmountPaid: computed({
      get: () => state.creditAmountPaid,
      set: (value) => (state.creditAmountPaid = value),
    }),

    // Computed values
    subtotal,
    vat,
    total,

    // Methods
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    processPayment,
  }
}

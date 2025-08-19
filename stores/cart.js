import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    selectedCustomer: "",
    selectedPaymentMethod: "Cash",
  }),

  getters: {
    subtotal: (state) => {
      const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      console.log("💰 Subtotal calculated:", total, "from items:", state.items.length)
      return total
    },

    vat: (state) => {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const vatAmount = Math.round(subtotal * 0.16)
      console.log("💰 VAT calculated:", vatAmount)
      return vatAmount
    },

    total() {
      const total = this.subtotal + this.vat
      console.log("💰 Total calculated:", total)
      return total
    },

    itemCount: (state) => {
      const count = state.items.reduce((count, item) => count + item.quantity, 0)
      console.log("🛒 Item count:", count, "from", state.items.length, "unique items")
      return count
    },
  },

  actions: {
    addToCart(product) {
      console.log("🛒 CART STORE: Adding product to cart:", product)
      console.log("🛒 CART STORE: Current items before add:", JSON.stringify(this.items))

      if (!product || !product.id) {
        console.error("❌ Invalid product:", product)
        return
      }

      const existingIndex = this.items.findIndex((item) => item.id === product.id)

      if (existingIndex >= 0) {
        this.items[existingIndex].quantity++
        console.log("🛒 CART STORE: Updated existing item quantity:", this.items[existingIndex])
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          quantity: 1,
        }
        this.items.push(newItem)
        console.log("🛒 CART STORE: Added new item:", newItem)
      }

      console.log("🛒 CART STORE: Items after add:", JSON.stringify(this.items))
      console.log("🛒 CART STORE: New item count:", this.itemCount)

      // Force reactivity update
      this.$patch({})
    },

    updateQuantity(productId, newQuantity) {
      console.log("🛒 CART STORE: Updating quantity for product:", productId, "to:", newQuantity)

      if (newQuantity <= 0) {
        this.removeFromCart(productId)
        return
      }

      const index = this.items.findIndex((item) => item.id === productId)
      if (index >= 0) {
        this.items[index].quantity = newQuantity
        console.log("🛒 CART STORE: Updated quantity:", this.items[index])
        this.$patch({})
      } else {
        console.error("❌ Product not found in cart:", productId)
      }
    },

    removeFromCart(productId) {
      console.log("🛒 CART STORE: Removing from cart:", productId)
      const initialLength = this.items.length
      this.items = this.items.filter((item) => item.id !== productId)
      console.log("🛒 CART STORE: Removed item, items:", initialLength, "->", this.items.length)
      this.$patch({})
    },

    clearCart() {
      console.log("🛒 CART STORE: Clearing cart")
      this.items = []
      this.selectedCustomer = ""
      this.selectedPaymentMethod = "Cash"
      this.$patch({})
    },

    setCustomer(customer) {
      console.log("🛒 CART STORE: Setting customer:", customer)
      this.selectedCustomer = customer
    },

    setPaymentMethod(method) {
      console.log("🛒 CART STORE: Setting payment method:", method)
      this.selectedPaymentMethod = method
    },

    processPayment(partialPaymentData = null) {
      console.log("🛒 CART STORE: Processing payment with data:", partialPaymentData)

      if (this.items.length === 0) {
        alert("Cart is empty!")
        return
      }

      // Import credit store dynamically to avoid circular dependency
      const { useCreditStore } = import("./credit")
      const creditStore = useCreditStore()

      const receipt = {
        transaction_id: `TXN${Date.now()}`,
        date: new Date().toLocaleString(),
        customer_name: this.selectedCustomer || "Walk-in",
        items: [...this.items],
        subtotal: this.subtotal,
        vat: this.vat,
        total: this.total,
        payment_method: this.selectedPaymentMethod,
      }

      console.log("🧾 Receipt generated:", receipt)

      // Handle credit sales
      if (this.selectedPaymentMethod === "Credit") {
        if (!this.selectedCustomer) {
          alert("Please select a customer for credit sales!")
          return
        }

        const amountPaidNow = partialPaymentData?.amountPaidNow || 0
        const creditAmount = this.total - amountPaidNow
        const cashPaymentMethod = partialPaymentData?.cashPaymentMethod || "Cash"

        creditStore.addCreditSale({
          customer_name: this.selectedCustomer,
          customer_phone: this.getCustomerPhone(this.selectedCustomer),
          total_amount: this.total,
          amount_paid: amountPaidNow,
          outstanding_amount: creditAmount,
          date: new Date().toISOString().split("T")[0],
          transaction_id: receipt.transaction_id,
          due_date: this.calculateDueDate(),
          items: [...this.items],
          initial_payment:
            amountPaidNow > 0
              ? {
                  amount: amountPaidNow,
                  method: cashPaymentMethod,
                  date: new Date().toISOString().split("T")[0],
                  time: new Date().toLocaleTimeString(),
                }
              : null,
        })

        if (amountPaidNow > 0) {
          alert(
            `Mixed payment completed!\n\nCash: KSh ${amountPaidNow.toLocaleString()} (${cashPaymentMethod})\nCredit: KSh ${creditAmount.toLocaleString()}\n\nCustomer: ${this.selectedCustomer}\nTransaction: ${receipt.transaction_id}`,
          )
        } else {
          alert(
            `Credit sale recorded!\nCustomer: ${this.selectedCustomer}\nAmount: KSh ${this.total.toLocaleString()}\nTransaction: ${receipt.transaction_id}`,
          )
        }
      } else {
        alert(`Sale completed!\nTotal: KSh ${this.total.toLocaleString()}\nPayment: ${this.selectedPaymentMethod}`)
      }

      this.clearCart()
    },

    getCustomerPhone(customerName) {
      const customers = {
        "John Doe": "0712345678",
        "Jane Smith": "0723456789",
        "Peter Kamau": "0734567890",
      }
      return customers[customerName] || "0700000000"
    },

    calculateDueDate() {
      const dueDate = new Date()
      dueDate.setDate(dueDate.getDate() + 30)
      return dueDate.toISOString().split("T")[0]
    },
  },
})
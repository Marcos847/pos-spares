<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-bold mb-4 flex items-center">
      <ShoppingCart class="h-5 w-5 mr-2" />
      Cart ({{ itemCount }} items)
    </h3>

    <!-- Debug Info -->
    <div class="bg-blue-50 border border-blue-200 rounded p-2 mb-4 text-xs">
      <strong>Cart Debug:</strong> {{ cartLength }} items | Payment: {{ selectedPaymentMethod }} | Customer: {{ selectedCustomer || 'None' }}
    </div>

    <!-- Cart Items -->
    <div v-if="cartLength === 0" class="text-center py-8 text-gray-500">
      <ShoppingCart class="h-12 w-12 mx-auto mb-2 text-gray-300" />
      <p>Cart is empty</p>
      <p class="text-sm">Click products to add them</p>
    </div>

    <div v-else class="space-y-3 mb-4 max-h-64 overflow-y-auto">
      <div 
        v-for="item in cart" 
        :key="item.id"
        class="flex justify-between items-center p-3 bg-gray-50 rounded border"
      >
        <div class="flex-1">
          <h4 class="font-medium text-sm">{{ item.name }}</h4>
          <p class="text-xs text-gray-600">KSh {{ item.price.toLocaleString() }} each</p>
          <p class="text-xs font-medium text-green-600">Total: KSh {{ (item.price * item.quantity).toLocaleString() }}</p>
        </div>
        
        <div class="flex items-center space-x-2">
          <button 
            @click="updateQuantity(item.id, item.quantity - 1)"
            class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
            :disabled="item.quantity <= 1"
          >
            <Minus class="h-3 w-3" />
          </button>
          
          <span class="w-8 text-center font-medium text-sm">{{ item.quantity }}</span>
          
          <button 
            @click="updateQuantity(item.id, item.quantity + 1)"
            class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <Plus class="h-3 w-3" />
          </button>
          
          <button 
            @click="removeFromCart(item.id)"
            class="w-6 h-6 bg-red-100 rounded flex items-center justify-center hover:bg-red-200 ml-2 transition-colors"
          >
            <X class="h-3 w-3 text-red-600" />
          </button>
        </div>
      </div>
    </div>

    <!-- Totals -->
    <div v-if="cartLength > 0" class="border-t pt-4 mb-4">
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>KSh {{ subtotal.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>VAT (16%):</span>
          <span>KSh {{ vat.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total:</span>
          <span class="text-green-600">KSh {{ total.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- Customer -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">Customer</label>
      <select 
        v-model="selectedCustomer"
        class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Walk-in Customer</option>
        <option value="John Doe">John Doe - 0712345678</option>
        <option value="Jane Smith">Jane Smith - 0723456789</option>
        <option value="Peter Kamau">Peter Kamau - 0734567890</option>
      </select>
    </div>

    <!-- Payment Method -->
    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">Payment Method</label>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="method in ['Cash', 'M-Pesa', 'Credit', 'Card']"
          :key="method"
          @click="selectedPaymentMethod = method"
          :class="[
            'p-2 text-sm rounded border transition-colors',
            selectedPaymentMethod === method 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-white hover:bg-gray-50 border-gray-300'
          ]"
        >
          {{ method }}
        </button>
      </div>
    </div>

    <!-- Credit Sale Options -->
    <div v-if="selectedPaymentMethod === 'Credit'" class="mb-4 space-y-3">
      <div class="p-3 bg-yellow-50 border border-yellow-200 rounded">
        <div class="flex items-center mb-2">
          <AlertTriangle class="h-4 w-4 text-yellow-600 mr-2" />
          <p class="text-sm font-medium text-yellow-800">Credit Sale Options</p>
        </div>
        <p class="text-xs text-yellow-700">Customer must be selected for credit sales</p>
      </div>

      <!-- Partial Payment Option -->
      <div>
        <label class="flex items-center mb-2">
          <input
            v-model="allowPartialPayment"
            type="checkbox"
            class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span class="text-sm font-medium text-gray-700">Allow partial payment now</span>
        </label>
      </div>

      <!-- Amount Paid Input (if partial payment enabled) -->
      <div v-if="allowPartialPayment">
        <label class="block text-sm font-medium text-gray-700 mb-2">Amount Paid Now</label>
        <input
          v-model.number="amountPaidNow"
          type="number"
          :max="total"
          min="0"
          placeholder="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div class="mt-1 text-xs text-gray-600">
          <p>Total: KSh {{ total.toLocaleString() }}</p>
          <p>Paying now: KSh {{ (amountPaidNow || 0).toLocaleString() }}</p>
          <p class="font-medium text-red-600">Credit amount: KSh {{ creditAmount.toLocaleString() }}</p>
        </div>
      </div>

      <!-- Payment Method for Cash Portion -->
      <div v-if="allowPartialPayment && amountPaidNow > 0">
        <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method for Cash Portion</label>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="method in ['Cash', 'M-Pesa', 'Card']"
            :key="method"
            @click="cashPaymentMethod = method"
            :class="[
              'p-2 text-sm rounded border transition-colors',
              cashPaymentMethod === method 
                ? 'bg-green-600 text-white border-green-600' 
                : 'bg-white hover:bg-gray-50 border-gray-300'
            ]"
          >
            {{ method }}
          </button>
        </div>
      </div>
    </div>

    <!-- Credit Sale Warning -->
    <div v-if="selectedPaymentMethod === 'Credit' && !selectedCustomer" class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
      <div class="flex items-center">
        <AlertTriangle class="h-4 w-4 text-yellow-600 mr-2" />
        <div>
          <p class="text-sm font-medium text-yellow-800">Credit Sale</p>
          <p class="text-xs text-yellow-700">Customer must be selected for credit sales</p>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="space-y-2">
      <button
        @click="handleProcessPayment"
        :disabled="cartLength === 0 || (selectedPaymentMethod === 'Credit' && !selectedCustomer)"
        class="w-full bg-green-600 text-white p-3 rounded font-medium hover:bg-green-700 disabled:bg-gray-300 transition-colors"
      >
        Complete Sale - KSh {{ total.toLocaleString() }}
      </button>
      
      <button
        @click="handleClearCart"
        :disabled="cartLength === 0"
        class="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300 disabled:bg-gray-100 transition-colors"
      >
        Clear Cart
      </button>
    </div>

    <!-- Debug Payment Data -->
    <div v-if="selectedPaymentMethod === 'Credit'" class="mt-4 p-2 bg-gray-100 rounded text-xs">
      <strong>Debug Payment Data:</strong><br>
      Allow Partial: {{ allowPartialPayment }}<br>
      Amount Now: {{ amountPaidNow || 0 }}<br>
      Cash Method: {{ cashPaymentMethod }}<br>
      Credit Amount: {{ creditAmount }}
    </div>
  </div>
</template>

<script setup>
import { ShoppingCart, Minus, Plus, X, AlertTriangle } from 'lucide-vue-next'
import { useCart } from '@/Composables/useCart'
import { watch, ref, computed } from 'vue'

const {
  cart,
  selectedCustomer,
  selectedPaymentMethod,
  subtotal,
  vat,
  total,
  itemCount,
  updateQuantity,
  removeFromCart,
  clearCart,
  processPayment
} = useCart()

const allowPartialPayment = ref(false)
const amountPaidNow = ref(0)
const cashPaymentMethod = ref('Cash')

const cartLength = computed(() => cart.value.length)
const creditAmount = computed(() => {
  if (!allowPartialPayment.value) return total.value
  return Math.max(0, total.value - (amountPaidNow.value || 0))
})

// Watch for payment method changes to reset partial payment options
watch(() => selectedPaymentMethod.value, (newMethod) => {
  console.log("🎯 Payment method changed to:", newMethod)
  if (newMethod !== 'Credit') {
    allowPartialPayment.value = false
    amountPaidNow.value = 0
    cashPaymentMethod.value = 'Cash'
  }
})

const handleClearCart = () => {
  if (confirm('Are you sure you want to clear the cart?')) {
    clearCart()
  }
}

const handleProcessPayment = () => {
  console.log("🎯 Processing payment with data:", {
    paymentMethod: selectedPaymentMethod.value,
    customer: selectedCustomer.value,
    allowPartialPayment: allowPartialPayment.value,
    amountPaidNow: amountPaidNow.value,
    cashPaymentMethod: cashPaymentMethod.value
  })

  const partialPaymentData = selectedPaymentMethod.value === 'Credit' ? {
    allowPartialPayment: allowPartialPayment.value,
    amountPaidNow: amountPaidNow.value || 0,
    cashPaymentMethod: cashPaymentMethod.value
  } : null
  
  processPayment(partialPaymentData)
}

// Debug: Watch cart changes
watch(() => cart.value, (newCart) => {
  console.log("🛒 CART COMPONENT: Cart changed:", newCart.length, "items")
}, { deep: true })
</script>
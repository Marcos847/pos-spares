<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <h3 class="text-lg font-bold mb-4 flex items-center">
      <ShoppingCart class="h-5 w-5 mr-2" />
      Cart ({{ cart.length }} items)
    </h3>

    <!-- Cart Items -->
    <div v-if="cart.length === 0" class="text-center py-8 text-gray-500">
      <ShoppingCart class="h-12 w-12 mx-auto mb-2 text-gray-300" />
      <p>Cart is empty</p>
      <p class="text-sm">Click products to add them</p>
    </div>

    <div v-else class="space-y-3 mb-4">
      <div 
        v-for="item in cart" 
        :key="item.id"
        class="flex justify-between items-center p-3 bg-gray-50 rounded border"
      >
        <div class="flex-1">
          <h4 class="font-medium">{{ item.name }}</h4>
          <p class="text-sm text-gray-600">KSh {{ item.price.toLocaleString() }} each</p>
          <p class="text-sm font-medium">Total: KSh {{ (item.price * item.quantity).toLocaleString() }}</p>
        </div>
        
        <div class="flex items-center space-x-2">
          <button 
            @click="updateQuantity(item.id, item.quantity - 1)"
            class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
          >
            <Minus class="h-4 w-4" />
          </button>
          
          <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
          
          <button 
            @click="updateQuantity(item.id, item.quantity + 1)"
            class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
          >
            <Plus class="h-4 w-4" />
          </button>
          
          <button 
            @click="removeFromCart(item.id)"
            class="w-8 h-8 bg-red-100 rounded flex items-center justify-center hover:bg-red-200 ml-2"
          >
            <X class="h-4 w-4 text-red-600" />
          </button>
        </div>
      </div>
    </div>

    <!-- Totals -->
    <div v-if="cart.length > 0" class="border-t pt-4 mb-4">
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>Subtotal:</span>
          <span>KSh {{ subtotal.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between">
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

    <!-- Actions -->
    <div class="space-y-2">
      <button
        @click="processPayment"
        :disabled="cart.length === 0"
        class="w-full bg-green-600 text-white p-3 rounded font-medium hover:bg-green-700 disabled:bg-gray-300 transition-colors"
      >
        Complete Sale - KSh {{ total.toLocaleString() }}
      </button>
      
      <button
        @click="handleClearCart"
        :disabled="cart.length === 0"
        class="w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300 disabled:bg-gray-100 transition-colors"
      >
        Clear Cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { ShoppingCart, Minus, Plus, X } from 'lucide-vue-next'
import { useCart } from '@/Composables/useCart'

const {
  cart,
  selectedCustomer,
  selectedPaymentMethod,
  subtotal,
  vat,
  total,
  updateQuantity,
  removeFromCart,
  clearCart,
  processPayment
} = useCart()

const handleClearCart = () => {
  if (confirm('Are you sure you want to clear the cart?')) {
    clearCart()
  }
}
</script>
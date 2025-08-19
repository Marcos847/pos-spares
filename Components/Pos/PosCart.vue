<template>
  <div>
    <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
      <ShoppingCart class="h-5 w-5 mr-2" />
      Current Sale
      <span
        v-if="cart.length > 0"
        class="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
      >
        {{ totalItems }} items
      </span>
    </h3>

    <!-- Cart Items -->
    <div class="space-y-3 mb-6 max-h-64 overflow-y-auto">
      <!-- Empty Cart State -->
      <div v-if="cart.length === 0" class="text-center text-gray-500 py-8">
        <ShoppingCart class="h-12 w-12 mx-auto mb-2 text-gray-300" />
        <p>No items in cart</p>
        <p class="text-xs">Click on products to add them</p>
      </div>

      <!-- Cart Items List -->
      <div
        v-for="item in cart"
        :key="item.id"
        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
      >
        <div class="flex-1">
          <h4 class="font-medium text-sm">{{ item.name }}</h4>
          <p class="text-xs text-gray-500">
            KSh {{ item.price.toLocaleString() }} each
          </p>
          <p class="text-xs text-gray-600 font-medium">
            Subtotal: KSh {{ (item.price * item.quantity).toLocaleString() }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="updateQuantity(item.id, item.quantity - 1)"
            class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <Minus class="h-3 w-3" />
          </button>
          <span class="w-8 text-center text-sm font-medium">{{
            item.quantity
          }}</span>
          <button
            @click="updateQuantity(item.id, item.quantity + 1)"
            class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <Plus class="h-3 w-3" />
          </button>
          <button
            @click="removeFromCart(item.id)"
            class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 ml-2 transition-colors"
          >
            <X class="h-3 w-3 text-red-600" />
          </button>
        </div>
      </div>
    </div>

    <!-- Customer Selection -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Customer</label
      >
      <select
        v-model="selectedCustomer"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Walk-in Customer</option>
        <option value="John Doe">John Doe - 0712345678</option>
        <option value="Jane Smith">Jane Smith - 0723456789</option>
        <option value="Peter Kamau">Peter Kamau - 0734567890</option>
      </select>
    </div>

    <!-- Totals Section -->
    <div class="border-t pt-4 mb-6 bg-gray-50 p-4 rounded-lg">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm text-gray-600">Subtotal:</span>
        <span class="text-sm font-medium"
          >KSh {{ subtotal.toLocaleString() }}</span
        >
      </div>
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm text-gray-600">VAT (16%):</span>
        <span class="text-sm font-medium">KSh {{ vat.toLocaleString() }}</span>
      </div>
      <div
        class="flex justify-between items-center text-lg font-bold border-t pt-2"
      >
        <span>Total:</span>
        <span class="text-green-600">KSh {{ total.toLocaleString() }}</span>
      </div>
    </div>

    <!-- Payment Method -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Payment Method</label
      >
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="method in ['Cash', 'M-Pesa', 'Bank Transfer', 'Credit']"
          :key="method"
          @click="selectedPaymentMethod = method"
          :class="[
            'px-3 py-2 text-sm rounded-md border transition-colors',
            selectedPaymentMethod === method
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
          ]"
        >
          {{ method }}
        </button>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-2">
      <button
        @click="processPayment"
        :disabled="cart.length === 0"
        class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Complete Sale - KSh {{ total.toLocaleString() }}
      </button>
      <button
        @click="handleClearCart"
        :disabled="cart.length === 0"
        class="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
      >
        Clear Cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ShoppingCart, Minus, Plus, X } from "lucide-vue-next";
import { useCart } from "@/Composables/useCart";

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
  processPayment,
} = useCart();

const totalItems = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0);
});

const handleClearCart = () => {
  if (confirm("Are you sure you want to clear the cart?")) {
    clearCart();
  }
};
</script>

<template>
  <div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition-all border hover:border-blue-300"
        @click="handleProductClick(product)"
      >
        <div class="aspect-square bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
          <Package class="h-8 w-8 text-gray-400" />
        </div>
        <h3 class="font-medium text-sm text-gray-900 mb-1">{{ product.name }}</h3>
        <p class="text-xs text-gray-500 mb-2">{{ product.category }}</p>
        <div class="flex justify-between items-center mb-2">
          <span class="text-lg font-bold text-blue-600">
            KSh {{ Number(product.price).toLocaleString() }}
          </span>
          <span class="text-xs text-gray-500">Stock: {{ product.stock }}</span>
        </div>
        <div class="w-full bg-blue-600 text-white py-1 px-2 rounded text-xs text-center">
          {{ product.stock > 0 ? 'Click to Add' : 'Out of Stock' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Package } from 'lucide-vue-next'
import { useProducts } from '@/Composables/useProducts'
import { useCart } from '@/Composables/useCart'

const { filteredProducts } = useProducts()
const { addToCart } = useCart()

const handleProductClick = (product) => {
  if (product.stock > 0) {
    addToCart(product)
    // No alert - just add silently
  }
}
</script>

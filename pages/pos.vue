<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Point of Sale</h1>
    
    <!-- Enhanced Debug Info -->
    <div class="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
      <strong>🐛 Debug Info:</strong><br>
      Cart Items: {{ itemCount }} ({{ cart?.length || 0 }} unique)<br>
      Products Available: {{ filteredProducts.length }}<br>
      Store State: {{ cartStoreDebug }}<br>
      Last Action: {{ lastAction }}
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Products Section -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Search and Filters -->
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="flex space-x-4">
            <div class="flex-1 relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              v-model="selectedCategory"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-4">Products ({{ filteredProducts.length }} available)</h3>
          
          <div v-if="filteredProducts.length === 0" class="text-center py-12 text-gray-500">
            <Package class="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p class="text-lg font-medium">No products found</p>
            <p class="text-sm">Try adjusting your search or category filter</p>
          </div>
          
          <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="border rounded-lg p-3 hover:border-blue-300 cursor-pointer transition-colors hover:shadow-md"
            >
              <div class="bg-gray-100 h-20 rounded mb-3 flex items-center justify-center">
                <Package class="h-8 w-8 text-gray-400" />
              </div>
              
              <h4 class="font-medium text-sm mb-1 truncate">{{ product.name }}</h4>
              <p class="text-xs text-gray-500 mb-2">{{ product.category }}</p>
              
              <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-blue-600 text-sm">KSh {{ product.price.toLocaleString() }}</span>
                <span 
                  :class="[
                    'text-xs px-2 py-1 rounded-full',
                    product.stock > 10 ? 'bg-green-100 text-green-800' : 
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ product.stock }}
                </span>
              </div>
              
              <button 
                @click="handleAddToCart(product)"
                :disabled="product.stock <= 0"
                class="w-full bg-blue-600 text-white py-2 px-2 rounded text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Cart Section -->
      <div>
        <PosCart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, Package } from 'lucide-vue-next'
import { useProducts } from '@/Composables/useProducts'
import { useCart } from '@/Composables/useCart'
import { watch, ref, computed } from 'vue'

const { searchQuery, selectedCategory, categories, filteredProducts } = useProducts()
const { addToCart, itemCount, cart } = useCart()

const lastAction = ref('None')

// Debug computed property
const cartStoreDebug = computed(() => {
  return `Items: ${cart.value?.length || 0}, Count: ${itemCount.value || 0}`
})

const handleAddToCart = (product) => {
  console.log("🎯 POS PAGE: Product clicked:", product.name, "ID:", product.id)
  console.log("🎯 POS PAGE: Product stock:", product.stock)
  console.log("🎯 POS PAGE: Current cart before add:", cart.value?.length || 0)
  
  lastAction.value = `Adding ${product.name} at ${new Date().toLocaleTimeString()}`
  
  if (product.stock > 0) {
    console.log("🎯 POS PAGE: Adding to cart...")
    
    try {
      addToCart(product)
      console.log("🎯 POS PAGE: Add to cart completed")
      console.log("🎯 POS PAGE: Cart after add:", cart.value?.length || 0)
      lastAction.value = `Added ${product.name} successfully`
    } catch (error) {
      console.error("❌ POS PAGE: Error adding to cart:", error)
      lastAction.value = `Error adding ${product.name}: ${error.message}`
    }
  } else {
    alert("Product is out of stock!")
    lastAction.value = `${product.name} out of stock`
  }
}

// Debug: Watch for changes
watch(() => itemCount.value, (newCount, oldCount) => {
  console.log("🎯 POS PAGE: Item count changed from", oldCount, "to", newCount)
})

watch(() => cart.value, (newCart, oldCart) => {
  console.log("🎯 POS PAGE: Cart changed from", oldCart?.length || 0, "to", newCart?.length || 0)
}, { deep: true })
</script>
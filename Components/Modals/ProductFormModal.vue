<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" v-if="showProductForm">
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <h3 class="text-lg font-medium text-gray-900 mb-4">
        {{ editingProduct ? 'Edit Product' : 'Add New Product' }}
      </h3>
      <form @submit.prevent="saveProduct" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            v-model="productForm.name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">SKU</label>
          <input
            v-model="productForm.sku"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            v-model="productForm.category"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Engine Parts">Engine Parts</option>
            <option value="Body Parts">Body Parts</option>
            <option value="Electrical">Electrical</option>
            <option value="Tires">Tires</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Price (KSh)</label>
            <input
              v-model="productForm.price"
              type="number"
              min="0"
              step="0.01"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
            <input
              v-model="productForm.stock"
              type="number"
              min="0"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Stock Level</label>
          <input
            v-model="productForm.min_stock"
            type="number"
            min="0"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="productForm.description"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="closeProductForm"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {{ editingProduct ? 'Update' : 'Add' }} Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useProducts } from '@/Composables/useProducts'

const { 
  showProductForm, 
  closeProductForm, 
  productForm, 
  editingProduct, 
  saveProduct 
} = useProducts()
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow">
    <div class="flex space-x-4">
      <div class="flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <select
        v-model="selectedCategory"
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { useProducts } from '@/Composables/useProducts';

const { searchQuery, selectedCategory, categories } = useProducts();
</script>


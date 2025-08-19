<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Products</h1>
      <button
        @click="openProductForm()"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
      >
        <Plus class="h-4 w-4 mr-2" />
        Add Product
      </button>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          v-model="selectedCategory"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <select
          v-model="stockFilter"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Stock Levels</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>
    </div>

    <!-- Products Table -->
    <ProductsTable />
  </div>
</template>

<script setup>
import { Plus } from "lucide-vue-next";
import { useProducts } from "@/Composables/useProducts";

definePageMeta({
  title: "Products",
});

const {
  searchQuery,
  selectedCategory,
  stockFilter,
  categories,
  openProductForm,
} = useProducts();
</script>

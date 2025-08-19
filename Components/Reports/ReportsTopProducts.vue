<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
    <div class="space-y-3">
      <div
        v-for="product in topProducts"
        :key="product.id"
        class="flex justify-between items-center"
      >
        <div>
          <span class="text-gray-900 font-medium">{{ product.name }}</span>
          <span class="text-gray-500 text-sm ml-2"
            >{{ product.quantity_sold }} sold</span
          >
        </div>
        <span class="text-green-600 font-medium"
          >KSh {{ product.revenue?.toLocaleString() || 0 }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReports } from "@/Composables/useReports";

const { topProducts } = useReports();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Sales Summary</h3>
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-600">Total Sales:</span>
          <span class="font-medium">KSh {{ reportData.totalSales?.toLocaleString() || 0 }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Cash Sales:</span>
          <span class="font-medium">KSh {{ reportData.cashSales?.toLocaleString() || 0 }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">M-Pesa Sales:</span>
          <span class="font-medium">KSh {{ reportData.mpesaSales?.toLocaleString() || 0 }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Credit Sales:</span>
          <span class="font-medium">KSh {{ reportData.creditSales?.toLocaleString() || 0 }}</span>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Inventory Status</h3>
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-600">Total Products:</span>
          <span class="font-medium">{{ totalProducts }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Low Stock Items:</span>
          <span class="font-medium text-yellow-600">{{ lowStockCount }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Out of Stock:</span>
          <span class="font-medium text-red-600">{{ outOfStockCount }}</span>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Performance</h3>
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-600">Transactions:</span>
          <span class="font-medium">{{ reportData.transactions?.length || 0 }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Avg. Sale:</span>
          <span class="font-medium">KSh {{ avgSaleAmount.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useReports } from '@/Composables/useReports'
import { useProducts } from '@/Composables/useProducts'

const { reportData } = useReports()
const { products } = useProducts()

const totalProducts = computed(() => products.value.length)
const lowStockCount = computed(() => products.value.filter(p => p.stock <= p.min_stock && p.stock > 0).length)
const outOfStockCount = computed(() => products.value.filter(p => p.stock === 0).length)

const avgSaleAmount = computed(() => {
  const transactions = reportData.value.transactions || []
  if (transactions.length === 0) return 0
  const total = transactions.reduce((sum, t) => sum + t.total, 0)
  return Math.round(total / transactions.length)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <div class="text-sm text-gray-500">
        {{ currentDate }}
      </div>
    </div>

    <!-- Dashboard Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <DollarSign class="h-6 w-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Today's Sales</p>
            <p class="text-2xl font-bold text-gray-900">KSh 45,000</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <Package class="h-6 w-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Products</p>
            <p class="text-2xl font-bold text-gray-900">150</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <AlertTriangle class="h-6 w-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Low Stock</p>
            <p class="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <CreditCard class="h-6 w-6 text-red-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Credit Sales</p>
            <p class="text-2xl font-bold text-gray-900">KSh 25,000</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink to="/pos" class="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors">
          <ShoppingCart class="h-8 w-8 mx-auto mb-2" />
          <span class="font-medium">Start New Sale</span>
        </NuxtLink>
        
        <NuxtLink to="/products" class="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors">
          <Package class="h-8 w-8 mx-auto mb-2" />
          <span class="font-medium">Manage Products</span>
        </NuxtLink>
        
        <NuxtLink to="/reports" class="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors">
          <BarChart3 class="h-8 w-8 mx-auto mb-2" />
          <span class="font-medium">View Reports</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { definePageMeta } from '#imports'
import { DollarSign, Package, AlertTriangle, CreditCard, ShoppingCart, BarChart3 } from 'lucide-vue-next'

definePageMeta({
  title: 'Dashboard'
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-KE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

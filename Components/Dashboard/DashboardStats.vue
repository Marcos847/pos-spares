<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div
      v-for="stat in stats"
      :key="stat.title"
      class="bg-white p-6 rounded-lg shadow"
    >
      <div class="flex items-center">
        <div :class="['p-2 rounded-lg', stat.bgColor]">
          <component :is="stat.icon" :class="['h-6 w-6', stat.iconColor]" />
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
          <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  DollarSign,
  Package,
  AlertTriangle,
  CreditCard,
} from "lucide-vue-next";
import { useDashboard } from "@/Composables/useDashboard";
import { computed } from "vue";

const { dashboardStats } = useDashboard();

const stats = computed(() => [
  {
    title: "Today's Sales",
    value: `KSh ${dashboardStats.value.todaysSales?.toLocaleString() || 0}`,
    icon: DollarSign,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Total Products",
    value: dashboardStats.value.totalProducts || 0,
    icon: Package,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Low Stock",
    value: dashboardStats.value.lowStockCount || 0,
    icon: AlertTriangle,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Credit Sales",
    value: `KSh ${
      dashboardStats.value.totalCreditSales?.toLocaleString() || 0
    }`,
    icon: CreditCard,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
]);
</script>

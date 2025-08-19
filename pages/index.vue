<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <div class="text-sm text-gray-500">
        {{ currentDate }}
      </div>
    </div>

    <!-- Dashboard Stats -->
    <DashboardStats />

    <!-- Recent Transactions -->
    <DashboardRecentTransactions />
  </div>
</template>

<script setup>
import { computed } from "vue";

definePageMeta({
  title: "Dashboard",
});

const currentDate = computed(() => {
  return new Date().toLocaleDateString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

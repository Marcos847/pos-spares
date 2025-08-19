<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Sales Reports & Analytics</h2>
    
    <!-- Report Filters -->
    <ReportsFilters />

    <!-- Sales Summary Cards -->
    <ReportsSummary />

    <!-- Top Products -->
    <ReportsTopProducts />

    <!-- Detailed Report Table -->
    <ReportsTable />
  </div>
</template>

<script setup>
import { useReports } from '~/Composables/useReports'
import { definePageMeta, onMounted } from '#imports'

definePageMeta({
  title: 'Reports'
})

onMounted(() => {
  const { initializeDates } = useReports()
  initializeDates()
})
</script>

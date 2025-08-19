<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
        <select
          v-model="reportType"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
        <input
          v-model="reportStartDate"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
        <input
          v-model="reportEndDate"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="flex items-end">
        <button
          @click="generateReport"
          :disabled="isGenerating"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {{ isGenerating ? 'Generating...' : 'Generate Report' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReports } from '@/Composables/useReports'

const { reportType, reportStartDate, reportEndDate, isGenerating, generateReport } = useReports()
</script>
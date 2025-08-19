<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div
      class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
    >
      <h3 class="text-lg font-medium text-gray-900">Detailed Transactions</h3>
      <button
        @click="exportReport"
        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
      >
        <Download class="h-4 w-4 mr-2" />
        Export CSV
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Transaction ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Customer
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Payment Method
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              VAT
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="transaction in reportData.transactions"
            :key="transaction.id"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ transaction.date }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              #{{ transaction.transaction_id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ transaction.customer_name || "Walk-in" }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              KSh {{ transaction.total.toLocaleString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ transaction.payment_method }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              KSh {{ transaction.vat.toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { Download } from "lucide-vue-next";
import { useReports } from "@/Composables/useReports";

const { reportData, exportReport } = useReports();
</script>

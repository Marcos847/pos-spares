<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="credit in creditSales" :key="credit.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ credit.customer_name }}</div>
              <div class="text-sm text-gray-500">{{ credit.customer_phone }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">KSh {{ credit.total_amount.toLocaleString() }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">KSh {{ credit.amount_paid.toLocaleString() }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
              KSh {{ credit.outstanding_amount.toLocaleString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ credit.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="openPaymentModal(credit)"
                class="text-green-600 hover:text-green-900 mr-3"
              >
                Record Payment
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useCredit } from '@/Composables/useCredit'

const { creditSales, openPaymentModal } = useCredit()
</script>

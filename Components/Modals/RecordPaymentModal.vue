<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" v-if="showPaymentModal">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Record Payment</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Amount</label>
            <input
              v-model="paymentAmount"
              type="number"
              min="0"
              placeholder="Enter amount"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select
              v-model="paymentMethod"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Cash">Cash</option>
              <option value="M-Pesa">M-Pesa</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              v-model="paymentNotes"
              rows="3"
              placeholder="Payment notes..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <button
            @click="closePaymentModal"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="recordPayment"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Record Payment
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useModals } from '@/Composables/useModals'
  
  const { 
    showPaymentModal, 
    closePaymentModal, 
    paymentAmount, 
    paymentMethod, 
    paymentNotes,
    recordPayment 
  } = useModals()
  </script>
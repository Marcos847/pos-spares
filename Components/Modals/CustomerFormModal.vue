<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" v-if="showCustomerForm">
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <h3 class="text-lg font-medium text-gray-900 mb-4">
        {{ editingCustomer ? 'Edit Customer' : 'Add New Customer' }}
      </h3>
      <form @submit.prevent="saveCustomer" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            v-model="customerForm.name"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            v-model="customerForm.phone"
            type="tel"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
          <input
            v-model="customerForm.email"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            v-model="customerForm.address"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="closeCustomerForm"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {{ editingCustomer ? 'Update' : 'Add' }} Customer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useCustomers } from '@/Composables/useCustomers'

const { 
  showCustomerForm, 
  closeCustomerForm, 
  customerForm, 
  editingCustomer, 
  saveCustomer 
} = useCustomers()
</script>

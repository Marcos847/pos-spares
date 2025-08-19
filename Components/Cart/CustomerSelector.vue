<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
    <select
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Walk-in Customer</option>
      <option v-for="customer in customers" :key="customer.id" :value="customer.id">
        {{ customer.name }} - {{ customer.phone }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useCustomers } from '@/Composables/useCustomers'

const { customers } = useCustomers()

defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

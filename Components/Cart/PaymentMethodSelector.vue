<template>
  <div class="mb-6">
    <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
    <div class="grid grid-cols-2 gap-2">
      <button
        v-for="method in paymentMethods"
        :key="method"
        @click="$emit('update:modelValue', method)"
        :class="[
          'px-3 py-2 text-sm rounded-md border transition-colors',
          modelValue === method
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        ]"
      >
        {{ method }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])

const paymentMethods = ['Cash', 'M-Pesa', 'Bank Transfer', 'Credit']
</script>

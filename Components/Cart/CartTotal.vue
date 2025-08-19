<template>
  <div class="border-t pt-4 mb-6">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm text-gray-600">Subtotal:</span>
      <span class="text-sm">KSh {{ subtotal.toLocaleString() }}</span>
    </div>
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm text-gray-600">VAT (16%):</span>
      <span class="text-sm">KSh {{ vat.toLocaleString() }}</span>
    </div>
    <div class="flex justify-between items-center text-lg font-bold">
      <span>Total:</span>
      <span>KSh {{ total.toLocaleString() }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  subtotal: {
    type: Number,
    required: true
  },
  vat: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})
</script>

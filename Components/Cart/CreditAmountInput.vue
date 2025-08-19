<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-2"
      >Amount Paid (if any)</label
    >
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', parseFloat($event.target.value) || 0)"
      type="number"
      min="0"
      :max="total"
      placeholder="0"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p class="text-sm text-gray-500 mt-1">
      Remaining: KSh {{ (total - (modelValue || 0)).toLocaleString() }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
});

defineEmits(["update:modelValue"]);
</script>

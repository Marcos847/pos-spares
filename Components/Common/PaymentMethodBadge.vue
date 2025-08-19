<template>
  <span :class="badgeClasses">
    {{ method }}
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  method: {
    type: String,
    required: true,
  },
});

const badgeClasses = computed(() => {
  const baseClasses =
    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";

  switch (props.method) {
    case "Credit":
      return `${baseClasses} bg-red-100 text-red-800`;
    case "M-Pesa":
      return `${baseClasses} bg-green-100 text-green-800`;
    default:
      return `${baseClasses} bg-blue-100 text-blue-800`;
  }
});
</script>

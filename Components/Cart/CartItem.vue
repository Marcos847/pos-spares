<template>
  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div class="flex-1">
      <h4 class="font-medium text-sm">{{ item.name }}</h4>
      <p class="text-xs text-gray-500">
        KSh {{ item.price.toLocaleString() }} each
      </p>
      <p class="text-xs text-gray-600">
        Total: KSh {{ (item.price * item.quantity).toLocaleString() }}
      </p>
    </div>
    <div class="flex items-center space-x-2">
      <button
        @click="handleUpdateQuantity(item.id, item.quantity - 1)"
        class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
        :disabled="item.quantity <= 1"
      >
        <Minus class="h-3 w-3" />
      </button>
      <span class="w-8 text-center text-sm font-medium">{{
        item.quantity
      }}</span>
      <button
        @click="handleUpdateQuantity(item.id, item.quantity + 1)"
        class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
      >
        <Plus class="h-3 w-3" />
      </button>
      <button
        @click="handleRemove(item.id)"
        class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 ml-2 transition-colors"
      >
        <X class="h-3 w-3 text-red-600" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Minus, Plus, X } from "lucide-vue-next";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update-quantity", "remove"]);

const handleUpdateQuantity = (id, newQuantity) => {
  console.log("CartItem: Updating quantity", id, newQuantity); // Debug log
  emit("update-quantity", id, newQuantity);
};

const handleRemove = (id) => {
  console.log("CartItem: Removing item", id); // Debug log
  emit("remove", id);
};
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Point of Sale</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Products Section -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Product Search -->
        <PosProductSearch />

        <!-- Product Grid -->
        <PosProductGrid />
      </div>

      <!-- Cart Section -->
      <div class="bg-white p-6 rounded-lg shadow">
        <PosCart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { definePageMeta } from "#imports";

definePageMeta({
  title: "Point of Sale",
});
</script>

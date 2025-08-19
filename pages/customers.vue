<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Customers</h1>
      <button
        @click="openCustomerForm()"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
      >
        <Plus class="h-4 w-4 mr-2" />
        Add Customer
      </button>
    </div>

    <!-- Search -->
    <div class="bg-white p-4 rounded-lg shadow">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search customers..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Customers Table -->
    <CustomersTable />
  </div>
</template>

<script setup>
import { Plus } from "lucide-vue-next";
import { useCustomers } from "@/Composables/useCustomers";

definePageMeta({
  title: "Customers",
});

const { searchQuery, openCustomerForm } = useCustomers();
</script>

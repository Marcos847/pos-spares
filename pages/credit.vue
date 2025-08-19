<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Credit Sales</h1>
      <div class="text-lg font-medium text-red-600">
        Total Outstanding: KSh {{ totalOutstanding.toLocaleString() }}
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <CreditCard class="h-6 w-6 text-red-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Credit Sales</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ creditSales.length }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <Clock class="h-6 w-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending Payments</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ pendingPayments }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircle class="h-6 w-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Paid This Month</p>
            <p class="text-2xl font-bold text-gray-900">
              KSh {{ paidThisMonth.toLocaleString() }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Credit Sales Table -->
    <CreditSalesTable />
  </div>
</template>

<script setup>
import { CreditCard, Clock, CheckCircle } from "lucide-vue-next";
import { useCredit } from "@/Composables/useCredit";

definePageMeta({
  title: "Credit Sales",
});

const { creditSales, totalOutstanding, pendingPayments, paidThisMonth } =
  useCredit();
</script>

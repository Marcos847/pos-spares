<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    v-if="showReceiptModal"
  >
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <div id="receipt-content" class="space-y-4">
        <div class="text-center border-b pb-4">
          <h2 class="text-xl font-bold">BLESSINGS AUTO SPARE</h2>
          <p class="text-sm text-gray-600">Tuktuk Spare Parts</p>
          <p class="text-sm text-gray-600">Phone: 0720443773</p>
        </div>

        <div class="space-y-2" v-if="currentReceipt">
          <div class="flex justify-between text-sm">
            <span>Receipt #:</span>
            <span>{{ currentReceipt.transaction_id }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Date:</span>
            <span>{{ currentReceipt.date }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Customer:</span>
            <span>{{ currentReceipt.customer_name || "Walk-in" }}</span>
          </div>

          <div class="border-t pt-2">
            <div
              v-for="item in currentReceipt.items"
              :key="item.id"
              class="flex justify-between text-sm"
            >
              <span>{{ item.name }} x{{ item.quantity }}</span>
              <span
                >KSh {{ (item.price * item.quantity).toLocaleString() }}</span
              >
            </div>
          </div>

          <div class="border-t pt-2 space-y-1">
            <div class="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>KSh {{ currentReceipt.subtotal.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>VAT (16%):</span>
              <span>KSh {{ currentReceipt.vat.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-sm font-bold">
              <span>Total:</span>
              <span>KSh {{ currentReceipt.total.toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <div class="text-center text-xs text-gray-500 border-t pt-4">
          <p>Thank you for your business!</p>
          <p>VAT No: A123456789Z</p>
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="closeReceiptModal"
          class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Close
        </button>
        <button
          @click="printReceipt"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Printer class="h-4 w-4 mr-2" />
          Print Receipt
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Printer } from "lucide-vue-next";
import { useModals } from "@/Composables/useModals";

const { showReceiptModal, closeReceiptModal, currentReceipt, printReceipt } =
  useModals();
</script>

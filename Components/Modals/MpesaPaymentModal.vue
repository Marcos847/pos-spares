<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    v-if="showMpesaModal"
  >
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <h3 class="text-lg font-medium text-gray-900 mb-4">M-Pesa Payment</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Customer Phone Number</label
          >
          <input
            v-model="mpesaPhoneNumber"
            type="tel"
            placeholder="254XXXXXXXXX"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-2">Payment Options:</h4>
          <div class="space-y-2 text-sm text-gray-600">
            <p><strong>Paybill:</strong> 247247 (Equity Bank)</p>
            <p><strong>Account:</strong> 0720443773</p>
            <p><strong>Till Number:</strong> 979999</p>
            <p><strong>Send Money:</strong> 0720443773</p>
          </div>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg">
          <p class="text-sm text-blue-800">
            <strong>Amount to Pay:</strong> KSh {{ total.toLocaleString() }}
          </p>
        </div>
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <button
          @click="closeMpesaModal"
          class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="sendMpesaPrompt"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Send Payment Prompt
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModals } from "@/Composables/useModals";
import { useCart } from "@/Composables/useCart";

const { showMpesaModal, closeMpesaModal, mpesaPhoneNumber } = useModals();
const { total } = useCart();

const sendMpesaPrompt = async () => {
  if (!mpesaPhoneNumber.value) {
    alert("Please enter customer phone number");
    return;
  }

  try {
    // API call to initiate M-Pesa STK push would go here
    alert(`M-Pesa payment prompt sent to ${mpesaPhoneNumber.value}`);
    closeMpesaModal();
    mpesaPhoneNumber.value = "";
  } catch (error) {
    alert("Error sending M-Pesa prompt. Please try again.");
  }
};
</script>

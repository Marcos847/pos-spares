<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Credit Sales Management</h1>
      <div class="text-lg font-medium text-red-600">
        Total Outstanding: KSh {{ totalOutstanding.toLocaleString() }}
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <CreditCard class="h-6 w-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Credit Sales</p>
            <p class="text-2xl font-bold text-gray-900">KSh {{ totalCreditSales.toLocaleString() }}</p>
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
            <p class="text-2xl font-bold text-gray-900">{{ pendingPayments }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <DollarSign class="h-6 w-6 text-red-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Outstanding Amount</p>
            <p class="text-2xl font-bold text-gray-900">KSh {{ totalOutstanding.toLocaleString() }}</p>
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
            <p class="text-2xl font-bold text-gray-900">KSh {{ paidThisMonth.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Overdue Credits Alert -->
    <div v-if="overdueCredits.length > 0" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="flex items-center">
        <AlertTriangle class="h-5 w-5 text-red-600 mr-2" />
        <h3 class="text-lg font-medium text-red-800">Overdue Credits ({{ overdueCredits.length }})</h3>
      </div>
      <p class="text-sm text-red-700 mt-1">Some credit sales are past their due date. Please follow up with customers.</p>
    </div>

    <!-- Credit Sales Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Credit Sales</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="credit in creditSales" :key="credit.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ credit.customer_name }}</div>
                  <div class="text-sm text-gray-500">{{ credit.customer_phone }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">#{{ credit.transaction_id }}</div>
                  <div class="text-sm text-gray-500">{{ credit.date }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                KSh {{ credit.total_amount.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                KSh {{ credit.amount_paid.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                KSh {{ credit.outstanding_amount.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ credit.due_date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="credit.outstanding_amount === 0" 
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Paid
                </span>
                <span v-else-if="getDaysOverdue(credit.due_date) > 0" 
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  {{ getDaysOverdue(credit.due_date) }} days overdue
                </span>
                <span v-else 
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    v-if="credit.outstanding_amount > 0"
                    @click="openPaymentModal(credit)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Record Payment
                  </button>
                  <button
                    @click="viewCreditDetails(credit)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payment Modal -->
    <div v-if="showPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Record Payment</h3>
        
        <div v-if="selectedCredit" class="space-y-4">
          <!-- Credit Info -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900">{{ selectedCredit.customer_name }}</h4>
            <p class="text-sm text-gray-600">Transaction: #{{ selectedCredit.transaction_id }}</p>
            <p class="text-sm text-gray-600">Outstanding: KSh {{ selectedCredit.outstanding_amount.toLocaleString() }}</p>
          </div>

          <!-- Payment Form -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Amount</label>
            <input
              v-model.number="paymentForm.amount"
              type="number"
              :max="selectedCredit.outstanding_amount"
              min="1"
              placeholder="Enter amount"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select
              v-model="paymentForm.method"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Cash">Cash</option>
              <option value="M-Pesa">M-Pesa</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              v-model="paymentForm.notes"
              rows="3"
              placeholder="Payment notes..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3">
            <button
              @click="closePaymentModal"
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              @click="recordPayment"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Record Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CreditCard, Clock, DollarSign, CheckCircle, AlertTriangle } from 'lucide-vue-next'
import { useCredit } from '@/Composables/useCredit'

const {
  creditSales,
  totalOutstanding,
  pendingPayments,
  totalCreditSales,
  paidThisMonth,
  overdueCredits,
  showPaymentModal,
  selectedCredit,
  paymentForm,
  openPaymentModal,
  closePaymentModal,
  recordPayment,
  getDaysOverdue
} = useCredit()

const viewCreditDetails = (credit) => {
  const itemsList = credit.items?.map(item => 
    `${item.name} x${item.quantity} = KSh ${(item.price * item.quantity).toLocaleString()}`
  ).join('\n') || 'No items details available'

  let paymentHistory = ''
  if (credit.payments && credit.payments.length > 0) {
    paymentHistory = '\n\nPayment History:\n' + credit.payments.map(payment => 
      `${payment.date} ${payment.time} - KSh ${payment.amount.toLocaleString()} (${payment.method})${payment.notes ? ' - ' + payment.notes : ''}`
    ).join('\n')
  }

  alert(`Credit Sale Details:
Customer: ${credit.customer_name}
Transaction: #${credit.transaction_id}
Date: ${credit.date}
Due Date: ${credit.due_date}

Items:
${itemsList}

Total: KSh ${credit.total_amount.toLocaleString()}
Paid: KSh ${credit.amount_paid.toLocaleString()}
Outstanding: KSh ${credit.outstanding_amount.toLocaleString()}${paymentHistory}`)
}
</script>
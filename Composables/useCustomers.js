import { computed } from "vue"
import { useCustomersStore } from "~/stores/customers"

export const useCustomers = () => {
  const customersStore = useCustomersStore()

  return {
    // State
    customers: computed(() => customersStore.filteredCustomers),
    allCustomers: computed(() => customersStore.customers),
    searchQuery: computed({
      get: () => customersStore.searchQuery,
      set: (value) => customersStore.setSearchQuery(value),
    }),
    showCustomerForm: computed(() => customersStore.showCustomerForm),
    editingCustomer: computed(() => customersStore.editingCustomer),
    customerForm: computed(() => customersStore.customerForm),

    // Getters
    totalOutstandingCredit: computed(() => customersStore.totalOutstandingCredit),

    // Actions
    openCustomerForm: customersStore.openCustomerForm,
    closeCustomerForm: customersStore.closeCustomerForm,
    saveCustomer: customersStore.saveCustomer,
    deleteCustomer: customersStore.deleteCustomer,
  }
}

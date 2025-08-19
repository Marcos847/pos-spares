import { defineStore } from "pinia"

export const useCustomersStore = defineStore("customers", {
  state: () => ({
    customers: [
      {
        id: 1,
        name: "John Doe",
        phone: "0712345678",
        email: "john@example.com",
        address: "Nairobi, Kenya",
        totalPurchases: 15000,
        outstandingCredit: 2500,
      },
      {
        id: 2,
        name: "Jane Smith",
        phone: "0723456789",
        email: "jane@example.com",
        address: "Mombasa, Kenya",
        totalPurchases: 8500,
        outstandingCredit: 0,
      },
      {
        id: 3,
        name: "Peter Kamau",
        phone: "0734567890",
        email: "peter@example.com",
        address: "Kisumu, Kenya",
        totalPurchases: 12000,
        outstandingCredit: 1500,
      },
    ],
    searchQuery: "",
    showCustomerForm: false,
    editingCustomer: null,
    customerForm: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  }),

  getters: {
    filteredCustomers: (state) => {
      if (!state.searchQuery) return state.customers

      return state.customers.filter(
        (c) =>
          c.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          c.phone.includes(state.searchQuery) ||
          c.email.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )
    },

    totalOutstandingCredit: (state) => {
      return state.customers.reduce((sum, c) => sum + (c.outstandingCredit || 0), 0)
    },
  },

  actions: {
    setSearchQuery(query) {
      this.searchQuery = query
    },

    openCustomerForm(customer = null) {
      if (customer) {
        this.editingCustomer = customer
        this.customerForm = { ...customer }
      } else {
        this.editingCustomer = null
        this.customerForm = {
          name: "",
          phone: "",
          email: "",
          address: "",
        }
      }
      this.showCustomerForm = true
    },

    closeCustomerForm() {
      this.showCustomerForm = false
      this.editingCustomer = null
    },

    saveCustomer() {
      if (this.editingCustomer) {
        // Update existing customer
        const index = this.customers.findIndex((c) => c.id === this.editingCustomer.id)
        if (index !== -1) {
          this.customers[index] = { ...this.customerForm }
        }
      } else {
        // Add new customer
        const newCustomer = {
          ...this.customerForm,
          id: Date.now(),
          totalPurchases: 0,
          outstandingCredit: 0,
        }
        this.customers.push(newCustomer)
      }
      this.closeCustomerForm()
    },

    deleteCustomer(id) {
      if (confirm("Are you sure you want to delete this customer?")) {
        this.customers = this.customers.filter((c) => c.id !== id)
      }
    },
  },
})

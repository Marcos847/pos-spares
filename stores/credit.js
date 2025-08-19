import { defineStore } from "pinia"

export const useCreditStore = defineStore("credit", {
  state: () => ({
    creditSales: [
      {
        id: 1,
        customer_name: "John Doe",
        customer_phone: "0712345678",
        total_amount: 5000,
        amount_paid: 2500,
        outstanding_amount: 2500,
        date: "2024-01-10",
        transaction_id: "TXN001",
        due_date: "2024-02-10",
        items: [
          { name: "Brake Pads", quantity: 2, price: 1500 },
          { name: "Oil Filter", quantity: 1, price: 600 },
        ],
      },
      {
        id: 2,
        customer_name: "Jane Smith",
        customer_phone: "0723456789",
        total_amount: 3000,
        amount_paid: 1000,
        outstanding_amount: 2000,
        date: "2024-01-12",
        transaction_id: "TXN002",
        due_date: "2024-02-12",
        items: [
          { name: "Air Filter", quantity: 3, price: 800 },
          { name: "Spark Plug", quantity: 1, price: 450 },
        ],
      },
    ],
    showPaymentModal: false,
    selectedCredit: null,
    paymentForm: {
      amount: 0,
      method: "Cash",
      notes: "",
    },
  }),

  getters: {
    totalOutstanding: (state) => {
      return state.creditSales.reduce((sum, credit) => sum + credit.outstanding_amount, 0)
    },

    pendingPayments: (state) => {
      return state.creditSales.filter((credit) => credit.outstanding_amount > 0).length
    },

    totalCreditSales: (state) => {
      return state.creditSales.reduce((sum, credit) => sum + credit.total_amount, 0)
    },

    paidThisMonth: (state) => {
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()

      return state.creditSales
        .filter((credit) => {
          const creditDate = new Date(credit.date)
          return creditDate.getMonth() === currentMonth && creditDate.getFullYear() === currentYear
        })
        .reduce((sum, credit) => sum + credit.amount_paid, 0)
    },

    overdueCredits: (state) => {
      const today = new Date()
      return state.creditSales.filter((credit) => {
        const dueDate = new Date(credit.due_date)
        return credit.outstanding_amount > 0 && dueDate < today
      })
    },
  },

  actions: {
    addCreditSale(creditSale) {
      console.log("💳 CREDIT STORE: Adding credit sale:", creditSale)

      const newCreditSale = {
        ...creditSale,
        id: Date.now(),
      }

      // If there was an initial payment, add it to the payments array
      if (creditSale.initial_payment) {
        newCreditSale.payments = [creditSale.initial_payment]
      }

      this.creditSales.unshift(newCreditSale)
      console.log("💳 CREDIT STORE: Credit sale added, total:", this.creditSales.length)
    },

    openPaymentModal(credit) {
      console.log("💳 CREDIT STORE: Opening payment modal for:", credit.customer_name)
      this.selectedCredit = credit
      this.paymentForm = {
        amount: 0,
        method: "Cash",
        notes: "",
      }
      this.showPaymentModal = true
    },

    closePaymentModal() {
      this.showPaymentModal = false
      this.selectedCredit = null
      this.paymentForm = {
        amount: 0,
        method: "Cash",
        notes: "",
      }
    },

    recordPayment() {
      if (!this.selectedCredit || !this.paymentForm.amount || this.paymentForm.amount <= 0) {
        alert("Please enter a valid payment amount")
        return false
      }

      if (this.paymentForm.amount > this.selectedCredit.outstanding_amount) {
        alert("Payment amount cannot exceed outstanding amount")
        return false
      }

      console.log("💳 CREDIT STORE: Recording payment:", this.paymentForm)

      // Find and update the credit sale
      const creditIndex = this.creditSales.findIndex((c) => c.id === this.selectedCredit.id)
      if (creditIndex !== -1) {
        const credit = this.creditSales[creditIndex]
        credit.amount_paid += this.paymentForm.amount
        credit.outstanding_amount -= this.paymentForm.amount

        // Add payment record (you could expand this to track payment history)
        if (!credit.payments) {
          credit.payments = []
        }

        credit.payments.push({
          amount: this.paymentForm.amount,
          method: this.paymentForm.method,
          notes: this.paymentForm.notes,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString(),
        })

        console.log("💳 CREDIT STORE: Payment recorded for:", credit.customer_name)

        // Show success message
        const remainingAmount = credit.outstanding_amount
        if (remainingAmount === 0) {
          alert(`Payment recorded successfully!\nCredit fully paid for ${credit.customer_name}`)
        } else {
          alert(`Payment recorded successfully!\nRemaining balance: KSh ${remainingAmount.toLocaleString()}`)
        }

        this.closePaymentModal()
        return true
      }

      return false
    },

    getDaysOverdue(dueDate) {
      const today = new Date()
      const due = new Date(dueDate)
      const diffTime = today - due
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    },

    deleteCreditSale(id) {
      if (confirm("Are you sure you want to delete this credit sale?")) {
        this.creditSales = this.creditSales.filter((c) => c.id !== id)
        console.log("💳 CREDIT STORE: Credit sale deleted")
      }
    },
  },
})

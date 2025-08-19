import { computed } from "vue"
import { useState } from "#app"

export const useCredit = () => {
  const creditSales = useState("creditSales", () => [
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
    },
    {
      id: 3,
      customer_name: "Peter Kamau",
      customer_phone: "0734567890",
      total_amount: 4500,
      amount_paid: 3000,
      outstanding_amount: 1500,
      date: "2024-01-08",
      transaction_id: "TXN003",
      due_date: "2024-02-08",
    },
  ])

  const totalOutstanding = computed(() => {
    return creditSales.value.reduce((sum, credit) => sum + credit.outstanding_amount, 0)
  })

  const pendingPayments = computed(() => {
    return creditSales.value.filter((credit) => credit.outstanding_amount > 0).length
  })

  const paidThisMonth = computed(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    return creditSales.value
      .filter((credit) => {
        const creditDate = new Date(credit.date)
        return creditDate.getMonth() === currentMonth && creditDate.getFullYear() === currentYear
      })
      .reduce((sum, credit) => sum + credit.amount_paid, 0)
  })

  const openPaymentModal = (credit) => {
    console.log("Opening payment modal for:", credit)
    // This will be handled by useModals when implemented
  }

  const recordPayment = (creditId, amount, method) => {
    const creditIndex = creditSales.value.findIndex((c) => c.id === creditId)
    if (creditIndex !== -1) {
      const credit = creditSales.value[creditIndex]
      credit.amount_paid += amount
      credit.outstanding_amount -= amount

      console.log(`Payment of KSh ${amount} recorded for ${credit.customer_name}`)
    }
  }

  return {
    creditSales,
    totalOutstanding,
    pendingPayments,
    paidThisMonth,
    openPaymentModal,
    recordPayment,
  }
}

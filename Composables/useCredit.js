import { ref, computed } from "vue";

export function useCredit() {
  const creditSales = ref([
    {
      id: 1,
      customer_name: "John Doe",
      customer_phone: "0712345678",
      total_amount: 5000,
      amount_paid: 2500,
      outstanding_amount: 2500,
      date: "2024-01-10",
      transaction_id: "TXN001",
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
    },
  ]);

  const totalOutstanding = computed(() => {
    return creditSales.value.reduce(
      (sum, credit) => sum + credit.outstanding_amount,
      0
    );
  });

  const pendingPayments = computed(() => {
    return creditSales.value.filter((credit) => credit.outstanding_amount > 0)
      .length;
  });

  const paidThisMonth = computed(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return creditSales.value
      .filter((credit) => {
        const creditDate = new Date(credit.date);
        return (
          creditDate.getMonth() === currentMonth &&
          creditDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, credit) => sum + credit.amount_paid, 0);
  });

  const openPaymentModal = (credit) => {
    // This will be handled by useModals
    console.log("Opening payment modal for:", credit);
  };

  return {
    creditSales,
    totalOutstanding,
    pendingPayments,
    paidThisMonth,
    openPaymentModal,
  };
};

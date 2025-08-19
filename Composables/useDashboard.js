import { ref } from "vue";

export function useDashboard() {
  const dashboardStats = ref({
    todaysSales: 45000,
    totalProducts: 150,
    lowStockCount: 12,
    totalCreditSales: 25000,
  });

  const recentTransactions = ref([
    {
      id: "TXN001",
      customer: "John Doe",
      amount: 2500,
      payment_type: "M-Pesa",
      date: "2024-01-15 10:30",
    },
    {
      id: "TXN002",
      customer: "Jane Smith",
      amount: 1800,
      payment_type: "Cash",
      date: "2024-01-15 11:15",
    },
    {
      id: "TXN003",
      customer: "Walk-in Customer",
      amount: 3200,
      payment_type: "Credit",
      date: "2024-01-15 12:00",
    },
  ]);

  return {
    dashboardStats,
    recentTransactions,
  };
}

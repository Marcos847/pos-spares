import { ref } from "vue";

export function useReports() {
  const reportType = ref("daily");
  const reportStartDate = ref("");
  const reportEndDate = ref("");
  const isGenerating = ref(false);

  const reportData = ref({
    totalSales: 45000,
    cashSales: 25000,
    mpesaSales: 15000,
    creditSales: 5000,
    transactions: [
      {
        id: 1,
        transaction_id: "TXN001",
        customer_name: "John Doe",
        total: 2500,
        payment_method: "M-Pesa",
        vat: 400,
        date: "2024-01-15",
      },
      {
        id: 2,
        transaction_id: "TXN002",
        customer_name: null,
        total: 1800,
        payment_method: "Cash",
        vat: 288,
        date: "2024-01-15",
      },
    ],
  });

  const topProducts = ref([
    {
      id: 1,
      name: "Brake Pads",
      quantity_sold: 15,
      revenue: 22500,
    },
    {
      id: 2,
      name: "Air Filter",
      quantity_sold: 12,
      revenue: 9600,
    },
    {
      id: 3,
      name: "Headlight Bulb",
      quantity_sold: 25,
      revenue: 7500,
    },
  ]);

  const initializeDates = () => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    reportStartDate.value = lastWeek.toISOString().split("T")[0];
    reportEndDate.value = today.toISOString().split("T")[0];
  };

  const generateReport = async () => {
    isGenerating.value = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update report data based on filters
    console.log("Generating report:", {
      type: reportType.value,
      startDate: reportStartDate.value,
      endDate: reportEndDate.value,
    });

    isGenerating.value = false;
  };

  const exportReport = () => {
    // Create CSV content
    const csvContent = [
      ["Date", "Transaction ID", "Customer", "Amount", "Payment Method", "VAT"],
      ...reportData.value.transactions.map((t) => [
        t.date,
        t.transaction_id,
        t.customer_name || "Walk-in",
        t.total,
        t.payment_method,
        t.vat,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sales-report-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    reportType,
    reportStartDate,
    reportEndDate,
    isGenerating,
    reportData,
    topProducts,
    initializeDates,
    generateReport,
    exportReport,
  };
};

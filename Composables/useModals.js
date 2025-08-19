import { ref } from "vue";

export function useModals() {
  const showMpesaModal = ref(false);
  const showPaymentModal = ref(false);
  const showReceiptModal = ref(false);
  const currentReceipt = ref(null);
  const mpesaPhoneNumber = ref("");
  const paymentAmount = ref(0);
  const paymentMethod = ref("Cash");
  const paymentNotes = ref("");

  const openMpesaModal = () => {
    showMpesaModal.value = true;
  };

  const closeMpesaModal = () => {
    showMpesaModal.value = false;
    mpesaPhoneNumber.value = "";
  };

  const openPaymentModal = () => {
    showPaymentModal.value = true;
  };

  const closePaymentModal = () => {
    showPaymentModal.value = false;
    paymentAmount.value = 0;
    paymentMethod.value = "Cash";
    paymentNotes.value = "";
  };

  const openReceiptModal = (receipt) => {
    currentReceipt.value = receipt;
    showReceiptModal.value = true;
  };

  const closeReceiptModal = () => {
    showReceiptModal.value = false;
    currentReceipt.value = null;
  };

  const printReceipt = () => {
    window.print();
  };

  const recordPayment = () => {
    if (!paymentAmount.value || paymentAmount.value <= 0) {
      alert("Please enter a valid payment amount");
      return;
    }

    // Process payment recording
    console.log("Recording payment:", {
      amount: paymentAmount.value,
      method: paymentMethod.value,
      notes: paymentNotes.value,
    });

    alert("Payment recorded successfully!");
    closePaymentModal();
  };

  return {
    showMpesaModal,
    showPaymentModal,
    showReceiptModal,
    currentReceipt,
    mpesaPhoneNumber,
    paymentAmount,
    paymentMethod,
    paymentNotes,
    openMpesaModal,
    closeMpesaModal,
    openPaymentModal,
    closePaymentModal,
    openReceiptModal,
    closeReceiptModal,
    printReceipt,
    recordPayment,
  };
}

import { ref } from "vue"

export const useModals = () => {
  const showMpesaModal = ref(false)
  const showPaymentModal = ref(false)
  const showReceiptModal = ref(false)
  const currentReceipt = ref(null)
  const mpesaPhoneNumber = ref("")
  const paymentAmount = ref(0)
  const paymentMethod = ref("Cash")
  const paymentNotes = ref("")
  const selectedCredit = ref(null)

  const openMpesaModal = () => {
    showMpesaModal.value = true
  }

  const closeMpesaModal = () => {
    showMpesaModal.value = false
    mpesaPhoneNumber.value = ""
  }

  const openPaymentModal = (credit = null) => {
    selectedCredit.value = credit
    showPaymentModal.value = true
  }

  const closePaymentModal = () => {
    showPaymentModal.value = false
    selectedCredit.value = null
    paymentAmount.value = 0
    paymentMethod.value = "Cash"
    paymentNotes.value = ""
  }

  const openReceiptModal = (receipt) => {
    currentReceipt.value = receipt
    showReceiptModal.value = true
  }

  const closeReceiptModal = () => {
    showReceiptModal.value = false
    currentReceipt.value = null
  }

  const printReceipt = () => {
    if (process.client) {
      window.print()
    }
  }

  const sendMpesaPrompt = async () => {
    if (!mpesaPhoneNumber.value) {
      alert("Please enter customer phone number")
      return
    }

    try {
      // In a real app, you would call M-Pesa API here
      // await $fetch('/api/mpesa/stk-push', { ... })

      console.log(`M-Pesa payment prompt sent to ${mpesaPhoneNumber.value}`)
      alert(`M-Pesa payment prompt sent to ${mpesaPhoneNumber.value}`)
      closeMpesaModal()
    } catch (error) {
      console.error("M-Pesa error:", error)
      alert("Error sending M-Pesa prompt. Please try again.")
    }
  }

  const recordPayment = () => {
    if (!paymentAmount.value || paymentAmount.value <= 0) {
      alert("Please enter a valid payment amount")
      return
    }

    if (selectedCredit.value && paymentAmount.value > selectedCredit.value.outstanding_amount) {
      alert("Payment amount cannot exceed outstanding amount")
      return
    }

    console.log("Recording payment:", {
      amount: paymentAmount.value,
      method: paymentMethod.value,
      notes: paymentNotes.value,
      credit: selectedCredit.value,
    })

    // In a real app, you would save to database here
    // await $fetch('/api/payments', { ... })

    alert("Payment recorded successfully!")
    closePaymentModal()
  }

  return {
    // State
    showMpesaModal,
    showPaymentModal,
    showReceiptModal,
    currentReceipt,
    mpesaPhoneNumber,
    paymentAmount,
    paymentMethod,
    paymentNotes,
    selectedCredit,

    // Actions
    openMpesaModal,
    closeMpesaModal,
    openPaymentModal,
    closePaymentModal,
    openReceiptModal,
    closeReceiptModal,
    printReceipt,
    sendMpesaPrompt,
    recordPayment,
  }
}
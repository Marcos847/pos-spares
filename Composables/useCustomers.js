import { ref, computed } from "vue";

export function useCustomers() {
  const customers = ref([
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
  ]);

  const searchQuery = ref("");
  const showCustomerForm = ref(false);
  const editingCustomer = ref(null);

  const customerForm = ref({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const filteredCustomers = computed(() => {
    if (!searchQuery.value) return customers.value;

    return customers.value.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.phone.includes(searchQuery.value) ||
        c.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const openCustomerForm = (customer = null) => {
    if (customer) {
      editingCustomer.value = customer;
      customerForm.value = { ...customer };
    } else {
      editingCustomer.value = null;
      customerForm.value = {
        name: "",
        phone: "",
        email: "",
        address: "",
      };
    }
    showCustomerForm.value = true;
  };

  const closeCustomerForm = () => {
    showCustomerForm.value = false;
    editingCustomer.value = null;
  };

  const saveCustomer = () => {
    if (editingCustomer.value) {
      // Update existing customer
      const index = customers.value.findIndex(
        (c) => c.id === editingCustomer.value.id
      );
      if (index !== -1) {
        customers.value[index] = { ...customerForm.value };
      }
    } else {
      // Add new customer
      const newCustomer = {
        ...customerForm.value,
        id: Date.now(),
        totalPurchases: 0,
        outstandingCredit: 0,
      };
      customers.value.push(newCustomer);
    }
    closeCustomerForm();
  };

  const deleteCustomer = (id) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      customers.value = customers.value.filter((c) => c.id !== id);
    }
  };

  return {
    customers: filteredCustomers,
    searchQuery,
    showCustomerForm,
    editingCustomer,
    customerForm,
    openCustomerForm,
    closeCustomerForm,
    saveCustomer,
    deleteCustomer,
  };
};

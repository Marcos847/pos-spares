<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <div class="bg-blue-600 p-2 rounded-lg mr-3">
                <Store class="h-6 w-6 text-white" />
              </div>
              <span class="text-xl font-bold text-gray-900"
                >Blessings Auto Spare</span
              >
            </NuxtLink>
          </div>

          <div class="flex items-center space-x-4">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                $route.path === item.href
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              ]"
            >
              <component :is="item.icon" class="h-4 w-4 mr-2 inline" />
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <slot />
    </main>

    <!-- Modals -->
    <MpesaPaymentModal />
    <RecordPaymentModal />
    <ReceiptModal />
    <ProductFormModal />
    <CustomerFormModal />
  </div>
</template>

<script setup>
import {
  Store,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  CreditCard,
  BarChart3,
} from "lucide-vue-next";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "POS", href: "/pos", icon: ShoppingCart },
  { name: "Products", href: "/products", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Credit Sales", href: "/credit", icon: CreditCard },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];
</script>

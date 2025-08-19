export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "Blessings Auto Spare POS",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Point of Sale System for Blessings Auto Spare Parts" },
      ],
    },
  },

  // Ensure Pinia is properly configured
  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },

  // Auto-import composables
  imports: {
    dirs: ["composables/**", "stores/**"],
  },

  // Page transitions (optional)
  pageTransition: {
    name: "page",
    mode: "out-in",
  },

  // Add SSR configuration
  ssr: false, // Disable SSR for now to avoid hydration issues
})

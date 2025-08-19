// nuxt.config.ts

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  components: [
    {
      path: '~/Components', // <== Tell Nuxt to scan the custom folder
      pathPrefix: false
    }
  ],
  app: {
    head: {
      title: "Blessings Auto Spare POS",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Point of Sale System for Blessings Auto Spare Parts",
        },
      ],
    },
  },
});

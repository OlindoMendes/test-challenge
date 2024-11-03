// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules:['@nuxtjs/tailwindcss', 'nuxt-headlessui'
],
  css: ['./assets/css/tailwind.css'],
  build: {
    postcss: {
      plugins: [{
        tailwindcss: {},
        autoprefixer: {},
        
      },
        './plugins/iconify.js',
      './plugins/supabase.js'],
      runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    }
  }
    },
  },
})
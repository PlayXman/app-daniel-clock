// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vite-pwa/nuxt',
  ],
  app: {
    head: {
      title: 'Danův časovač',
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Danův časovač',
      short_name: 'Danův časovač',
      theme_color: '#35aaea',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    }
  }
})

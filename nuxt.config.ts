// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // Nuxt.js moduly přidávající další funkčnost. Dají se najít na https://nuxt.com/modules.
  modules: [
    '@vite-pwa/nuxt',
  ],
  // Základní nastavení webu. Například titulek stránky.
  app: {
    head: {
      title: 'Danův časovač',
    }
  },
  // Nastavení pro generování a "cachování" statických stránek. Obsahuje název aplikace a její ikony, které jsou viditelné například na ploše mobilního telefonu, když si ji uživatel uloží.
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

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools' A GARDER POUR PLUS TARD optionnel

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(), interface Vue DevTools, un outil de débogage natif pour Vue.js. Il est utilisé pour inspecter les composants Vue, gérer les états avec Vuex ou Pinia, analyser le routeur, et plus encore.
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

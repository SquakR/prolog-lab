import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildDir: 'nuxt-build',
  css: [
    'vuetify/lib/styles/main.sass',
    'highlight.js/styles/stackoverflow-light.css'
  ],
  build: {
    transpile: ['vuetify', '@highlightjs/vue-plugin']
  },
  vite: {
    define: {
      'process.env.DEBUG': 'false'
    }
  },
  publicRuntimeConfig: {
    SERVER_API_URL: process.env.SERVER_API_URL,
    CLIENT_API_URL: process.env.CLIENT_API_URL
  }
})

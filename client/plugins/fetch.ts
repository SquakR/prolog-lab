import { $fetch } from 'ohmyfetch'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  return {
    provide: {
      fetch: $fetch.create({
        baseURL: process.server ? config.SERVER_API_URL : config.CLIENT_API_URL
      })
    }
  }
})

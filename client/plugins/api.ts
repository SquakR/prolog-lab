import { ApiClient } from '~/api'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  return {
    provide: {
      api: new ApiClient({
        BASE: process.server ? config.SERVER_API_URL : config.CLIENT_API_URL
      })
    }
  }
})

import { ApiClient } from '~/api'

declare module 'nuxt3/dist/app/nuxt' {
  interface NuxtApp {
    $api: ApiClient
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: ApiClient
  }
}

export {}

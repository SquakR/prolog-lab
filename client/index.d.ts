import { $Fetch } from 'ohmyfetch'

declare module 'nuxt3/dist/app/nuxt' {
  interface NuxtApp {
    $fetch: $Fetch
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $fetch: $Fetch
  }
}

export {}

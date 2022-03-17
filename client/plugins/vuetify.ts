import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import colors from 'vuetify/lib/util/colors.mjs'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            primary: colors.blue.darken2,
            secondary: colors.teal.darken2
          }
        }
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})

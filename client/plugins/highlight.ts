import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core'
import prolog from 'highlight.js/lib/languages/prolog'
import hljsVuePlugin from '@highlightjs/vue-plugin'

export default defineNuxtPlugin((nuxtApp) => {
  hljs.registerLanguage('prolog', prolog)
  nuxtApp.vueApp.use(hljsVuePlugin)
})

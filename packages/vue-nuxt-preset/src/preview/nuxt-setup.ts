/**
 * Setup para injetar os mocks do Nuxt no contexto global do Storybook
 */

import { app } from '@storybook/vue3'
import { 
  useNuxtApp,
  useState,
  useRouter,
  useRoute,
  useCookie,
  useRuntimeConfig,
  navigateTo,
  refresh,
} from '../mocks/nuxt-app'

// Injetar os composables do Nuxt no contexto global
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.useNuxtApp = useNuxtApp
  // @ts-ignore  
  window.useState = useState
  // @ts-ignore
  window.useRouter = useRouter
  // @ts-ignore
  window.useRoute = useRoute
  // @ts-ignore
  window.useCookie = useCookie
  // @ts-ignore
  window.useRuntimeConfig = useRuntimeConfig
  // @ts-ignore
  window.navigateTo = navigateTo
  // @ts-ignore
  window.refresh = refresh
}

// Também injetar no globalThis para contextos não-browser
// @ts-ignore
globalThis.useNuxtApp = useNuxtApp
// @ts-ignore
globalThis.useState = useState
// @ts-ignore
globalThis.useRouter = useRouter
// @ts-ignore
globalThis.useRoute = useRoute
// @ts-ignore
globalThis.useCookie = useCookie
// @ts-ignore
globalThis.useRuntimeConfig = useRuntimeConfig
// @ts-ignore
globalThis.navigateTo = navigateTo
// @ts-ignore
globalThis.refresh = refresh

// Log para confirmar que os mocks foram injetados
console.log('🎭 XStoryBook: Nuxt composables mocks injetados no contexto global')
console.log('✅ useNuxtApp disponível:', typeof useNuxtApp === 'function')
console.log('✅ useState disponível:', typeof useState === 'function')
console.log('✅ useRouter disponível:', typeof useRouter === 'function')

// Configurar o app Vue3 do Storybook se necessário
app.config.globalProperties.$nuxt = {
  isStorybook: true,
  context: 'storybook',
}

export {};

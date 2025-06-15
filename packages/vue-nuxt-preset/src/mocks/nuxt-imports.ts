/**
 * Auto-imports mock para o contexto Storybook
 * Este arquivo simula os auto-imports do Nuxt
 */

// Re-export dos composables mockados
export {
  useNuxtApp,
  useState,
  useRouter,
  useRoute,
  useCookie,
  useRuntimeConfig,
  navigateTo,
  refresh,
} from './nuxt-app'

// Mocks para composables do Vue Router
export { useRouter as useVueRouter } from 'vue-router'

// Mocks para Pinia (se necessário)
export function usePinia() {
  console.log('Mock usePinia called')
  return null
}

// Mocks para outros composables comuns do Nuxt
export function useHead(head?: any) {
  console.log('Mock useHead called:', head)
  return {}
}

export function useSeoMeta(meta?: any) {
  console.log('Mock useSeoMeta called:', meta)
  return {}
}

export function useAsyncData<T>(
  key: string,
  handler: () => Promise<T> | T,
  options?: any
) {
  console.log(`Mock useAsyncData called with key: ${key}`)
  const data = ref<T | null>(null)
  const pending = ref(false)
  const error = ref<Error | null>(null)
  
  return {
    data,
    pending,
    error,
    refresh: () => Promise.resolve(),
  }
}

export function useFetch<T>(
  url: string,
  options?: any
) {
  console.log(`Mock useFetch called with url: ${url}`)
  return useAsyncData('fetch', () => Promise.resolve({} as T), options)
}

export function useLazyAsyncData<T>(
  key: string,
  handler: () => Promise<T> | T,
  options?: any
) {
  console.log(`Mock useLazyAsyncData called with key: ${key}`)
  return useAsyncData(key, handler, { ...options, lazy: true })
}

export function useLazyFetch<T>(
  url: string,
  options?: any
) {
  console.log(`Mock useLazyFetch called with url: ${url}`)
  return useFetch(url, { ...options, lazy: true })
}

// Re-exports do Vue para compatibilidade
export {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  onMounted,
  onUnmounted,
  onBeforeMount,
  onBeforeUnmount,
  onUpdated,
  onBeforeUpdate,
  nextTick,
} from 'vue'

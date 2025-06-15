import { ref, reactive } from 'vue'

/**
 * Mock do useNuxtApp para o contexto Storybook
 */
export function useNuxtApp() {
  return {
    $router: {
      push: (to: any) => console.log('Mock router.push:', to),
      replace: (to: any) => console.log('Mock router.replace:', to),
      go: (delta: number) => console.log('Mock router.go:', delta),
      back: () => console.log('Mock router.back'),
      forward: () => console.log('Mock router.forward'),
      currentRoute: ref({ path: '/storybook', query: {}, params: {} }),
    },
    $route: reactive({
      path: '/storybook',
      query: {},
      params: {},
      name: 'storybook',
      meta: {},
    }),
    ssrContext: null,
    payload: reactive({}),
    isHydrating: ref(false),
    deferHydration: () => {},
    runWithContext: <T>(fn: () => T) => fn(),
  }
}

/**
 * Mock do useState para o contexto Storybook
 */
export function useState<T>(key?: string, init?: (() => T) | T): any {
  const initialValue = typeof init === 'function' ? (init as () => T)() : init
  console.log(`Mock useState called with key: ${key}`)
  return ref(initialValue)
}

/**
 * Mock do useRouter para o contexto Storybook
 */
export function useRouter() {
  return {
    push: (to: any) => {
      console.log('Mock useRouter.push:', to)
      return Promise.resolve()
    },
    replace: (to: any) => {
      console.log('Mock useRouter.replace:', to)
      return Promise.resolve()
    },
    go: (delta: number) => console.log('Mock useRouter.go:', delta),
    back: () => console.log('Mock useRouter.back'),
    forward: () => console.log('Mock useRouter.forward'),
    beforeEach: (guard: any) => console.log('Mock useRouter.beforeEach:', guard),
    afterEach: (guard: any) => console.log('Mock useRouter.afterEach:', guard),
    currentRoute: ref({ path: '/storybook', query: {}, params: {} }),
    options: {},
  }
}

/**
 * Mock do useRoute para o contexto Storybook
 */
export function useRoute() {
  return reactive({
    path: '/storybook',
    query: {},
    params: {},
    name: 'storybook',
    meta: {},
    fullPath: '/storybook',
    hash: '',
    matched: [],
  })
}

/**
 * Mock do useCookie para o contexto Storybook
 */
export function useCookie<T>(name: string, options?: any) {
  console.log(`Mock useCookie called with name: ${name}`)
  return ref<T | null>(null)
}

/**
 * Mock do useRuntimeConfig para o contexto Storybook
 */
export function useRuntimeConfig() {
  return {
    app: {
      baseURL: '/',
      buildAssetsDir: '/_nuxt/',
      cdnURL: '',
    },
    public: {},
  }
}

/**
 * Mock do navigateTo para o contexto Storybook
 */
export function navigateTo(to: any, options?: any) {
  console.log('Mock navigateTo:', to, options)
  return Promise.resolve()
}

/**
 * Mock do refresh para o contexto Storybook
 */
export function refresh() {
  console.log('Mock refresh called')
  return Promise.resolve()
}

// Exportar todos os mocks globalmente
declare global {
  const useNuxtApp: typeof import('./nuxt-app').useNuxtApp
  const useState: typeof import('./nuxt-app').useState
  const useRouter: typeof import('./nuxt-app').useRouter
  const useRoute: typeof import('./nuxt-app').useRoute
  const useCookie: typeof import('./nuxt-app').useCookie
  const useRuntimeConfig: typeof import('./nuxt-app').useRuntimeConfig
  const navigateTo: typeof import('./nuxt-app').navigateTo
  const refresh: typeof import('./nuxt-app').refresh
}

import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  skipNodeModulesBundle: true,
  external: [
    '@storybook/vue3-vite',
    '@storybook/vue3',
    'vite',
    'vue',
    'vue-router',
    'pathe',
  ],
})

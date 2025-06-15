import type { StorybookConfig } from '@storybook/vue3-vite'
import { resolve } from 'pathe'

/**
 * Preset para integração Nuxt + Storybook
 * Fornece mocks e configurações necessárias para usar composables do Nuxt no Storybook
 */
export default {
  viteFinal: async (config: any, { configType }: any) => {
    const { mergeConfig } = await import('vite')
    
    return mergeConfig(config, {
      define: {
        // Definir constantes globais para o contexto Storybook
        '__NUXT__': true,
        '__STORYBOOK__': true,
        'process.client': true,
        'process.server': false,
        'import.meta.client': true,
        'import.meta.server': false,
      },
      resolve: {
        alias: {
          // Aliases para compatibilidade com Nuxt
          '#app': resolve(__dirname, '../mocks/nuxt-app.ts'),
          '#imports': resolve(__dirname, '../mocks/nuxt-imports.ts'),
          '~': process.cwd(),
          '@': process.cwd(),
        },
      },
      plugins: [
        // Plugin para injetar os mocks do Nuxt
        {
          name: 'nuxt-storybook-mocks',
          config() {
            return {
              optimizeDeps: {
                include: ['vue', '@storybook/vue3-vite'],
              },
            }
          },
        },
      ],
    })
  },
  
  previewAnnotations: [
    resolve(__dirname, '../preview/nuxt-setup.ts'),
  ],
} satisfies StorybookConfig

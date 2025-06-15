<!-- filepath: /home/linux_user/fremux/private/XStoryBook/packages/storybook-addon/README.md -->
![XStoryBook Addon Banner](https://raw.githubusercontent.com/SysDevUtils/XStoryBook/main/assets/xstorybook-banner.png)

# XStoryBook Vue/Nuxt Preset (@xstorybook/vue-nuxt-preset)

Este pacote fornece o preset/framework do [XStoryBook](https://github.com/SysDevUtils/XStoryBook) para integrar o Storybook v9.0.9+ com aplicações [Nuxt](https://nuxt.com) (v3.16+) e Vue 3.

Ele é uma parte essencial do projeto XStoryBook, garantindo que o Storybook funcione de forma otimizada com as funcionalidades do Nuxt.

## Requisitos

-   [Nuxt](https://nuxt.com/) >= 3.16+
-   [Storybook](https://storybook.js.org/) >= 9.0.9+
-   Vue >= 3.5+
-   `@xstorybook/nuxt-module` (o módulo Nuxt do XStoryBook)

## Instalação

Este pacote é geralmente instalado como uma dependência do `@xstorybook/nuxt-module`. Se você seguiu as instruções de instalação do módulo principal, este preset já deve estar configurado.

```bash
# pnpm
pnpm add -D @xstorybook/nuxt-module @xstorybook/vue-nuxt-preset storybook

# yarn
yarn add -D @xstorybook/nuxt-module @xstorybook/vue-nuxt-preset storybook

# npm
npm install -D @xstorybook/nuxt-module @xstorybook/vue-nuxt-preset storybook
```

## Configuração

No seu arquivo `.storybook/main.ts` (ou `.storybook/main.js`), configure o framework da seguinte forma:

```ts
import type { StorybookConfig } from '@xstorybook/vue-nuxt-preset';

const config: StorybookConfig = {
  stories: [
    // Caminhos para suas stories
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx|vue)',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|vue)',
  ],
  addons: [
    '@storybook/addon-essentials',
    // Outros addons do Storybook v9
    '@xstorybook/xmaker-addon', // Exemplo: se estiver usando o XMaker
  ],
  framework: {
    name: '@xstorybook/vue-nuxt-preset', // Nome do preset XStoryBook
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
```

## Funcionalidades Suportadas (via XStoryBook)

O preset `@xstorybook/vue-nuxt-preset` visa garantir a melhor integração possível com Nuxt, incluindo:

👉 Suporte a Módulos Nuxt (quando configurados corretamente)  
👉 Suporte a Plugins Nuxt  
👉 Componentes Nuxt (incluindo auto-imports)  
👉 Sass/Scss  
👉 CSS/Sass/Scss Modules  
👉 JSX  
👉 PostCSS  
👉 Auto Imports de Composables e Componentes  
👉 Runtime Config do Nuxt  
👉 Composables do Nuxt  
👉 TypeScript  

## Contribuindo

Contribuições para o XStoryBook são bem-vindas!

1.  Faça um fork do repositório [SysDevUtils/XStoryBook](https://github.com/SysDevUtils/XStoryBook).
2.  Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3.  Instale as dependências com `pnpm install` (na raiz do monorepo).
4.  Rode `pnpm dev:prepare` (na raiz) para preparar os pacotes.
5.  Faça suas alterações no pacote `@xstorybook/vue-nuxt-preset`.
6.  Rode `pnpm lint` (na raiz) para verificar. Adicione testes se aplicável.
7.  Faça commit (`git commit -am 'feat: Adiciona nova feature'`).
8.  Envie para a branch (`git push origin feature/nova-feature`).
9.  Abra um Pull Request.

## Licença

Este projeto é licenciado sob a [Licença MIT](https://github.com/SysDevUtils/XStoryBook/blob/main/LICENSE).

## Contato

Para questões relacionadas ao XStoryBook:

🔖 Email: contact@fremux.com (para questões legadas ou se não houver resposta no GitHub)  
🌐 GitHub Issues: [SysDevUtils/XStoryBook/issues](https://github.com/SysDevUtils/XStoryBook/issues)

## Agradecimentos

Este projeto é um fork de componentes do ecossistema [@nuxtjs/storybook](https://github.com/nuxt-modules/storybook) e [@storybook-vue/nuxt](https://github.com/storybook-vue/nuxt), e agradece a todos os seus contribuidores originais.

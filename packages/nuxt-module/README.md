![XStoryBook Nuxt Module](https://raw.githubusercontent.com/SysDevUtils/XStoryBook/main/assets/xstorybook-banner.png)

# XStoryBook Nuxt Module (@fremux/nuxtjs-storybook)

Integra o [XStoryBook](https://github.com/SysDevUtils/XStoryBook) (um fork do Storybook focado em Nuxt 3.16+ e Storybook v9.0.9+) em sua aplicação [Nuxt](https://nuxt.com).

Este módulo é parte do projeto XStoryBook, que visa fornecer uma base estável para Storybook v9+ no Nuxt e servir como fundação para o addon `FremUX XMaker`.

## Instalando

Use seu gerenciador de pacotes preferido:

```bash
# pnpm
pnpm add -D @fremux/nuxtjs-storybook @fremux/storybook-vue-nuxt storybook

# yarn
yarn add -D @fremux/nuxtjs-storybook @fremux/storybook-vue-nuxt storybook

# npm
npm install -D @fremux/nuxtjs-storybook @fremux/storybook-vue-nuxt storybook
```

Atualize seu `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    '@fremux/nuxtjs-storybook',
  ],
  storybook: {
    // url: 'http://localhost:6006', // Opcional: URL onde o Storybook será servido
    // port: 6006, // Opcional: Porta para o Storybook
    // storybookRoute: '/__storybook__', // Opcional: Rota para o Storybook UI no app Nuxt
    // autoStart: false, // Opcional: Se o Storybook deve iniciar com o Nuxt
  },
})
```

Configure seu ambiente Storybook criando um diretório `.storybook` na raiz do seu projeto com os seguintes arquivos:

**`.storybook/main.ts`**:
```ts
import type { StorybookConfig } from '@fremux/storybook-vue-nuxt';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx|vue)',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|vue)',
  ],
  addons: [
    '@storybook/addon-essentials',
    // Adicione outros addons do Storybook v9 aqui
  ],
  framework: {
    name: '@fremux/storybook-vue-nuxt',
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

**`.storybook/preview.ts`**:
```ts
import type { Preview } from '@storybook/vue3';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};
export default preview;
```

Então rode `pnpm dev` (ou `yarn dev`/`npm run dev`) para iniciar seu servidor Nuxt. O Storybook geralmente estará disponível em `http://localhost:6006`.

## Features do XStoryBook Nuxt Module

✨ **Compatibilidade com Storybook v9.0.9+** e Nuxt 3.16+
⚙️ Integração aprimorada com o ecossistema Nuxt.
🛠️ Base para o addon `@fremux/storybook-xmaker`.
🚀 Focado nas necessidades do FremUX e da comunidade Nuxt/Storybook v9.

## Contribuindo

Contribuições para o XStoryBook são bem-vindas!

1.  Faça um fork do repositório [SysDevUtils/XStoryBook](https://github.com/SysDevUtils/XStoryBook).
2.  Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3.  Instale as dependências com `pnpm install`.
4.  Rode `pnpm dev:prepare` (na raiz do monorepo XStoryBook) para preparar os pacotes.
5.  Faça suas alterações no pacote `@fremux/nuxtjs-storybook`.
6.  Rode `pnpm lint` (na raiz) para verificar se não há problemas. Adicione testes se aplicável.
7.  Faça commit de suas alterações (`git commit -am 'feat: Adiciona nova feature'`).
8.  Envie para a branch (`git push origin feature/nova-feature`).
9.  Abra um Pull Request.

## Licença

Este projeto é licenciado sob a [Licença MIT](https://github.com/SysDevUtils/XStoryBook/blob/main/LICENSE).

## Contato

Para questões relacionadas ao XStoryBook ou FremUX:

🔖 Email: contact@fremux.com
🌐 GitHub Issues: [SysDevUtils/XStoryBook/issues](https://github.com/SysDevUtils/XStoryBook/issues)

## Agradecimentos

Este projeto é um fork de [@nuxtjs/storybook](https://github.com/nuxt-modules/storybook) e agradece a todos os seus contribuidores originais.

Agradecimentos também a [Chromatic](https://www.chromatic.com/) por fornecer a plataforma de testes visuais.

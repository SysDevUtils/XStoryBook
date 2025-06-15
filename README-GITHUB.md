# 🚀 XStoryBook: A Base Evoluída para FremUX e o Futuro XMaker

[![Storybook](https://img.shields.io/badge/Storybook-v9.0.9+-FF4785?logo=storybook)](https://storybook.js.org/)
[![Nuxt](https://img.shields.io/badge/Nuxt-3.16+-04C690?logo=nuxt.js)](https://nuxt.com)
[![FremUX](https://img.shields.io/badge/FremUX-Alpha-blueviolet)](https://github.com/SysDevUtils/fremux)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/SysDevUtils/XStoryBook?style=social)](https://github.com/SysDevUtils/XStoryBook/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/SysDevUtils/XStoryBook?style=social)](https://github.com/SysDevUtils/XStoryBook/network/members)
[![GitHub issues](https://img.shields.io/github/issues/SysDevUtils/XStoryBook)](https://github.com/SysDevUtils/XStoryBook/issues)

> **XStoryBook** é um fork especializado e otimizado do módulo [@nuxtjs/storybook](https://github.com/nuxt-modules/storybook), projetado para fornecer compatibilidade robusta com **Storybook v9.0.9+** e **Nuxt 3.16+**. Mais do que um simples fork, o XStoryBook serve como a fundação para o desenvolvimento do **FremUX XMaker**, uma ferramenta de construção visual para componentes FremUX.

## 🌟 Visão e Propósito

O XStoryBook tem dois objetivos principais:

1.  **Compatibilidade e Estabilidade:** Oferecer uma integração Nuxt-Storybook v9 confiável, resolvendo problemas conhecidos e otimizando a experiência de desenvolvimento para projetos Nuxt que utilizam Storybook. Isso inclui os pacotes renomeados e adaptados:
    *   `@fremux/nuxtjs-storybook` (o módulo Nuxt)
    *   `@fremux/storybook-vue-nuxt` (o preset/framework para Storybook)
2.  **Fundação para o FremUX XMaker:** Servir como o ambiente de desenvolvimento e a plataforma base para o `FremUX XMaker`. O XMaker será um addon do Storybook (inicialmente) que visa simplificar e acelerar a criação de componentes e interfaces dentro do ecossistema FremUX, suportando seus padrões arquiteturais como o "Matrioska" e o paradigma declarativo.

## ✨ Características do XStoryBook

- ✅ **Compatibilidade Total com Storybook v9.0.9+** e Nuxt 3.16+ / Vue 3.5+.
- ✅ **Resolução de warnings e problemas de compatibilidade** comuns na integração Nuxt/Storybook.
- ✅ **Integração aprimorada** com o ecossistema Nuxt (auto-imports, composables, etc.).
- ✅ **Base para o `@fremux/storybook-xmaker`**: O addon que trará o poder da construção visual para os componentes FremUX.
- ✅ **Manutenção Ativa**: Focado nas necessidades do FremUX e da comunidade que busca uma solução Storybook v9 para Nuxt.
- ✅ **Licença MIT**: Permitindo uso e modificação flexíveis.

## 📦 Pacotes Incluídos

Este monorepo (gerenciado com pnpm workspaces) contém:

-   `packages/nuxt-module`: O módulo `@fremux/nuxtjs-storybook` para integração com `nuxt.config.ts`.
-   `packages/storybook-addon`: O preset `@fremux/storybook-vue-nuxt` para o `main.ts` do Storybook.
-   `packages/xmaker-addon`: O futuro `@fremux/storybook-xmaker`, o addon de construção visual (em desenvolvimento).

## 🛠️ Roteiro para o FremUX XMaker (Construído sobre XStoryBook)

O desenvolvimento do `FremUX XMaker` seguirá uma abordagem incremental:

1.  **Configuração Visual de Componentes:** Painéis para visualizar e modificar propriedades de componentes "X" do FremUX.
2.  **Geração de Código/JSON:** Ferramentas para gerar as configurações declarativas e, potencialmente, o boilerplate de componentes.
3.  **Visualização do Padrão Matrioska:** Representações visuais para entender e navegar na estrutura encapsulada dos componentes FremUX.
4.  **Funcionalidades Avançadas (Futuro):**
    *   Drag-and-drop para composição de UI.
    *   Templates de componentes e páginas.
    *   Integração com o sistema de arquivos para criação e atualização de componentes.

## 🚀 Instalação e Uso do XStoryBook (para Nuxt + Storybook v9)

Se você deseja usar o XStoryBook para ter compatibilidade Storybook v9 com seu projeto Nuxt (independentemente do XMaker):

```bash
# PNPM (recomendado para este workspace)
pnpm add -D @fremux/nuxtjs-storybook @fremux/storybook-vue-nuxt

# YARN
yarn add -D @fremux/nuxtjs-storybook @fremux/storybook-vue-nuxt

# NPM
npm install -D @fremux/nuxtjs-storybook @fremux/storybook-vue-nuxt
```

Siga as instruções de configuração detalhadas abaixo.

### Configuração

#### nuxt.config.ts

```ts
export default defineNuxtConfig({
  modules: [
    '@fremux/nuxtjs-storybook' // Ou o caminho local se estiver usando como parte do workspace FremUX
  ],
  storybook: {
    // Opções de configuração
    url: 'http://localhost:6006', // URL onde o Storybook será servido
    port: 6006, // Porta para o Storybook
    storybookRoute: '/__storybook__', // Rota para acessar o Storybook UI no app Nuxt (desenvolvimento)
    autoStart: false // Se o Storybook deve iniciar automaticamente com o Nuxt
  }
})
```

#### Estrutura de Arquivos do Storybook

Crie um diretório `.storybook` na raiz do seu projeto Nuxt:
```
.storybook/
├─ main.ts     # Configuração principal do Storybook
├─ preview.ts  # Configurações para o preview do Storybook (globais)
└─ theme.ts    # (opcional) Configuração de tema customizado para o Storybook UI
```

#### .storybook/main.ts

Certifique-se de usar `@fremux/storybook-vue-nuxt` como o framework:

```ts
import type { StorybookConfig } from '@fremux/storybook-vue-nuxt';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx|vue)', // Caminho para suas stories
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|vue)'
  ],
  addons: [
    '@storybook/addon-essentials', // Pacote essencial de addons
    '@storybook/addon-interactions', // Para testar interações
    '@storybook/addon-themes', // Para alternar temas
    '@storybook/addon-a11y', // Para acessibilidade
    // '@fremux/storybook-xmaker' // Adicione quando disponível e instalado
  ],
  framework: {
    name: '@fremux/storybook-vue-nuxt', // Nome do framework adaptado
    options: {} // Opções específicas do framework (se houver)
  },
  core: {
    disableTelemetry: true, // Desabilita a telemetria do Storybook
  },
  docs: {
    autodocs: 'tag', // Habilita autodocs para stories com a tag 'autodocs'
  },
  // ... outras configurações do Storybook
};

export default config;
```

#### .storybook/preview.ts

(Adapte conforme necessário, exemplo básico)
```ts
import type { Preview } from '@storybook/vue3';
// Importe seus estilos globais do Nuxt se necessário
// import '../assets/css/main.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Exemplo de configuração de tema (se estiver usando @storybook/addon-themes)
    // themes: {
    //   default: 'light',
    //   list: [
    //     { name: 'light', class: 'light-theme', color: '#ffffff' },
    //     { name: 'dark', class: 'dark-theme', color: '#000000' },
    //   ],
    // },
  },
  // globalTypes, decorators, etc. podem ser adicionados aqui
};

export default preview;
```

## 🚀 Uso dos Scripts (dentro do workspace XStoryBook)

Para desenvolver o próprio XStoryBook ou o XMaker:

```json
// package.json (na raiz do XStoryBook)
{
  "scripts": {
    // ... outros scripts ...
    "dev:module": "pnpm --filter @fremux/nuxtjs-storybook dev",
    "dev:addon": "pnpm --filter @fremux/storybook-vue-nuxt dev",
    "dev:xmaker": "pnpm --filter @fremux/storybook-xmaker dev", // Quando o pacote existir
    "build:packages": "pnpm --filter './packages/*' build",
    // Para testar, você precisará de um app Nuxt (playground) que consuma esses pacotes.
    // Exemplo de como seria o script se houvesse um playground:
    // "dev:playground": "pnpm --filter ./playground dev",
    // "storybook:playground": "pnpm --filter ./playground storybook"
  }
}
```
**Nota:** Atualmente, os scripts `dev`, `storybook` e `build-storybook` no `package.json` raiz foram simplificados. Para testar os pacotes do XStoryBook, você precisará integrá-los a um projeto Nuxt (como o projeto FremUX principal ou um aplicativo de exemplo dedicado).

## 🔍 Comparação com o Módulo Original (@nuxtjs/storybook)

| Característica          | @nuxtjs/storybook (original) | XStoryBook (@fremux/...) |
|-------------------------|------------------------------|---------------------------|
| Versão Storybook        | <= 8.x                       | **9.0.9+**                |
| Nuxt 3.16+              | Suporte parcial/com issues   | ✅ **Completo e Otimizado** |
| Base para XMaker        | ❌ Não aplicável             | ✅ **Sim, propósito central** |
| Manutenção para v9      | Incerta/Lenta                | ✅ **Ativa e Focada**       |
| Nomes dos Pacotes       | `@nuxtjs/storybook`, `@storybook-vue/nuxt` | `@fremux/nuxtjs-storybook`, `@fremux/storybook-vue-nuxt` |

## 📝 Migração do @nuxtjs/storybook (v8) para XStoryBook (v9)

1.  **Desinstale o módulo antigo e suas dependências relacionadas ao Storybook v8:**
    ```bash
    pnpm remove @nuxtjs/storybook @storybook-vue/nuxt # ou npm/yarn
    # Considere remover também addons do storybook v8 se não forem compatíveis com v9
    ```
2.  **Instale os pacotes XStoryBook e as dependências do Storybook v9:**
    ```bash
    pnpm add -D @fremux/nuxtjs-storybook @fremux/storybook-vue-nuxt storybook @storybook/vue3-vite @storybook/addon-essentials # etc.
    ```
3.  **Atualize `nuxt.config.ts`:** Substitua `@nuxtjs/storybook` por `@fremux/nuxtjs-storybook`.
4.  **Atualize `.storybook/main.ts`:**
    *   Mude o `framework.name` para `@fremux/storybook-vue-nuxt`.
    *   Atualize a lista de `addons` para os compatíveis com Storybook v9.
    *   Ajuste os imports e tipos se necessário (ex: `StorybookConfig` de `@fremux/storybook-vue-nuxt`).
5.  **Verifique seus `stories`:** O Storybook v9 usa CSF (Component Story Format) 3.0 por padrão. A maioria das stories CSF 2.0 ainda funciona, mas a atualização para CSF 3.0 é recomendada para aproveitar todos os recursos.
6.  **Limpe caches e `node_modules`:** `rm -rf node_modules .nuxt .storyboook-cache` (ou equivalentes) e reinstale as dependências (`pnpm install`).
7.  **Verifique o `preview.ts`:** Adapte os imports e configurações conforme necessário para o Storybook v9.

## 🛠️ Solução de Problemas Comuns

(Esta seção será expandida conforme problemas específicos do XStoryBook forem identificados)

#### Error: `require` is not defined
Solução: Este erro geralmente ocorre no Storybook v7+ (incluindo v9) devido ao uso de ESM (ECMAScript Modules). Certifique-se de que sua configuração e os arquivos `.ts` ou `.js` do Storybook (como `main.ts`, `preview.ts`) estão usando imports ESM:
```ts
// Antes (CommonJS em alguns presets antigos ou customizações)
// const vue = require('@vitejs/plugin-vue')

// Depois (ESM)
import vue from '@vitejs/plugin-vue'; // Exemplo
```
Verifique também se o `type: "module"` está presente no `package.json` do seu projeto Nuxt ou se os arquivos `.ts` são transpilados corretamente para ESM. Os pacotes XStoryBook são distribuídos como ESM.

#### Problemas com Auto-imports do Nuxt no Storybook
Se os auto-imports do Nuxt (composables, componentes) não estiverem funcionando em suas stories:
*   Certifique-se de que `@fremux/nuxtjs-storybook` está corretamente configurado em `nuxt.config.ts`.
*   Verifique se o framework `@fremux/storybook-vue-nuxt` está corretamente definido em `.storybook/main.ts`.
*   Pode ser necessário reiniciar o servidor de desenvolvimento do Storybook após alterações na configuração do Nuxt.

## 🤝 Contribuindo

Contribuições para o XStoryBook são bem-vindas! Se você encontrar bugs, tiver sugestões de melhorias ou quiser adicionar novas funcionalidades, por favor, abra uma issue ou um pull request no [repositório GitHub](https://github.com/SysDevUtils/XStoryBook).

## 📜 Licença

XStoryBook é distribuído sob a [Licença MIT](https://opensource.org/licenses/MIT). Veja o arquivo `LICENSE` para mais detalhes. O fork original `@nuxtjs/storybook` também é licenciado sob MIT.

## 📚 Recursos Adicionais

- [Documentação Storybook v9](https://storybook.js.org/docs)
- [Documentação Nuxt 3](https://nuxt.com/docs)
- [Repositório FremUX (Projeto Principal)](https://github.com/SysDevUtils/fremux)
- [Repositório XStoryBook (Este fork)](https://github.com/SysDevUtils/XStoryBook)
- [Repositório XStoryBook Privado (Documentação Interna)](https://github.com/SysDevUtils/XStoryBook_p)

---

*Este README foi adaptado para o XStoryBook, fork de [@nuxtjs/storybook](https://github.com/nuxt-modules/storybook).*

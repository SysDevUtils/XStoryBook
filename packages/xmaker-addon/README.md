# FremUX XMaker - Addon para Storybook

> Criador visual de componentes para o framework FremUX seguindo o padrão Matrioska

## 📋 Visão Geral

O FremUX XMaker é um addon para Storybook que permite criar, visualizar e testar componentes no padrão Matrioska do FremUX. Esta ferramenta fornece uma interface visual para definir componentes, suas propriedades, eventos, slots e subcomponentes, gerando automaticamente o código necessário para integração no seu projeto FremUX.

## ✨ Funcionalidades

- 🧩 **Criação visual de componentes** - Interface interativa para definir componentes
- 📦 **Suporte ao padrão Matrioska** - Estruturação automática seguindo o padrão encapsulado
- 🔄 **Geração de código** - Produção automática de arquivos Vue, tipos e stories
- 📝 **Templates pré-configurados** - Modelos para diferentes tipos de componentes (básico, form, layout, etc.)
- 🧪 **Teste em tempo real** - Visualização instantânea no Storybook

## 💻 Instalação

```bash
# NPM
npm install --save-dev @fremux/storybook-xmaker

# PNPM
pnpm add -D @fremux/storybook-xmaker
```

## ⚙️ Configuração

Adicione o addon à sua configuração do Storybook em `.storybook/main.ts`:

```ts
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  // Configurações existentes
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  
  addons: [
    // Outros addons
    '@fremux/storybook-xmaker'
  ],
};

export default config;
```

## 🚀 Uso Básico

### 1. Acesse o painel XMaker no Storybook

Após iniciar o Storybook, você verá um novo painel chamado "FremUX XMaker" no painel lateral.

### 2. Configure seu componente

- Defina o nome, descrição e prefixo
- Escolha se seguirá o padrão Matrioska
- Selecione um template básico

### 3. Adicione props, eventos e slots

Use as abas para configurar:
- Props (tipo, valor padrão, validações)
- Eventos emitidos pelo componente
- Slots disponíveis

### 4. Visualize e gere seu componente

- Pré-visualize o componente no Storybook
- Gere o código completo em Vue
- Exporte para o projeto FremUX

## 📚 Padrão Matrioska

O FremUX implementa o padrão Matrioska para encapsulamento de componentes:

```
components/
├── XForm.vue                # Componente proxy
└── XForm/
    ├── XForm.vue            # Implementação principal
    ├── XFormField.vue       # Subcomponente
    └── fields/              # Subcomponentes especializados
        ├── XFormText.vue
        └── XFormSelect.vue
```

O XMaker gerará automaticamente esta estrutura e os arquivos necessários quando você escolher a opção Matrioska.

## 🛠️ API

### Parâmetros em Stories

Você pode configurar o XMaker em suas stories:

```ts
export default {
  title: 'Components/XMeuComponente',
  component: XMeuComponente,
  parameters: {
    xmaker: {
      matrioska: true,
      prefix: 'X',
      props: [/* definições de props */],
      events: [/* eventos */],
      slots: [/* slots */],
      subcomponents: [/* subcomponentes */]
    }
  }
};
```

## 🔄 Integração com outros addons

O XMaker trabalha perfeitamente com outros addons do Storybook:

- **Controls**: Teste suas props em tempo real
- **Actions**: Capture e teste eventos emitidos
- **Docs**: Documentação automática gerada

## 🎨 Estilos e Temas

O XMaker respeita o tema do Storybook e também permite customização de componentes gerados através de templates personalizados.

## 🔌 Extensibilidade

Você pode criar seus próprios templates para casos de uso específicos:

```ts
// .storybook/xmaker-templates.ts
import { addTemplate } from '@fremux/storybook-xmaker';

addTemplate('meu-template', {
  template: `<div class="meu-componente">...</div>`,
  script: `export default { ... }`,
  style: `.meu-componente { ... }`
});
```

## 📦 Contribuições

Contribuições são bem-vindas! Por favor, crie um issue ou pull request.

## 📄 Licença

MIT

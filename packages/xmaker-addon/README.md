# XStoryBook XMaker Addon

> Visual component builder for Storybook, enabling rapid UI development and prototyping within the XStoryBook ecosystem.

## 📋 Overview

The XStoryBook XMaker is a powerful addon for Storybook designed to streamline the creation, visualization, and testing of UI components. It provides an intuitive visual interface for defining components, their properties, events, slots, and even nested subcomponents. XMaker automatically generates the necessary code, helping you build consistent and robust UIs faster.

While initially conceived for the FremUX framework and its Matrioska pattern, XMaker is evolving to be a versatile tool for any Storybook and Nuxt (Vue) based project aiming for efficient component-driven development.

## ✨ Features

- 🧩 **Visual Component Creation**: Interactive interface to define component structure and properties.
- 🔄 **Code Generation**: Automatic generation of Vue component files, type definitions, and Storybook stories.
- 🎨 **Template-Based**: Start with pre-configured templates for common component types or create your own.
- ⚡ **Real-time Previews**: Instantly see your component in Storybook as you build it.
- 🛠️ **XStoryBook Integration**: Seamlessly works within the XStoryBook environment.
- 📦 **(Future) Matrioska Pattern Support**: Specific support for advanced component encapsulation patterns.

## 💻 Installation

```bash
# NPM
npm install --save-dev @xstorybook/xmaker-addon

# PNPM
pnpm add -D @xstorybook/xmaker-addon
```

## ⚙️ Configuration

Add the addon to your Storybook configuration in `.storybook/main.ts` (or `.storybook/main.js`):

```ts
import type { StorybookConfig } from '@storybook/vue3-vite'; // Or your specific framework

const config: StorybookConfig = {
  // ... existing configurations
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'], // Adjust to your stories path
  
  addons: [
    // ... other addons
    '@xstorybook/xmaker-addon',
    // Ensure other essential XStoryBook addons are listed, e.g., '@xstorybook/nuxt-module'
  ],
  // ... other configurations like framework, core, docs, etc.
};

export default config;
```

## 🚀 Basic Usage

1.  **Access the XMaker Panel**: Once Storybook is running, you'll find the "XMaker" panel in the Storybook UI.
2.  **Define Your Component**: Use the visual editor to:
    *   Set the component name and description.
    *   Choose a base template (if available).
    *   Add and configure props (name, type, default value, controls).
    *   Define emitted events.
    *   Specify available slots.
3.  **Generate and Preview**: 
    *   See a live preview of your component.
    *   Generate the component code (e.g., `.vue` file, story file).
    *   Export or save the generated files to your project.

## 📚 (Future) Matrioska Pattern

Support for the Matrioska pattern (an advanced component encapsulation strategy) is planned for future versions, allowing for highly organized and maintainable component structures, especially in large-scale applications.

## 🛠️ API & Customization

### Story Parameters

You can provide initial configurations for XMaker directly in your component stories:

```ts
// Example: src/components/MyButton.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import MyButton from './MyButton.vue';

const meta: Meta<typeof MyButton> = {
  title: 'Components/MyButton',
  component: MyButton,
  parameters: {
    xmaker: {
      // Initial XMaker settings for this component
      // e.g., defaultProps: { label: 'Click Me' }
    },
  },
  // argTypes for props can also be defined here
};

export default meta;

type Story = StoryObj<typeof MyButton>;

export const Default: Story = {
  args: {
    label: 'Button',
  },
};
```

### Extensibility

Future versions will allow for custom templates and deeper integration hooks.

## 🤝 Contributing

Contributions to XStoryBook and the XMaker addon are welcome! Please refer to the main `XStoryBook` repository for contribution guidelines, issue tracking, and pull requests.

- **Issues**: [XStoryBook Issues](https://github.com/SysDevUtils/XStoryBook/issues)
- **Discussions**: [XStoryBook Discussions](https://github.com/SysDevUtils/XStoryBook/discussions)

## 📄 License

MIT - See the [LICENSE](https://github.com/SysDevUtils/XStoryBook/blob/main/LICENSE) file in the main XStoryBook repository.

---
*This README is for the `@xstorybook/xmaker-addon` package. For the main XStoryBook project, please see the [XStoryBook README](https://github.com/SysDevUtils/XStoryBook#readme).*

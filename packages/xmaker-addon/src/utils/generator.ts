/**
 * Utilitários para geração de código de componentes FremUX
 */
import type { XComponentDefinition } from '../types';

/**
 * Gera o código do componente Vue baseado na definição
 */
export function generateComponentCode(definition: XComponentDefinition): {
  template: string;
  script: string;
  style: string;
  proxyFile: string;
  implementationFile: string;
} {
  const { name, prefix, props, events, slots, matrioska } = definition;
  const fullName = `${prefix}${name}`;
  
  // Gera props para o script
  const propsCode = props.map(prop => {
    const options = [`type: ${prop.type}`];
    if (prop.required) options.push('required: true');
    if (prop.default !== undefined) {
      const defaultValue = typeof prop.default === 'string' 
        ? `'${prop.default}'` 
        : prop.default;
      options.push(`default: ${defaultValue}`);
    }
    return `    ${prop.name}: {\n      ${options.join(',\n      ')}\n    }`;
  }).join(',\n');
  
  // Gera emits para o script
  const emitsCode = events.length 
    ? `\n  emits: [${events.map(e => `'${e}'`).join(', ')}],` 
    : '';
  
  // Template básico
  const templateCode = `<template>
  <div class="${fullName.toLowerCase()}">
    ${slots.includes('default') ? '<slot></slot>' : '<!-- Conteúdo do componente aqui -->'}
  </div>
</template>`;

  // Script
  const scriptCode = `<script>
export default {
  name: '${fullName}',${emitsCode}
  props: {
${propsCode || '    // Definir props aqui'}
  },
  setup(props, { emit }) {
    // Lógica do componente
    
    return {
      // Dados expostos ao template
    }
  }
}
</script>`;

  // Estilos
  const styleCode = `<style>
.${fullName.toLowerCase()} {
  /* Estilos do componente */
}
</style>`;

  // Arquivo proxy para componentes Matrioska
  const proxyFile = matrioska 
    ? `<script>
import ${fullName} from './${fullName}/${fullName}.vue';

export default ${fullName};
</script>`
    : '';

  return {
    template: templateCode,
    script: scriptCode,
    style: styleCode,
    proxyFile,
    implementationFile: `${templateCode}\n\n${scriptCode}\n\n${styleCode}`,
  };
}

/**
 * Gera um story básico do Storybook para o componente
 */
export function generateStoryCode(definition: XComponentDefinition): string {
  const { name, prefix } = definition;
  const fullName = `${prefix}${name}`;
  
  return `import ${fullName} from './${fullName}.vue';

export default {
  title: 'FremUX/${fullName}',
  component: ${fullName},
  parameters: {
    xmaker: {
      // Configuração do XMaker para este componente
      name: '${name}',
      prefix: '${prefix}',
      matrioska: ${definition.matrioska},
    }
  },
  argTypes: {
    // Defina os controles para as props aqui
${definition.props.map(prop => `    ${prop.name}: {
      control: '${getControlType(prop.type)}',
      description: '${prop.description || ''}'
    }`).join(',\n')}
  },
};

export const Default = {
  args: {
    // Valores padrão para as props
${definition.props.map(prop => `    ${prop.name}: ${getDefaultValue(prop)}`).join(',\n')}
  },
};
`;
}

/**
 * Mapeia tipos de prop para tipos de controle do Storybook
 */
function getControlType(propType: string): string {
  const typeMap: Record<string, string> = {
    'String': 'text',
    'Number': 'number',
    'Boolean': 'boolean',
    'Array': 'object',
    'Object': 'object',
    'Date': 'date',
    'Function': 'function',
    'Symbol': 'text'
  };
  
  return typeMap[propType] || 'text';
}

/**
 * Gera valores padrão para props nas stories
 */
function getDefaultValue(prop: any): string {
  if (prop.default !== undefined) return JSON.stringify(prop.default);
  
  switch (prop.type) {
    case 'String': return "''";
    case 'Number': return '0';
    case 'Boolean': return 'false';
    case 'Array': return '[]';
    case 'Object': return '{}';
    case 'Date': return 'new Date()';
    case 'Function': return '() => {}';
    default: return 'undefined';
  }
}

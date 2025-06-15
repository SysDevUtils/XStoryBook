/**
 * Preset do XMaker para o Storybook
 */
import type { PresetProperty } from 'storybook/internal/types';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Obter diretório atual como __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configura o addon
const preset = {
  name: '@fremux/storybook-xmaker',
  
  // Decoradores para o preview
  preview: () => {
    return {
      decorators: [
        // Adiciona o decorador do XMaker automaticamente
        async (storyFn, context) => {
          const { withXMaker } = await import('./index');
          const decorated = withXMaker()(storyFn);
          return decorated(context);
        }
      ],
    };
  },
  
  // Configurações para o XMaker integrar com Storybook
  managerEntries: (entries = []) => {
    return [...entries, join(__dirname, './register')];
  },
};

export default preset;

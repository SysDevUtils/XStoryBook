/**
 * XMaker Addon para o Storybook
 * Ferramenta visual para criação de componentes no padrão Matrioska do FremUX
 */
import { addons, types } from 'storybook/manager-api';
import { ADDON_ID, PANEL_ID } from './constants';
import { XMakerPanel } from './panels/XMakerPanel';

// Registra o addon no Storybook
addons.register(ADDON_ID, (api) => {
  // Adiciona o painel ao Storybook
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'FremUX XMaker',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => {
      return {
        render: () => ({
          components: { XMakerPanel },
          setup() {
            return { api, active };
          },
          template: '<XMakerPanel :api="api" :active="active" />',
        }),
      };
    },
  });
});

export * from './constants';

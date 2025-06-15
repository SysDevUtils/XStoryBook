/**
 * Ponto de entrada principal do XMaker Addon
 * Define os decoradores, contexto e configurações para o Storybook
 */
import { makeDecorator } from '@storybook/preview-api';
import { PARAM_KEY } from './constants';

// Interface para as configurações do XMaker
export interface XMakerConfig {
  /**
   * Define se este componente segue o padrão Matrioska
   */
  matrioska: boolean;
  /**
   * Configuração JSON específica do componente
   */
  config?: Record<string, any>;
  /**
   * Prefixo do componente - X para componentes nativos FremUX
   */
  prefix?: 'X' | '';
  /**
   * Subcomponentes, se aplicável para componentes Matrioska
   */
  subcomponents?: string[];
}

// Decorador para adicionar suporte ao XMaker
export const withXMaker = makeDecorator({
  name: 'withXMaker',
  parameterName: PARAM_KEY,
  wrapper: (getStory, context, { parameters }) => {
    // Configuração padrão
    const defaultConfig: XMakerConfig = {
      matrioska: true,
      prefix: 'X',
      subcomponents: [],
    };

    // Mesclar configurações
    const config = {
      ...defaultConfig,
      ...(parameters || {}),
    };

    // Retorna o story com dados do XMaker injetados no contexto
    return getStory({ ...context, xmaker: config });
  },
});

// Re-exporta constantes e tipos
export * from './constants';
export * from './types';

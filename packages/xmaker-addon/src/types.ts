/**
 * Tipos e interfaces para o XMaker
 */

/**
 * Propriedade de um componente FremUX
 */
export interface XComponentProp {
  name: string;
  type: 'String' | 'Number' | 'Boolean' | 'Array' | 'Object' | 'Function' | 'Date' | 'Symbol';
  required?: boolean;
  default?: any;
  description?: string;
  options?: any[];
}

/**
 * Definição de um componente FremUX
 */
export interface XComponentDefinition {
  name: string;
  description?: string;
  prefix: 'X' | '';
  props: XComponentProp[];
  events: string[];
  slots: string[];
  matrioska: boolean;
  subcomponents?: XComponentDefinition[];
  template?: string;
  script?: string;
  style?: string;
}

/**
 * Tipo de slot para um componente
 */
export interface XComponentSlot {
  name: string;
  description?: string;
  default?: string;
}

/**
 * Tipo de evento emitido pelo componente
 */
export interface XComponentEvent {
  name: string;
  description?: string;
  payload?: string;
}

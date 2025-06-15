/**
 * Componente Vue para o painel do XMaker
 */
import { defineComponent, ref, watch, onMounted } from 'vue';
import { EVENTS, PARAM_KEY } from '../constants';
import type { XComponentDefinition } from '../types';

export const XMakerPanel = defineComponent({
  name: 'XMakerPanel',
  props: {
    api: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // Estado do componente
    const componentName = ref('');
    const componentDescription = ref('');
    const componentPrefix = ref('X');
    const isMatrioska = ref(true);
    const selectedTemplate = ref('default');
    const componentProps = ref([]);
    const componentEvents = ref([]);
    const componentSlots = ref([]);
    const subcomponents = ref([]);
    const currentTab = ref('basic'); // 'basic', 'props', 'events', 'slots', 'subcomponents', 'preview'
    
    // Referência ao state atual do Storybook
    const storyData = ref(null);
    
    // Atualiza o state com base na story atual
    const updateFromStory = () => {
      const { api } = props;
      if (api) {
        const story = api.getCurrentStoryData();
        if (story) {
          storyData.value = story;
          
          // Tenta obter dados específicos do XMaker
          const xmakerParams = story.parameters?.[PARAM_KEY] || {};
          
          // Preenche campos com dados existentes
          componentName.value = xmakerParams.name || story.name || '';
          componentDescription.value = xmakerParams.description || '';
          componentPrefix.value = xmakerParams.prefix || 'X';
          isMatrioska.value = xmakerParams.matrioska !== false;
          componentProps.value = xmakerParams.props || [];
          componentEvents.value = xmakerParams.events || [];
          componentSlots.value = xmakerParams.slots || [];
          subcomponents.value = xmakerParams.subcomponents || [];
        }
      }
    };
    
    // Gera o componente baseado nas configurações
    const generateComponent = () => {
      if (componentName.value) {
        const componentDef: XComponentDefinition = {
          name: componentName.value,
          description: componentDescription.value,
          prefix: componentPrefix.value as 'X' | '',
          props: componentProps.value,
          events: componentEvents.value,
          slots: componentSlots.value,
          matrioska: isMatrioska.value,
          subcomponents: subcomponents.value,
        };
        
        // Emite evento para gerar o componente
        props.api.emit(EVENTS.GENERATE_COMPONENT, componentDef);
      }
    };
    
    // Efeitos e lifecycle hooks
    watch(() => props.active, (isActive) => {
      if (isActive) {
        updateFromStory();
      }
    });
    
    onMounted(() => {
      if (props.active) {
        updateFromStory();
      }
    });
    
    return {
      componentName,
      componentDescription,
      componentPrefix,
      isMatrioska,
      selectedTemplate,
      componentProps,
      componentEvents, 
      componentSlots,
      subcomponents,
      currentTab,
      generateComponent,
    };
  },
  template: `
    <div class="fremux-xmaker-panel">
      <div class="fremux-xmaker-tabs">
        <button 
          @click="currentTab = 'basic'"
          :class="{ active: currentTab === 'basic' }">
          Básico
        </button>
        <button 
          @click="currentTab = 'props'"
          :class="{ active: currentTab === 'props' }">
          Props
        </button>
        <button 
          @click="currentTab = 'events'"
          :class="{ active: currentTab === 'events' }">
          Events
        </button>
        <button 
          @click="currentTab = 'slots'"
          :class="{ active: currentTab === 'slots' }">
          Slots
        </button>
        <button 
          v-if="isMatrioska"
          @click="currentTab = 'subcomponents'"
          :class="{ active: currentTab === 'subcomponents' }">
          Subcomponentes
        </button>
        <button 
          @click="currentTab = 'preview'"
          :class="{ active: currentTab === 'preview' }">
          Preview
        </button>
      </div>
      
      <!-- Tab: Básico -->
      <div v-if="currentTab === 'basic'" class="fremux-xmaker-tab-content">
        <div class="fremux-xmaker-field">
          <label>Nome do Componente</label>
          <input v-model="componentName" placeholder="Nome do componente (sem prefixo)" />
        </div>
        
        <div class="fremux-xmaker-field">
          <label>Descrição</label>
          <textarea v-model="componentDescription" placeholder="Descreva o propósito do componente"></textarea>
        </div>
        
        <div class="fremux-xmaker-field">
          <label>Prefixo</label>
          <select v-model="componentPrefix">
            <option value="X">X (Componente nativo do FremUX)</option>
            <option value="">Nenhum (Componente externo)</option>
          </select>
        </div>
        
        <div class="fremux-xmaker-field">
          <label>Padrão Matrioska</label>
          <div class="fremux-xmaker-checkbox">
            <input type="checkbox" v-model="isMatrioska" id="matrioska-check" />
            <label for="matrioska-check">Este componente segue o padrão Matrioska</label>
          </div>
        </div>
        
        <div class="fremux-xmaker-field">
          <label>Template</label>
          <select v-model="selectedTemplate">
            <option value="default">Básico</option>
            <option value="form">Formulário</option>
            <option value="layout">Layout</option>
            <option value="data">Dados</option>
            <option value="empty">Vazio</option>
          </select>
        </div>
      </div>
      
      <!-- Tab: Props -->
      <div v-if="currentTab === 'props'" class="fremux-xmaker-tab-content">
        <div class="fremux-xmaker-list-header">
          <h3>Propriedades</h3>
          <button class="fremux-xmaker-btn-add">+ Adicionar</button>
        </div>
        
        <div class="fremux-xmaker-empty" v-if="!componentProps.length">
          Nenhuma propriedade definida
        </div>
        
        <div class="fremux-xmaker-prop-list" v-else>
          <!-- Lista de props aqui -->
          <div v-for="(prop, index) in componentProps" :key="index" class="fremux-xmaker-prop-item">
            {{ prop.name }}: {{ prop.type }}
            <div class="fremux-xmaker-prop-actions">
              <button>Editar</button>
              <button>Remover</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tab: Events -->
      <div v-if="currentTab === 'events'" class="fremux-xmaker-tab-content">
        <div class="fremux-xmaker-list-header">
          <h3>Eventos</h3>
          <button class="fremux-xmaker-btn-add">+ Adicionar</button>
        </div>
        
        <div class="fremux-xmaker-empty" v-if="!componentEvents.length">
          Nenhum evento definido
        </div>
      </div>
      
      <!-- Tab: Slots -->
      <div v-if="currentTab === 'slots'" class="fremux-xmaker-tab-content">
        <div class="fremux-xmaker-list-header">
          <h3>Slots</h3>
          <button class="fremux-xmaker-btn-add">+ Adicionar</button>
        </div>
        
        <div class="fremux-xmaker-empty" v-if="!componentSlots.length">
          Nenhum slot definido
        </div>
      </div>
      
      <!-- Tab: Subcomponentes (apenas se for Matrioska) -->
      <div v-if="currentTab === 'subcomponents' && isMatrioska" class="fremux-xmaker-tab-content">
        <div class="fremux-xmaker-list-header">
          <h3>Subcomponentes</h3>
          <button class="fremux-xmaker-btn-add">+ Adicionar</button>
        </div>
        
        <div class="fremux-xmaker-empty" v-if="!subcomponents.length">
          Nenhum subcomponente definido
        </div>
      </div>
      
      <!-- Tab: Preview -->
      <div v-if="currentTab === 'preview'" class="fremux-xmaker-tab-content">
        <h3>Preview do Componente</h3>
        <div class="fremux-xmaker-preview">
          <pre><code>{{ componentPrefix }}{{ componentName }}.vue</code></pre>
          
          <!-- Botão para gerar o componente -->
          <div class="fremux-xmaker-actions">
            <button class="fremux-xmaker-btn-primary" @click="generateComponent">
              Gerar Componente
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
});

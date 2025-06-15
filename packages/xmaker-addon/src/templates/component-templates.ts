/**
 * Templates para componentes básicos
 */
export default {
  /**
   * Template básico para componente simples
   */
  default: {
    template: `<div class="{{className}}">
  <slot></slot>
</div>`,
    script: `export default {
  name: '{{componentName}}',
  props: {
    // Propriedades básicas
  },
  setup(props, { emit }) {
    // Lógica do componente
    
    return {
      // Dados expostos ao template
    }
  }
}`,
    style: `.{{className}} {
  /* Estilos básicos */
  display: block;
}`
  },
  
  /**
   * Template para componente de formulário
   */
  form: {
    template: `<div class="{{className}}">
  <form @submit.prevent="handleSubmit">
    <slot></slot>
    <div class="{{className}}__actions">
      <slot name="actions">
        <button type="submit" class="{{className}}__submit">{{submitLabel}}</button>
      </slot>
    </div>
  </form>
</div>`,
    script: `export default {
  name: '{{componentName}}',
  props: {
    submitLabel: {
      type: String,
      default: 'Enviar'
    }
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const handleSubmit = () => {
      emit('submit');
    };
    
    return {
      handleSubmit
    }
  }
}`,
    style: `.{{className}} {
  display: block;
}

.{{className}}__actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.{{className}}__submit {
  padding: 0.5rem 1rem;
  background-color: var(--primary-color, #3B82F6);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}`
  },
  
  /**
   * Template para componente de layout
   */
  layout: {
    template: `<div class="{{className}}">
  <div class="{{className}}__header">
    <slot name="header"></slot>
  </div>
  
  <div class="{{className}}__body">
    <slot></slot>
  </div>
  
  <div class="{{className}}__footer">
    <slot name="footer"></slot>
  </div>
</div>`,
    script: `export default {
  name: '{{componentName}}',
  props: {
    headerVisible: {
      type: Boolean,
      default: true
    },
    footerVisible: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    return {
      // Dados expostos ao template
    }
  }
}`,
    style: `.{{className}} {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.{{className}}__header {
  padding: 1rem;
}

.{{className}}__body {
  flex: 1;
  padding: 1rem;
}

.{{className}}__footer {
  padding: 1rem;
}`
  },
  
  /**
   * Template para componente de dados
   */
  data: {
    template: `<div class="{{className}}">
  <div v-if="loading" class="{{className}}__loading">
    <slot name="loading">Carregando...</slot>
  </div>
  
  <div v-else-if="error" class="{{className}}__error">
    <slot name="error" :error="error">
      Erro ao carregar dados: {{ error }}
    </slot>
  </div>
  
  <div v-else-if="!data || data.length === 0" class="{{className}}__empty">
    <slot name="empty">Nenhum dado encontrado</slot>
  </div>
  
  <div v-else class="{{className}}__content">
    <slot :data="data"></slot>
  </div>
</div>`,
    script: `export default {
  name: '{{componentName}}',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: [String, Object],
      default: null
    },
    data: {
      type: [Array, Object],
      default: null
    }
  },
  setup(props) {
    return {
      // Dados expostos ao template
    }
  }
}`,
    style: `.{{className}} {
  display: block;
}

.{{className}}__loading,
.{{className}}__error,
.{{className}}__empty {
  padding: 2rem;
  text-align: center;
}

.{{className}}__error {
  color: var(--error-color, #EF4444);
}`
  },
  
  /**
   * Template vazio
   */
  empty: {
    template: `<div class="{{className}}">
  <slot></slot>
</div>`,
    script: `export default {
  name: '{{componentName}}',
  props: {
    // Defina as props aqui
  },
  setup(props) {
    // Lógica do componente
    
    return {
      // Dados expostos ao template
    }
  }
}`,
    style: `.{{className}} {
  /* Defina os estilos aqui */
}`
  }
};

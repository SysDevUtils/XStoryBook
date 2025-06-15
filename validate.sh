#!/usr/bin/env bash
# Script para validação de compatibilidade do fork Storybook v9 para Nuxt

# Configuração de cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir cabeçalhos
print_header() {
  echo -e "\n${YELLOW}==== $1 ====${NC}\n"
}

# Função para verificar se comando foi executado com sucesso
check_result() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ $1${NC}"
  else
    echo -e "${RED}✗ $1${NC}"
    if [ "$3" = "critical" ]; then
      echo -e "${RED}Erro crítico. Abortando validação.${NC}"
      exit 1
    fi
  fi
  echo ""
}

# Diretório base
BASE_DIR="/home/linux_user/fremux/private/nuxt-storybook-fork"

print_header "Iniciando Validação do Fork Storybook v9 para Nuxt"

# Verificar estrutura de diretórios
print_header "Verificando estrutura de diretórios"
ls -la $BASE_DIR/packages/nuxt-module
check_result "Verificação do módulo Nuxt" "warning"
ls -la $BASE_DIR/packages/storybook-addon
check_result "Verificação do addon Storybook" "warning"

# Verificar configurações de package.json
print_header "Verificando configurações de package.json"
grep -q '"name": "@fremux/nuxtjs-storybook"' $BASE_DIR/packages/nuxt-module/package.json
check_result "Nome do pacote nuxt-module está correto" "warning"

grep -q '"name": "@fremux/storybook-vue-nuxt"' $BASE_DIR/packages/storybook-addon/package.json
check_result "Nome do pacote storybook-addon está correto" "warning"

grep -q '"storybook": "9.0.9"' $BASE_DIR/packages/storybook-addon/package.json
check_result "Versão do Storybook é 9.0.9" "warning"

# Instalar dependências
print_header "Instalando dependências"
cd $BASE_DIR && pnpm install
check_result "Instalação de dependências" "critical"

# Construir pacotes
print_header "Construindo pacotes"
cd $BASE_DIR/packages/storybook-addon && pnpm build
check_result "Build do addon Storybook" "critical"

cd $BASE_DIR/packages/nuxt-module && pnpm build
check_result "Build do módulo Nuxt" "critical"

# Validar módulos de exemplo
if [ -d "$BASE_DIR/playground" ]; then
  print_header "Testando playground"
  cd $BASE_DIR/playground && pnpm dev:storybook &
  STORYBOOK_PID=$!
  
  # Aguardar inicialização do Storybook
  sleep 10
  
  # Verificar se o processo ainda está em execução
  if ps -p $STORYBOOK_PID > /dev/null; then
    echo -e "${GREEN}✓ Playground Storybook iniciado com sucesso${NC}"
    # Fazer uma requisição para verificar se o Storybook está respondendo
    curl -s http://localhost:6006 > /dev/null
    check_result "Storybook está respondendo na porta 6006" "warning"
    
    # Matar o processo do Storybook
    kill $STORYBOOK_PID
  else
    echo -e "${RED}✗ Falha ao iniciar o playground Storybook${NC}"
  fi
else
  echo -e "${YELLOW}! Diretório playground não encontrado, pulando testes de playground${NC}"
fi

# Preparar para integração com o projeto principal
print_header "Preparando para integração com o projeto Fremux"
FREMUX_DIR="/home/linux_user/fremux"

# Verificar se o diretório .storybook existe
if [ -d "$FREMUX_DIR/.storybook" ]; then
  echo -e "${GREEN}✓ Diretório .storybook encontrado no projeto Fremux${NC}"
else
  echo -e "${RED}✗ Diretório .storybook não encontrado no projeto Fremux${NC}"
fi

# Verificar configuração main.ts
if grep -q "@storybook/vue3-vite" "$FREMUX_DIR/.storybook/main.ts"; then
  echo -e "${GREEN}✓ main.ts usa @storybook/vue3-vite${NC}"
else
  echo -e "${RED}✗ main.ts não está configurado para @storybook/vue3-vite${NC}"
fi

# Verificar compatibilidade de versão
if grep -q '"storybook": "^9.0.9"' "$FREMUX_DIR/package.json"; then
  echo -e "${GREEN}✓ Projeto Fremux já está configurado para Storybook v9.0.9${NC}"
else
  echo -e "${YELLOW}! Projeto Fremux não está configurado para Storybook v9.0.9 - será necessário atualizar${NC}"
fi

print_header "Resumo da Validação"
echo -e "${YELLOW}Próximos passos:${NC}"
echo -e "1. Criar repositório GitHub para o fork"
echo -e "2. Publicar pacotes NPM como @fremux/nuxtjs-storybook e @fremux/storybook-vue-nuxt"
echo -e "3. Integrar pacotes publicados com o projeto Fremux"
echo -e "4. Testar com componentes complexos"
echo -e "5. Documentar processo de uso e migração"
echo -e "\nConsulte o arquivo VALIDATION-PLAN.md para o plano completo."

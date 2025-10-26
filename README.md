# Dashboard de Análise Jurídica

Dashboard interativo para análise e monitoramento de processos judiciais trabalhistas. Desenvolvido com Next.js, TypeScript, Tailwind CSS e Recharts.

## 📋 Visão Geral

Este projeto é um mockup funcional de um dashboard corporativo para gestores e executivos do departamento jurídico. Oferece uma visão macro dos casos com capacidade de drill-down em processos específicos para obter insights detalhados e tomar decisões estratégicas.

## 🚀 Tecnologias Utilizadas

- **Next.js 16** - Framework React com SSG (Static Site Generation)
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Estilização moderna e responsiva
- **Recharts** - Visualização de dados com gráficos interativos
- **Lucide React** - Biblioteca de ícones moderna

## 📁 Estrutura do Projeto

```
dashboard-juridico/
├── data/                          # Arquivos JSON com dados dos processos
│   ├── 0101330-43.2025.5.01.0056.json
│   ├── 0102456-78.2025.5.02.0034.json
│   └── ...
├── src/
│   ├── app/                       # Páginas do Next.js (App Router)
│   │   ├── page.tsx              # Dashboard principal
│   │   ├── layout.tsx            # Layout global
│   │   ├── globals.css           # Estilos globais
│   │   └── processo/
│   │       └── [numero]/
│   │           └── page.tsx      # Página de detalhes (dinâmica)
│   ├── components/               # Componentes reutilizáveis
│   │   ├── KpiCard.tsx          # Card de indicadores
│   │   ├── ProcessosTable.tsx   # Tabela de processos
│   │   └── Charts.tsx           # Gráficos (Barras, Pizza, Linha)
│   ├── lib/                      # Utilitários e funções auxiliares
│   │   └── processos.ts         # Leitura de dados e helpers
│   └── types/                    # Definições TypeScript
│       └── processo.ts          # Tipos do domínio
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🔧 Instalação e Execução

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Passo a Passo

1. **Navegue até o diretório do projeto:**
   ```bash
   cd dashboard-juridico
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📊 Funcionalidades

### Dashboard Principal (`/`)

- **KPIs (Indicadores-Chave):**
  - Total de processos
  - Valor total em risco
  - Distribuição de probabilidade de êxito
  - Processos de alto risco

- **Gráficos Interativos:**
  - Gráfico de barras: Processos por categoria (etiquetas)
  - Gráfico de pizza: Distribuição de risco
  - Gráfico de linha: Novos processos ao longo do tempo

- **Tabela de Processos:**
  - Ordenável por qualquer coluna
  - Campo de busca global
  - Link para detalhes de cada processo

### Página de Detalhes (`/processo/[numero]`)

- **Informações do Processo:**
  - Resumo completo (número, tipo, data, valor)
  - Etiquetas-chave do processo

- **Insights e Previsões (Destaque):**
  - Probabilidade de êxito
  - Risco financeiro total
  - Pontos de atenção para gestores

- **Informações das Partes:**
  - Dados do reclamante
  - Dados do reclamado
  - Advogados envolvidos

- **Pedidos do Processo:**
  - Tabela detalhada de todos os pedidos
  - Valores individuais e total

## 📝 Estrutura dos Dados (JSON)

Cada arquivo JSON na pasta `/data` representa um processo e segue este formato:

```json
{
  "resumo_processo": {
    "numero_processo": "0101330-43.2025.5.01.0056",
    "tipo_acao": "Ação Trabalhista - Rito Ordinário",
    "data_autuacao": "2025-10-13",
    "valor_causa": 308407.00
  },
  "etiquetas_chave": [
    "Natureza Salarial",
    "Integração Salarial"
  ],
  "partes": {
    "reclamante": {
      "nome": "FABIO VILLELA DOS SANTOS",
      "cpf_cnpj": "123.456.789-10",
      "advogados": ["Dr. Carlos Silva"]
    },
    "reclamado": {
      "nome": "COMPANHIA DOCAS DO RIO DE JANEIRO",
      "cpf_cnpj": "42.344.253/0001-11"
    }
  },
  "insights_previsoes": {
    "probabilidade_exito": "Alta",
    "risco_financeiro_reclamado": {
      "valor_total_pedidos": 308407.00
    },
    "pontos_atencao_gestores": [
      "Alto valor da causa pode impactar o orçamento"
    ]
  },
  "objeto_acao": {
    "pedidos": [
      {
        "descricao": "Horas extras não pagas",
        "valor": 150000.00
      }
    ]
  }
}
```

## 🎨 Design e UX

- Interface limpa e profissional com paleta corporativa (azul, cinza, branco)
- Design totalmente responsivo (mobile, tablet, desktop)
- Tipografia legível e espaçamento adequado
- Tooltips interativos nos gráficos
- Feedback visual em hovers e interações

## 🚢 Deploy na Vercel

Este projeto está otimizado para deploy na Vercel:

1. **Faça o build de produção:**
   ```bash
   npm run build
   ```

2. **Deploy na Vercel:**
   ```bash
   npx vercel
   ```

   Ou conecte o repositório diretamente na interface da Vercel para deploy automático.

## 📦 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção (SSG)
npm run start    # Inicia servidor de produção
npm run lint     # Executa linter (ESLint)
```

## 🔒 Segurança e Boas Práticas

- Tipagem completa com TypeScript
- Componentes React otimizados
- SSG para máxima performance
- Nenhuma dependência de banco de dados externo
- Dados estáticos carregados em tempo de build

## 📄 Licença

Projeto desenvolvido para fins de demonstração e aprendizado.

## 👨‍💻 Desenvolvido com

Next.js | React | TypeScript | Tailwind CSS | Recharts

---

**Nota:** Este é um mockup funcional. Os dados são fictícios e para fins de demonstração.

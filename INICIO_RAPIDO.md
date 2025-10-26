# 🚀 Início Rápido - Dashboard Jurídico

## ⚡ 3 Passos para Rodar o Projeto

### 1️⃣ Instalar Dependências
```bash
npm install
```
**Tempo estimado:** ~30 segundos

### 2️⃣ Rodar em Desenvolvimento
```bash
npm run dev
```
**Acesse:** http://localhost:3000

### 3️⃣ Pronto! 🎉
O dashboard está funcionando com 5 processos de exemplo.

---

## 📖 Navegação Rápida

### Dashboard Principal
- **URL:** http://localhost:3000
- **O que ver:**
  - 4 KPIs no topo
  - 3 gráficos interativos
  - Tabela com todos os processos
  - Campo de busca

### Página de Detalhes
- **Como acessar:** Clique em "Ver Detalhes" em qualquer processo
- **O que ver:**
  - Resumo completo do processo
  - Insights e previsões destacados
  - Informações das partes
  - Tabela de pedidos

---

## 🎯 Recursos Principais

### ✅ O que você pode fazer agora:

1. **Visualizar dados consolidados**
   - Ver todos os processos de uma vez
   - Entender a distribuição de risco
   - Acompanhar tendências temporais

2. **Filtrar e ordenar**
   - Use o campo de busca para filtrar
   - Clique nas colunas para ordenar

3. **Ver detalhes**
   - Clique em qualquer processo
   - Veja todas as informações detalhadas
   - Leia os pontos de atenção

4. **Interagir com gráficos**
   - Passe o mouse sobre as barras
   - Veja tooltips com informações extras

---

## 🔧 Comandos Úteis

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build de produção
npm run build

# Rodar em produção
npm start

# Verificar código (linter)
npm run lint
```

---

## 📁 Adicionar Novo Processo

### Opção 1: Copiar e Editar
```bash
# 1. Copie um arquivo existente
cp data/0101330-43.2025.5.01.0056.json data/SEU-NUMERO.json

# 2. Edite o arquivo com seus dados
# 3. Rebuild
npm run build
```

### Opção 2: Criar do Zero
Siga o template em `CONTRIBUINDO.md`

---

## 🎨 Personalização Rápida

### Mudar Cores
Edite: `tailwind.config.ts`
```typescript
colors: {
  primary: {
    500: '#SUA-COR-AQUI'
  }
}
```

### Adicionar KPI
Edite: `src/app/page.tsx`
```tsx
<KpiCard
  title="Novo KPI"
  value={seuCalculo}
  icon={SeuIcone}
/>
```

### Novo Gráfico
Edite: `src/components/Charts.tsx`

---

## 📊 Entendendo os Dados

### Probabilidade de Êxito
- **Alta** 🟢 = Alta chance do reclamante ganhar (alto risco para empresa)
- **Média** 🟡 = Chance intermediária
- **Baixa** 🔴 = Baixa chance do reclamante ganhar (baixo risco)

### Valor em Risco
Soma de todos os valores de pedidos de todos os processos.

### Etiquetas
Palavras-chave que categorizam o tipo de ação.

---

## 🚀 Deploy na Vercel

### Método 1: CLI
```bash
npm i -g vercel
vercel
```

### Método 2: GitHub
1. Push para GitHub
2. Conecte no site da Vercel
3. Deploy automático!

**URL final:** `https://seu-projeto.vercel.app`

---

## ❓ Resolução Rápida de Problemas

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Ou use outra porta
PORT=3001 npm run dev
```

### Build falha
```bash
# Limpe o cache
rm -rf .next
npm run build
```

### Dados não aparecem
1. Verifique se há arquivos JSON em `/data`
2. Valide o JSON em https://jsonlint.com
3. Rebuilde: `npm run build`

---

## 📚 Próximos Passos

1. **Explore a documentação completa:** `README.md`
2. **Aprenda a adicionar processos:** `CONTRIBUINDO.md`
3. **Veja estatísticas do projeto:** `ESTATISTICAS.md`
4. **Faça o checklist:** `VERIFICACAO.md`

---

## 💡 Dicas Pro

### Desenvolvimento
- Use `npm run dev` para ver mudanças em tempo real
- O TypeScript vai alertar sobre erros antes de compilar
- Tailwind classes são autocompletas no VS Code

### Produção
- Sempre faça `npm run build` antes de deploy
- Verifique se todas as páginas foram geradas
- Teste localmente com `npm start`

### Performance
- SSG já está configurado (super rápido!)
- Imagens seriam otimizadas automaticamente (se adicionar)
- Cache automático do Next.js

---

## 🎓 Recursos de Aprendizado

### Next.js
- https://nextjs.org/docs
- https://nextjs.org/learn

### React
- https://react.dev

### TypeScript
- https://www.typescriptlang.org/docs

### Tailwind CSS
- https://tailwindcss.com/docs

### Recharts
- https://recharts.org/en-US

---

## 🎉 Você está pronto!

O projeto está **100% funcional** e pronto para uso.

**Bom desenvolvimento!** 🚀

---

**Precisa de ajuda?** Consulte os outros arquivos de documentação:
- `README.md` - Visão geral completa
- `CONTRIBUINDO.md` - Como adicionar dados
- `VERIFICACAO.md` - Checklist completo
- `ESTATISTICAS.md` - Métricas do projeto

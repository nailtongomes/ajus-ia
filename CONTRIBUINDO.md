# Guia de Contribuição - Dashboard Jurídico

## Como Adicionar Novos Processos

Para adicionar novos processos ao dashboard, basta criar arquivos JSON na pasta `/data` seguindo o padrão estabelecido.

### Estrutura do Arquivo JSON

Cada processo deve ter seu próprio arquivo JSON nomeado com o número do processo:

**Formato do nome:** `{numero-do-processo}.json`

**Exemplo:** `0101330-43.2025.5.01.0056.json`

### Template Completo

```json
{
  "resumo_processo": {
    "numero_processo": "0000000-00.0000.0.00.0000",
    "tipo_acao": "Tipo da ação trabalhista",
    "data_autuacao": "YYYY-MM-DD",
    "valor_causa": 0.00
  },
  "etiquetas_chave": [
    "Etiqueta 1",
    "Etiqueta 2",
    "Etiqueta 3"
  ],
  "partes": {
    "reclamante": {
      "nome": "NOME DO RECLAMANTE",
      "cpf_cnpj": "000.000.000-00",
      "advogados": ["Dr. Nome Advogado"]
    },
    "reclamado": {
      "nome": "NOME DO RECLAMADO",
      "cpf_cnpj": "00.000.000/0001-00",
      "advogados": ["Dra. Nome Advogada"]
    }
  },
  "insights_previsoes": {
    "probabilidade_exito": "Alta",
    "risco_financeiro_reclamado": {
      "valor_total_pedidos": 0.00
    },
    "pontos_atencao_gestores": [
      "Ponto de atenção 1",
      "Ponto de atenção 2"
    ]
  },
  "objeto_acao": {
    "pedidos": [
      {
        "descricao": "Descrição do pedido",
        "valor": 0.00
      }
    ]
  }
}
```

### Campos Obrigatórios

#### resumo_processo
- `numero_processo` (string): Número único do processo
- `tipo_acao` (string): Tipo de ação trabalhista
- `data_autuacao` (string): Data no formato YYYY-MM-DD
- `valor_causa` (number): Valor da causa em reais

#### etiquetas_chave
- Array de strings com palavras-chave relacionadas ao processo

#### partes
- `reclamante.nome` (string): Nome do reclamante
- `reclamado.nome` (string): Nome do reclamado

#### insights_previsoes
- `probabilidade_exito` (string): Deve ser **exatamente** um dos valores:
  - `"Alta"`
  - `"Média"`
  - `"Baixa"`
- `risco_financeiro_reclamado.valor_total_pedidos` (number): Valor total em risco

### Campos Opcionais

- `partes.reclamante.cpf_cnpj` (string)
- `partes.reclamante.advogados` (array de strings)
- `partes.reclamado.cpf_cnpj` (string)
- `partes.reclamado.advogados` (array de strings)
- `insights_previsoes.pontos_atencao_gestores` (array de strings)
- `objeto_acao.pedidos` (array de objetos com `descricao` e `valor`)

### Exemplo Prático

```json
{
  "resumo_processo": {
    "numero_processo": "0106789-12.2025.5.06.0067",
    "tipo_acao": "Ação Trabalhista - Horas Extras",
    "data_autuacao": "2025-05-20",
    "valor_causa": 95000.00
  },
  "etiquetas_chave": [
    "Horas Extras",
    "Banco de Horas",
    "Adicional Noturno"
  ],
  "partes": {
    "reclamante": {
      "nome": "CARLOS EDUARDO LIMA",
      "cpf_cnpj": "111.222.333-44",
      "advogados": ["Dr. Marcelo Santos"]
    },
    "reclamado": {
      "nome": "TRANSPORTADORA XYZ LTDA",
      "cpf_cnpj": "99.888.777/0001-66",
      "advogados": ["Dra. Amanda Silva"]
    }
  },
  "insights_previsoes": {
    "probabilidade_exito": "Média",
    "risco_financeiro_reclamado": {
      "valor_total_pedidos": 95000.00
    },
    "pontos_atencao_gestores": [
      "Verificar controle de ponto dos últimos 2 anos",
      "Analisar acordo de compensação de horas"
    ]
  },
  "objeto_acao": {
    "pedidos": [
      {
        "descricao": "Horas extras não pagas",
        "valor": 60000.00
      },
      {
        "descricao": "Adicional noturno",
        "valor": 35000.00
      }
    ]
  }
}
```

## Rebuild do Projeto

Após adicionar novos arquivos JSON, execute:

```bash
npm run build
```

O Next.js irá automaticamente:
1. Ler todos os arquivos na pasta `/data`
2. Gerar páginas estáticas para cada processo
3. Atualizar os gráficos e KPIs do dashboard

## Dicas

- **Validação**: Certifique-se de que o JSON está válido (use um validador JSON online)
- **Nomenclatura**: Use sempre o número do processo como nome do arquivo
- **Datas**: Formato ISO 8601 (YYYY-MM-DD)
- **Probabilidade**: Escreva exatamente como mostrado (com acento)
- **Valores**: Use ponto como separador decimal (não vírgula)

## Estrutura de Etiquetas Comuns

Aqui estão algumas etiquetas comuns que você pode usar:

- Horas Extras
- Verbas Rescisórias
- Acidente de Trabalho
- Assédio Moral
- Discriminação
- Equiparação Salarial
- Adicional Noturno
- Insalubridade
- Periculosidade
- Estabilidade
- FGTS
- INSS
- Férias Proporcionais
- 13º Salário
- Aviso Prévio
- Danos Morais
- Danos Materiais
- Rescisão Indireta

## Troubleshooting

### Processo não aparece no dashboard
1. Verifique se o arquivo JSON está na pasta `/data`
2. Confirme que o JSON é válido
3. Execute `npm run build` novamente

### Erro de build
1. Verifique se `probabilidade_exito` tem um dos três valores válidos
2. Confirme que todos os campos obrigatórios estão presentes
3. Verifique se os valores numéricos não têm vírgulas

### Página de detalhes retorna 404
- Certifique-se de que o nome do arquivo corresponde exatamente ao `numero_processo`

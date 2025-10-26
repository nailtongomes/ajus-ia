export type ClassificacaoRisco = "alto" | "medio" | "baixo";
export type FaseProcesso = "inicial" | "contestacao" | "instrucao" | "sentenca" | "recurso";
export type CriticidadePrazo = "alta" | "media" | "baixa";
export type EstrategiaPrincipal = "acordo_judicial" | "defesa_total" | "defesa_parcial";

export interface Advogado {
  nome: string;
  oab: string;
  taxa_sucesso_historica: number;
}

export interface Processo {
  processo: {
    numero: string;
    tipo: string;
    subtipo: string;
    fase_atual: FaseProcesso;
    data_distribuicao: string;
    prazo_proximo: {
      tipo: string;
      data_limite: string;
      dias_restantes: number;
      criticidade: CriticidadePrazo;
    };
    vara: {
      codigo: string;
      nome: string;
      juiz: string;
    };
  };
  partes: {
    autor: {
      nome: string;
      cpf_cnpj: string;
      tipo: string;
      tempo_casa: number;
      cargo: string;
      area: string;
      historico_processos: number;
      advogados: Advogado[];
    };
    reu: {
      nome: string;
      cnpj: string;
      advogados: Advogado[];
    };
  };
  analise_risco: {
    score_risco: number;
    classificacao: ClassificacaoRisco;
    probabilidade_perda: {
      total: number;
      parcial: number;
      procedencia: number;
    };
    confianca_predicao: number;
    fatores_risco: {
      fator: string;
      impacto: string;
      peso: number;
      evidencias: string[];
    }[];
    jurisprudencia: {
      casos_similares_analisados: number;
      taxa_procedencia: number;
      tribunal: string;
      periodo_analise: string;
      casos_referencia: {
        numero: string;
        resultado: string;
        similaridade: number;
        url: string;
      }[];
    };
  };
  analise_financeira: {
    valor_causa: number;
    moeda: string;
    exposicao_total: {
      pessimista: number;
      realista: number;
      otimista: number;
    };
    provisao_recomendada: {
      valor: number;
      percentual_causa: number;
      justificativa: string;
      revisao_proxima: string;
    };
    breakdown_pedidos: {
      item: string;
      valor_pedido: number;
      probabilidade_procedencia: number;
      valor_esperado: number;
      categoria: string;
      fundamentacao: string;
    }[];
    custos_defesa: {
      honorarios_internos: number;
      honorarios_externos: number;
      custas_processuais: number;
      pericia: number;
      outros: number;
      total: number;
    };
    impacto_orcamento: {
      centro_custo: string;
      percentual_orcamento_anual: number;
      necessita_aprovacao_especial: boolean;
    };
  };
  recomendacoes_estrategicas: {
    estrategia_principal: EstrategiaPrincipal;
    justificativa_estrategia: string;
    acoes_imediatas: {
      acao: string;
      prazo: string;
      responsavel_sugerido?: string;
      responsavel?: string;
      prioridade: string;
      complexidade: string;
      criticidade?: string;
      tempo_estimado: string;
    }[];
    acordo?: {
      recomenda?: boolean;
      momento_ideal?: string;
      faixa_valor?: {
        minimo: number;
        maximo: number;
        ideal: number;
      };
      valor_sugerido_min?: number;
      valor_sugerido_max?: number;
      condicoes_sugeridas?: string[];
      condicoes?: string[];
      vantagens: string[];
      desvantagens: string[];
    };
    defesa: {
      teses_principais: {
        tese: string;
        fundamentacao_legal: string;
        probabilidade_sucesso: number;
        precedentes: string[];
      }[];
      provas_necessarias: {
        tipo: string;
        descricao: string;
        disponibilidade: string;
        criticidade: string;
      }[];
    };
    preventivas: {
      recomendacoes: {
        area_afetada: string;
        medida: string;
        prazo_implementacao: string;
        custo_estimado: number;
        roi_esperado: string;
      }[];
    };
  };
  analise_operacional: {
    areas_envolvidas: string[];
    impacto_reputacional: string;
    risco_precedente: {
      nivel: string;
      casos_similares_potenciais: number;
      exposicao_estimada: number;
    };
    necessita_comunicacao: {
      diretoria: boolean;
      rh: boolean;
      comunicacao: boolean;
      auditoria: boolean;
    };
  };
  timeline_predicoes: {
    duracao_estimada: {
      minima_meses: number;
      media_meses: number;
      maxima_meses: number;
    };
    marcos_futuros: {
      evento: string;
      data_prevista: string;
      probabilidade: number;
      impacto_estrategia: string;
    }[];
  };
  tags_inteligentes: {
    categoria: string;
    valor: string;
    cor: string;
  }[];
  metadata: {
    versao_analise: string;
    data_analise: string;
    modelo_ia: {
      nome: string;
      versao: string;
      acuracia_geral: number;
    };
    analista_responsavel: string;
    revisao_humana: {
      realizada: boolean;
      data: string | null;
      aprovador: string | null;
      ajustes: string;
    };
    hash_documento: string;
  };
}

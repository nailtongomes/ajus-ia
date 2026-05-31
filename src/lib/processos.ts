import 'server-only';
import fs from 'fs';
import path from 'path';
import { Processo } from '@/types/processo';
import { toSafeNumber } from './utils';

const DATA_DIR = path.join(process.cwd(), 'data');

export function getAllProcessos(): Processo[] {
  const files = fs.readdirSync(DATA_DIR);
  const processos: Processo[] = [];

  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(DATA_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const processo = JSON.parse(fileContent) as Processo;
      processos.push(processo);
    }
  });

  // Ordenar por score de risco (maior primeiro)
  return processos.sort((a, b) => b.analise_risco.score_risco - a.analise_risco.score_risco);
}

export function getProcessoByNumero(numero: string): Processo | null {
  const files = fs.readdirSync(DATA_DIR);

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(DATA_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const processo = JSON.parse(fileContent) as Processo;

      if (processo.processo.numero === numero) {
        return processo;
      }
    }
  }

  return null;
}

// Funções utilitárias de análise
export function getTotalExposicaoFinanceira(processos: Processo[]): number {
  return processos.reduce((acc, p) => acc + toSafeNumber(p.analise_financeira.exposicao_total.realista), 0);
}

export function getTotalProvisaoRecomendada(processos: Processo[]): number {
  return processos.reduce((acc, p) => acc + toSafeNumber(p.analise_financeira.provisao_recomendada.valor), 0);
}

export function getProcessosPorRisco(processos: Processo[]) {
  /**
   * Consolida classificações estendidas em 3 faixas para manter consistência dos
   * indicadores comparativos do dashboard (alto/médio/baixo).
   */
  const normalizeClassificacao = (classificacao: string) => {
    if (classificacao === 'muito_alto') return 'alto';
    if (classificacao === 'muito_baixo') return 'baixo';
    if (classificacao === 'alto' || classificacao === 'medio' || classificacao === 'baixo') return classificacao;
    return 'medio';
  };

  return {
    alto: processos.filter(p => normalizeClassificacao(p.analise_risco.classificacao) === 'alto').length,
    medio: processos.filter(p => normalizeClassificacao(p.analise_risco.classificacao) === 'medio').length,
    baixo: processos.filter(p => normalizeClassificacao(p.analise_risco.classificacao) === 'baixo').length,
  };
}

export function getProcessosComPrazosCriticos(processos: Processo[]): Processo[] {
  return processos.filter(p => toSafeNumber(p.processo.prazo_proximo.dias_restantes, Number.MAX_SAFE_INTEGER) <= 15);
}

export function getAreasComMaisProcessos(processos: Processo[]): { area: string; count: number }[] {
  const areasCount = processos.reduce((acc, p) => {
    const area = p.partes.autor.area?.trim() || 'Não informado';
    acc[area] = (acc[area] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(areasCount)
    .map(([area, count]) => ({ area, count }))
    .sort((a, b) => b.count - a.count);
}

export function getTemasRecorrentes(processos: Processo[]): { tema: string; count: number }[] {
  const temasCount: Record<string, number> = {};

  processos.forEach(p => {
    p.tags_inteligentes
      .filter(tag => tag.categoria === 'tema')
      .forEach(tag => {
        temasCount[tag.valor] = (temasCount[tag.valor] || 0) + 1;
      });
  });

  return Object.entries(temasCount)
    .map(([tema, count]) => ({ tema, count }))
    .sort((a, b) => b.count - a.count);
}

// Re-exportar funções utilitárias
export {
  formatCurrency,
  formatDate,
  formatNumber,
  formatPercent,
  toSafeNumber,
  getRiscoColor,
  getCriticidadeColor,
  getDiasRestantesColor,
  formatDiasRestantes,
  calcularTempoEmAnos
} from './utils';

import { ClassificacaoRisco, CriticidadePrazo } from '@/types/processo';

function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function toSafeNumber(value: unknown, fallback = 0): number {
  return isValidNumber(value) ? value : fallback;
}

export function formatCurrency(value: number | null | undefined): string {
  if (!isValidNumber(value)) {
    return '—';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return '—';
  }
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

export function formatNumber(value: number | null | undefined): string {
  if (!isValidNumber(value)) {
    return '0';
  }
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatPercent(value: number | null | undefined): string {
  if (!isValidNumber(value)) {
    return '—';
  }
  return `${value.toFixed(1)}%`;
}

export function getRiscoColor(classificacao: ClassificacaoRisco | string): string {
  switch (classificacao) {
    case 'muito_alto':
    case 'alto':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medio':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'muito_baixo':
    case 'baixo':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export function getCriticidadeColor(criticidade: CriticidadePrazo | string): string {
  switch (criticidade) {
    case 'alta':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'media':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'baixa':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export function getDiasRestantesColor(dias: number | null | undefined): string {
  if (!isValidNumber(dias)) return 'text-gray-500';
  if (dias <= 7) return 'text-red-600 font-bold';
  if (dias <= 15) return 'text-yellow-600 font-semibold';
  return 'text-gray-600';
}

export function formatDiasRestantes(dias: number | null | undefined): string {
  if (!isValidNumber(dias)) return 'Sem prazo';
  if (dias === 0) return 'Hoje';
  if (dias === 1) return 'Amanhã';
  if (dias < 0) return `Atrasado ${Math.abs(dias)} dias`;
  return `${dias} dias`;
}

export function calcularTempoEmAnos(dias: number | null | undefined): number {
  if (!isValidNumber(dias)) return 0;
  return Math.floor(dias / 365);
}

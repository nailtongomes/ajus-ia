import { ClassificacaoRisco, CriticidadePrazo } from '@/types/processo';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function getRiscoColor(classificacao: ClassificacaoRisco): string {
  switch (classificacao) {
    case 'alto':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medio':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'baixo':
      return 'bg-green-100 text-green-800 border-green-200';
  }
}

export function getCriticidadeColor(criticidade: CriticidadePrazo): string {
  switch (criticidade) {
    case 'alta':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'media':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'baixa':
      return 'bg-green-100 text-green-800 border-green-200';
  }
}

export function getDiasRestantesColor(dias: number): string {
  if (dias <= 7) return 'text-red-600 font-bold';
  if (dias <= 15) return 'text-yellow-600 font-semibold';
  return 'text-gray-600';
}

export function formatDiasRestantes(dias: number): string {
  if (dias === 0) return 'Hoje';
  if (dias === 1) return 'Amanhã';
  if (dias < 0) return `Atrasado ${Math.abs(dias)} dias`;
  return `${dias} dias`;
}

export function calcularTempoEmAnos(dias: number): number {
  return Math.floor(dias / 365);
}

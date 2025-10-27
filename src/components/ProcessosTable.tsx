'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Processo } from '@/types/processo';
import { formatCurrency, formatDate, getRiscoColor, getDiasRestantesColor, formatDiasRestantes } from '@/lib/utils';
import { Eye, ArrowUpDown, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

interface ProcessosTableProps {
  processos: Processo[];
}

type SortKey = 'numero' | 'autor' | 'score' | 'exposicao' | 'prazo' | 'fase';

export default function ProcessosTable({ processos }: ProcessosTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [riscoFilter, setRiscoFilter] = useState<string>('todos');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const filteredProcessos = processos.filter(p => {
    const matchesSearch =
      p.processo.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.partes.autor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.partes.autor.cargo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisco = riscoFilter === 'todos' || p.analise_risco.classificacao === riscoFilter;

    return matchesSearch && matchesRisco;
  });

  const sortedProcessos = [...filteredProcessos].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortKey) {
      case 'numero':
        aValue = a.processo.numero;
        bValue = b.processo.numero;
        break;
      case 'autor':
        aValue = a.partes.autor.nome;
        bValue = b.partes.autor.nome;
        break;
      case 'score':
        aValue = a.analise_risco.score_risco;
        bValue = b.analise_risco.score_risco;
        break;
      case 'exposicao':
        aValue = a.analise_financeira.exposicao_total.realista;
        bValue = b.analise_financeira.exposicao_total.realista;
        break;
      case 'prazo':
        aValue = a.processo.prazo_proximo.dias_restantes;
        bValue = b.processo.prazo_proximo.dias_restantes;
        break;
      case 'fase':
        aValue = a.processo.fase_atual;
        bValue = b.processo.fase_atual;
        break;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-[0_35px_70px_-45px_rgba(15,23,42,0.55)] backdrop-blur-xl">
      {/* Filtros */}
      <div className="space-y-4 border-b border-white/60 bg-white/60 p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar por número, autor ou cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/60 hover:shadow-md"
          />
          <select
            value={riscoFilter}
            onChange={(e) => setRiscoFilter(e.target.value)}
            className="rounded-2xl border border-white/60 bg-white/80 px-6 py-3 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/60 hover:shadow-md"
          >
            <option value="todos">Todos os Riscos</option>
            <option value="alto">Risco Alto</option>
            <option value="medio">Risco Médio</option>
            <option value="baixo">Risco Baixo</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            Exibindo {sortedProcessos.length} de {processos.length} processos
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/60 bg-slate-50/80 text-slate-600 backdrop-blur">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('numero')}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors duration-200 hover:text-blue-600"
                >
                  Processo
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('autor')}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors duration-200 hover:text-blue-600"
                >
                  Autor/Cargo
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('score')}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors duration-200 hover:text-blue-600"
                >
                  Score Risco
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('exposicao')}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors duration-200 hover:text-blue-600"
                >
                  Exposição
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Prob. Perda
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('prazo')}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors duration-200 hover:text-blue-600"
                >
                  Próximo Prazo
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('fase')}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors duration-200 hover:text-blue-600"
                >
                  Fase
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                Ação
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/40 bg-white/80 backdrop-blur">
            {sortedProcessos.map((processo) => (
              <tr key={processo.processo.numero} className="group transition-all duration-200 hover:bg-blue-50/60">
                <td className="px-6 py-5 text-sm">
                  <div className="font-bold text-slate-900 transition-colors group-hover:text-blue-700">{processo.processo.numero}</div>
                  <div className="mt-1 text-xs text-slate-500">{formatDate(processo.processo.data_distribuicao)}</div>
                </td>
                <td className="px-6 py-5 text-sm">
                  <div className="font-semibold text-slate-900">{processo.partes.autor.nome}</div>
                  <div className="mt-1 text-xs text-slate-600">{processo.partes.autor.cargo}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{processo.partes.autor.area}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 ${getRiscoColor(processo.analise_risco.classificacao)} shadow-sm`}>
                      {processo.analise_risco.score_risco}
                    </span>
                    {processo.analise_risco.score_risco >= 80 && (
                      <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 text-sm">
                  <div className="font-bold text-slate-900">
                    {formatCurrency(processo.analise_financeira.exposicao_total.realista)}
                  </div>
                  <div className="mt-1 text-xs text-slate-600">
                    Provisão: {formatCurrency(processo.analise_financeira.provisao_recomendada.valor)}
                  </div>
                </td>
                <td className="px-6 py-5 text-sm">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-slate-600">Total:</span>
                      <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">{processo.analise_risco.probabilidade_perda.total.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-slate-600">Parcial:</span>
                      <span className="text-xs font-bold text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">{processo.analise_risco.probabilidade_perda.parcial.toFixed(1)}%</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className={`font-bold ${getDiasRestantesColor(processo.processo.prazo_proximo.dias_restantes)}`}>
                        {formatDiasRestantes(processo.processo.prazo_proximo.dias_restantes)}
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">{processo.processo.prazo_proximo.tipo}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 rounded-lg text-xs font-bold border border-blue-200">
                    {processo.processo.fase_atual}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm">
                  <Link
                    href={`/processo/${encodeURIComponent(processo.processo.numero)}`}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-bold text-blue-600 transition-all duration-200 hover:bg-blue-50/70 hover:text-blue-700"
                  >
                    <Eye size={16} />
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sortedProcessos.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            <FileText className="mx-auto mb-3 h-12 w-12 text-slate-400" />
            <p>Nenhum processo encontrado</p>
          </div>
        )}
      </div>

      {/* Paginação placeholder */}
      {sortedProcessos.length > 0 && (
        <div className="border-t border-white/60 bg-white/60 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              Total de processos: <span className="text-blue-600">{sortedProcessos.length}</span>
            </div>
            <div className="rounded-lg border border-white/60 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600">
              Ordenado por: <span className="text-blue-600">{sortKey === 'score' ? 'Score de Risco' :
                           sortKey === 'exposicao' ? 'Exposição Financeira' :
                           sortKey === 'prazo' ? 'Próximo Prazo' :
                           sortKey === 'autor' ? 'Nome do Autor' :
                           sortKey === 'fase' ? 'Fase Processual' : 'Número do Processo'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FileText({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

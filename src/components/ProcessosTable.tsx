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
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Filtros */}
      <div className="p-6 border-b border-gray-100 space-y-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar por número, autor ou cargo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          />
          <select
            value={riscoFilter}
            onChange={(e) => setRiscoFilter(e.target.value)}
            className="px-6 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md bg-white font-medium text-gray-700"
          >
            <option value="todos">Todos os Riscos</option>
            <option value="alto">Risco Alto</option>
            <option value="medio">Risco Médio</option>
            <option value="baixo">Risco Baixo</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Exibindo {sortedProcessos.length} de {processos.length} processos
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('numero')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600 transition-colors duration-200"
                >
                  Processo
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('autor')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600 transition-colors duration-200"
                >
                  Autor/Cargo
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('score')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600 transition-colors duration-200"
                >
                  Score Risco
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('exposicao')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600 transition-colors duration-200"
                >
                  Exposição
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Prob. Perda
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('prazo')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600 transition-colors duration-200"
                >
                  Próximo Prazo
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('fase')}
                  className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider hover:text-blue-600 transition-colors duration-200"
                >
                  Fase
                  <ArrowUpDown size={14} className="text-gray-400" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Ação
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sortedProcessos.map((processo) => (
              <tr key={processo.processo.numero} className="hover:bg-blue-50/30 transition-all duration-200 group">
                <td className="px-6 py-5 text-sm">
                  <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{processo.processo.numero}</div>
                  <div className="text-xs text-gray-500 mt-1">{formatDate(processo.processo.data_distribuicao)}</div>
                </td>
                <td className="px-6 py-5 text-sm">
                  <div className="font-semibold text-gray-900">{processo.partes.autor.nome}</div>
                  <div className="text-xs text-gray-600 mt-1">{processo.partes.autor.cargo}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{processo.partes.autor.area}</div>
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
                  <div className="font-bold text-gray-900">
                    {formatCurrency(processo.analise_financeira.exposicao_total.realista)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Provisão: {formatCurrency(processo.analise_financeira.provisao_recomendada.valor)}
                  </div>
                </td>
                <td className="px-6 py-5 text-sm">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-gray-600">Total:</span>
                      <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">{processo.analise_risco.probabilidade_perda.total.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-gray-600">Parcial:</span>
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
                      <div className="text-xs text-gray-500 mt-0.5">{processo.processo.prazo_proximo.tipo}</div>
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
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200"
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
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Nenhum processo encontrado</p>
          </div>
        )}
      </div>

      {/* Paginação placeholder */}
      {sortedProcessos.length > 0 && (
        <div className="px-6 py-4 border-t-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Total de processos: <span className="text-blue-600">{sortedProcessos.length}</span>
            </div>
            <div className="text-xs font-semibold text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
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

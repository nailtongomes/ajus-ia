import React from 'react';
import Link from 'next/link';
import { getProcessoByNumero, getAllProcessos, formatCurrency, formatDate, formatPercent, getRiscoColor, calcularTempoEmAnos, toSafeNumber } from '@/lib/processos';
import { ArrowLeft, AlertCircle, Users, FileText, DollarSign, AlertTriangle, Shield, Target, Calendar, Clock, Lightbulb, CheckCircle, XCircle, Info } from 'lucide-react';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    numero: string;
  }>;
}

export async function generateStaticParams() {
  const processos = getAllProcessos();
  return processos.map((processo) => ({
    numero: processo.processo.numero,
  }));
}

export default async function ProcessoDetailPage({ params }: PageProps) {
  const { numero } = await params;
  const processo = getProcessoByNumero(numero);

  if (!processo) {
    notFound();
  }

  const tempoEmAnos = calcularTempoEmAnos(processo.partes.autor.tempo_casa);
  const diasRestantesPrazo = toSafeNumber(processo.processo.prazo_proximo.dias_restantes, Number.MAX_SAFE_INTEGER);
  const autorNome = processo.partes.autor.nome || 'Não informado';
  const autorCpf = processo.partes.autor.cpf_cnpj || 'Não informado';
  const autorCargo = processo.partes.autor.cargo || 'Não informado';
  const autorArea = processo.partes.autor.area || 'Não informado';
  const reuNome = processo.partes.reu.nome || 'Não informado';
  const reuCnpj = processo.partes.reu.cnpj || 'Não informado';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Processo {processo.processo.numero}
          </h1>
          <div className="flex items-center gap-4 text-blue-100">
            <span>{processo.processo.tipo} - {processo.processo.subtipo}</span>
            <span>•</span>
            <span>Distribuído em {formatDate(processo.processo.data_distribuicao)}</span>
            <span>•</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiscoColor(processo.analise_risco.classificacao)} bg-opacity-90`}>
              {processo.analise_risco.classificacao.toUpperCase()} RISCO
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerta de Prazo Crítico */}
        {diasRestantesPrazo <= 7 && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-900 font-semibold">Prazo Crítico!</h3>
                <p className="text-red-700 mt-1">
                  {processo.processo.prazo_proximo.tipo || 'Prazo processual'} vence em {diasRestantesPrazo} dia(s) - {formatDate(processo.processo.prazo_proximo.data_limite)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KPIs do Processo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Score de Risco</h3>
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{processo.analise_risco.score_risco}</p>
            <p className="text-xs text-gray-500 mt-1">Confiança: {formatPercent(processo.analise_risco.confianca_predicao)}</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Exposição Realista</h3>
              <DollarSign className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(processo.analise_financeira.exposicao_total.realista)}</p>
            <p className="text-xs text-gray-500 mt-1">Valor da causa: {formatCurrency(processo.analise_financeira.valor_causa)}</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Prob. Perda Parcial</h3>
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatPercent(processo.analise_risco.probabilidade_perda.parcial)}</p>
            <p className="text-xs text-gray-500 mt-1">Total: {formatPercent(processo.analise_risco.probabilidade_perda.total)}</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Provisão Recomendada</h3>
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(processo.analise_financeira.provisao_recomendada.valor)}</p>
            <p className="text-xs text-gray-500 mt-1">{formatPercent(processo.analise_financeira.provisao_recomendada.percentual_causa)} da causa</p>
          </div>
        </div>

        {/* Estratégia Recomendada - Destaque */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-8 border-2 border-blue-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Lightbulb className="text-yellow-600" size={28} />
            Estratégia Recomendada
          </h2>
          <div className="bg-white bg-opacity-70 rounded-lg p-6">
            <p className="text-lg font-semibold text-blue-900 mb-2">
              {processo.recomendacoes_estrategicas.estrategia_principal.replace('_', ' ').toUpperCase()}
            </p>
            <p className="text-gray-700">{processo.recomendacoes_estrategicas.justificativa_estrategia}</p>
          </div>
        </div>

        {/* Partes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="text-blue-600" size={20} />
              Autor (Reclamante)
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Nome</p>
                <p className="font-semibold text-gray-900">{autorNome}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-600">CPF</p>
                  <p className="font-medium text-gray-900">{autorCpf}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tempo de Casa</p>
                  <p className="font-medium text-gray-900">{tempoEmAnos > 0 ? `${tempoEmAnos} anos` : 'Não informado'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cargo</p>
                <p className="font-medium text-gray-900">{autorCargo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Área</p>
                <p className="font-medium text-gray-900">{autorArea}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="text-red-600" size={20} />
              Réu (Reclamado)
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Nome</p>
                <p className="font-semibold text-gray-900">{reuNome}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CNPJ</p>
                <p className="font-medium text-gray-900">{reuCnpj}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo Simples - Info */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações do Processo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Vara</p>
              <p className="font-medium text-gray-900">{processo.processo.vara.nome}</p>
            </div>
            <div>
              <p className="text-gray-600">Fase Atual</p>
              <p className="font-medium text-gray-900">{processo.processo.fase_atual}</p>
            </div>
            <div>
              <p className="text-gray-600">Próximo Prazo</p>
              <p className="font-medium text-gray-900">{processo.processo.prazo_proximo.tipo || 'Não informado'} - {formatDate(processo.processo.prazo_proximo.data_limite)}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags do Processo</h2>
          <div className="flex flex-wrap gap-2">
            {processo.tags_inteligentes.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${tag.cor}20`,
                  color: tag.cor,
                  borderColor: tag.cor,
                  borderWidth: '1px',
                }}
              >
                {tag.categoria.toUpperCase()}: {tag.valor}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

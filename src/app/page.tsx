import React from 'react';
import {
  getAllProcessos,
  formatCurrency,
  formatNumber,
  formatPercent,
  getTotalExposicaoFinanceira,
  getTotalProvisaoRecomendada,
  getProcessosPorRisco,
  getProcessosComPrazosCriticos,
  getAreasComMaisProcessos,
  getTemasRecorrentes,
} from '@/lib/processos';
import KpiCard from '@/components/KpiCard';
import ProcessosTable from '@/components/ProcessosTable';
import {
  DistribuicaoRiscoChart,
  ExposicaoFinanceiraChart,
  TemasRecorrentesChart,
  AreasAfetadasChart,
  ProbabilidadePerdaChart,
  RiscoExposicaoChart,
} from '@/components/Charts';
import {
  FileText,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Clock,
  Shield,
  Target,
  BarChart3,
} from 'lucide-react';

export default function HomePage() {
  const processos = getAllProcessos();

  // KPIs Principais
  const totalProcessos = processos.length;
  const exposicaoTotal = getTotalExposicaoFinanceira(processos);
  const provisaoTotal = getTotalProvisaoRecomendada(processos);
  const processosPorRisco = getProcessosPorRisco(processos);
  const processosPrazosCriticos = getProcessosComPrazosCriticos(processos);

  // Probabilidade média de perda
  const probMediaPerda = processos.reduce((acc, p) => acc + p.analise_risco.probabilidade_perda.parcial, 0) / processos.length;

  // Score médio de risco
  const scoreMediaRisco = processos.reduce((acc, p) => acc + p.analise_risco.score_risco, 0) / processos.length;

  // Dados para gráficos
  const riscoData = [
    { name: 'Risco Alto', value: processosPorRisco.alto },
    { name: 'Risco Médio', value: processosPorRisco.medio },
    { name: 'Risco Baixo', value: processosPorRisco.baixo },
  ];

  const exposicaoData = processos
    .sort((a, b) => b.analise_financeira.exposicao_total.realista - a.analise_financeira.exposicao_total.realista)
    .slice(0, 10)
    .map(p => ({
      name: p.processo.numero.split('.')[0].slice(-4),
      value: p.analise_financeira.exposicao_total.realista,
    }));

  const temasData = getTemasRecorrentes(processos).slice(0, 6).map(t => ({
    name: t.tema.length > 30 ? t.tema.substring(0, 27) + '...' : t.tema,
    value: t.count,
  }));

  const areasData = getAreasComMaisProcessos(processos).map(a => ({
    name: a.area,
    value: a.count,
  }));

  const probabilidadeData = processos.slice(0, 6).map(p => ({
    processo: p.processo.numero.split('.')[0].slice(-4),
    total: p.analise_risco.probabilidade_perda.total,
    parcial: p.analise_risco.probabilidade_perda.parcial,
    procedencia: p.analise_risco.probabilidade_perda.procedencia,
  }));

  const riscoExposicaoData = processos.map(p => ({
    name: p.processo.numero.split('.')[0].slice(-4),
    score: p.analise_risco.score_risco,
    exposicao: p.analise_financeira.exposicao_total.realista,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 shadow-2xl relative overflow-hidden">
        {/* Padrão decorativo de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex-1 min-w-[300px]">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-1 tracking-tight">
                    Dashboard Jurídico
                  </h1>
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                </div>
              </div>
              <p className="text-blue-50 text-lg font-medium leading-relaxed">
                Companhia Docas do Rio de Janeiro
              </p>
              <p className="text-blue-200 text-sm mt-1">
                Análise Preditiva de Processos Trabalhistas
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-200" />
                  <div>
                    <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Última atualização</p>
                    <p className="text-white font-bold text-lg">{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-semibold">Sistema Ativo</span>
                  </div>
                  <span className="text-blue-200 text-xs">{totalProcessos} processos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs Principais */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              Visão Geral
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard
              title="Total de Processos Ativos"
              value={totalProcessos}
              icon={FileText}
              color="blue"
              subtitle="Processos trabalhistas em análise"
            />
            <KpiCard
              title="Exposição Financeira Total"
              value={formatCurrency(exposicaoTotal)}
              icon={DollarSign}
              color="red"
              subtitle="Cenário realista consolidado"
            />
            <KpiCard
              title="Provisão Recomendada"
              value={formatCurrency(provisaoTotal)}
              icon={Target}
              color="purple"
              subtitle="Valor total a provisionar"
            />
            <KpiCard
              title="Processos de Alto Risco"
              value={processosPorRisco.alto}
              icon={AlertTriangle}
              color="red"
              trend={`${formatPercent((processosPorRisco.alto / totalProcessos) * 100)} do total`}
            />
          </div>
        </section>

        {/* KPIs Secundários */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard
              title="Score Médio de Risco"
              value={scoreMediaRisco.toFixed(1)}
              icon={Shield}
              color="yellow"
              subtitle="Média ponderada (0-100)"
            />
            <KpiCard
              title="Prob. Média de Perda Parcial"
              value={formatPercent(probMediaPerda)}
              icon={TrendingUp}
              color="yellow"
              subtitle="Média de todos os processos"
            />
            <KpiCard
              title="Prazos Críticos"
              value={processosPrazosCriticos.length}
              icon={Clock}
              color="red"
              trend="15 dias ou menos"
            />
            <KpiCard
              title="Exposição Média/Processo"
              value={formatCurrency(exposicaoTotal / totalProcessos)}
              icon={DollarSign}
              color="indigo"
              subtitle="Cenário realista"
            />
          </div>
        </section>

        {/* Gráficos - Linha 1 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-10 bg-gradient-to-b from-red-600 to-orange-500 rounded-full"></div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              Análise de Riscos
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DistribuicaoRiscoChart data={riscoData} />
            <ProbabilidadePerdaChart data={probabilidadeData} />
          </div>
        </section>

        {/* Gráficos - Linha 2 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-10 bg-gradient-to-b from-green-600 to-emerald-500 rounded-full"></div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              Análise Financeira
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExposicaoFinanceiraChart data={exposicaoData} />
            <RiscoExposicaoChart data={riscoExposicaoData} />
          </div>
        </section>

        {/* Gráficos - Linha 3 */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-10 bg-gradient-to-b from-indigo-600 to-purple-500 rounded-full"></div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <FileText className="w-8 h-8 text-indigo-600" />
              Análise Operacional
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TemasRecorrentesChart data={temasData} />
            <AreasAfetadasChart data={areasData} />
          </div>
        </section>

        {/* Tabela de Processos */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-10 bg-gradient-to-b from-gray-700 to-gray-500 rounded-full"></div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <FileText className="w-8 h-8 text-gray-700" />
              Todos os Processos
            </h2>
          </div>
          <ProcessosTable processos={processos} />
        </section>

        {/* Insights e Alertas */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-10 bg-gradient-to-b from-yellow-600 to-red-500 rounded-full"></div>
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              Alertas e Insights
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Processos com prazos críticos */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <div className="bg-red-500 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                Atenção: Prazos Urgentes
              </h3>
              <div className="space-y-3">
                {processosPrazosCriticos.slice(0, 5).map(p => (
                  <div key={p.processo.numero} className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-red-200">
                    <p className="font-bold text-red-900 text-sm mb-1">
                      {p.processo.numero.slice(-10)}
                    </p>
                    <p className="text-xs text-red-700 font-semibold">
                      {p.processo.prazo_proximo.tipo}: {p.processo.prazo_proximo.dias_restantes} dias
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Maiores exposições */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center gap-2">
                <div className="bg-yellow-500 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                Maiores Exposições
              </h3>
              <div className="space-y-3">
                {processos.slice(0, 5).map(p => (
                  <div key={p.processo.numero} className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-yellow-200">
                    <p className="font-bold text-yellow-900 text-sm mb-1">
                      {p.processo.numero.slice(-10)}
                    </p>
                    <p className="text-xs text-yellow-700 font-semibold">
                      {formatCurrency(p.analise_financeira.exposicao_total.realista)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recomendações de acordo */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                Recomendações de Acordo
              </h3>
              <div className="space-y-3">
                {processos
                  .filter(p => p.recomendacoes_estrategicas.estrategia_principal === 'acordo_judicial')
                  .slice(0, 5)
                  .map(p => (
                    <div key={p.processo.numero} className="bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-blue-200">
                      <p className="font-bold text-blue-900 text-sm mb-1">
                        {p.processo.numero.slice(-10)}
                      </p>
                      <p className="text-xs text-blue-700 font-semibold">
                        Score: {p.analise_risco.score_risco} | {p.analise_risco.classificacao.toUpperCase()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Dashboard Jurídico CDRJ - Análise Preditiva de Processos Trabalhistas
            </p>
            <p className="text-xs text-gray-500">
              Powered by IA Jurídica v{processos[0]?.metadata.modelo_ia.versao || '4.2.1'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

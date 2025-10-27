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
    <div className="relative min-h-screen overflow-hidden">
      <div className="background-grid" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-blue-400/30 blur-3xl" />
      <div className="pointer-events-none absolute right-[-160px] top-[18%] h-[520px] w-[520px] rounded-full bg-indigo-400/20 blur-[160px]" />
      <div className="pointer-events-none absolute left-[12%] bottom-[-200px] h-[420px] w-[420px] rounded-full bg-cyan-300/25 blur-[160px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      {/* Header */}
      <header className="relative mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 shadow-[0_40px_80px_-40px_rgba(30,64,175,0.65)]">
          <div className="absolute inset-0 opacity-90">
            <div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-400/40 blur-3xl" />
            <div className="absolute bottom-[-120px] left-1/3 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
            <div className="absolute right-[-80px] top-[-80px] h-60 w-60 rounded-full bg-sky-400/30 blur-3xl" />
          </div>

          <div className="relative z-10 px-6 py-10 sm:px-12">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="min-w-[300px] flex-1 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-white/20 p-3 shadow-inner shadow-blue-500/40 backdrop-blur-md">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">
                      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                      Inteligência Jurídica
                    </div>
                    <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                      Dashboard Jurídico
                    </h1>
                    <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300" />
                  </div>
                </div>
                <p className="text-lg font-medium leading-relaxed text-blue-50">
                  Companhia Docas do Rio de Janeiro
                </p>
                <p className="text-sm text-blue-200">
                  Análise preditiva e monitoramento em tempo real dos processos trabalhistas.
                </p>
              </div>

              <div className="flex min-w-[220px] flex-col gap-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 shadow-lg shadow-blue-900/20 backdrop-blur-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-100" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-100">
                        Última atualização
                      </p>
                      <p className="text-lg font-bold text-white">
                        {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 shadow-lg shadow-blue-900/10 backdrop-blur-lg">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                      <span className="text-sm font-semibold text-white">Sistema Ativo</span>
                    </div>
                    <span className="text-xs font-semibold text-blue-100">{totalProcessos} processos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_50px_120px_-60px_rgba(15,23,42,0.45)] backdrop-blur-2xl sm:p-10">
          <div className="space-y-12">
            {/* KPIs Principais */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1.5 rounded-full bg-gradient-to-b from-blue-600 to-indigo-600" />
                <h2 className="flex items-center gap-3 text-3xl font-extrabold text-slate-900">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  Visão Geral
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                Indicadores complementares
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1.5 rounded-full bg-gradient-to-b from-red-600 to-orange-500" />
                <h2 className="flex items-center gap-3 text-3xl font-extrabold text-slate-900">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  Análise de Riscos
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <DistribuicaoRiscoChart data={riscoData} />
                <ProbabilidadePerdaChart data={probabilidadeData} />
              </div>
            </section>

            {/* Gráficos - Linha 2 */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1.5 rounded-full bg-gradient-to-b from-green-600 to-emerald-500" />
                <h2 className="flex items-center gap-3 text-3xl font-extrabold text-slate-900">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  Análise Financeira
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ExposicaoFinanceiraChart data={exposicaoData} />
                <RiscoExposicaoChart data={riscoExposicaoData} />
              </div>
            </section>

            {/* Gráficos - Linha 3 */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1.5 rounded-full bg-gradient-to-b from-indigo-600 to-purple-500" />
                <h2 className="flex items-center gap-3 text-3xl font-extrabold text-slate-900">
                  <FileText className="h-8 w-8 text-indigo-600" />
                  Análise Operacional
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <TemasRecorrentesChart data={temasData} />
                <AreasAfetadasChart data={areasData} />
              </div>
            </section>

            {/* Tabela de Processos */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1.5 rounded-full bg-gradient-to-b from-slate-700 to-slate-500" />
                <h2 className="flex items-center gap-3 text-3xl font-extrabold text-slate-900">
                  <FileText className="h-8 w-8 text-slate-700" />
                  Todos os Processos
                </h2>
              </div>
              <ProcessosTable processos={processos} />
            </section>

            {/* Insights e Alertas */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1.5 rounded-full bg-gradient-to-b from-yellow-600 to-red-500" />
                <h2 className="flex items-center gap-3 text-3xl font-extrabold text-slate-900">
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  Alertas e Insights
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Processos com prazos críticos */}
                <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-900">
                    <div className="rounded-lg bg-red-500 p-2">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    Atenção: Prazos Urgentes
                  </h3>
                  <div className="space-y-3">
                    {processosPrazosCriticos.slice(0, 5).map(p => (
                      <div key={p.processo.numero} className="rounded-lg border border-red-200 bg-white/70 p-3 backdrop-blur-sm">
                        <p className="mb-1 text-sm font-bold text-red-900">
                          {p.processo.numero.slice(-10)}
                        </p>
                        <p className="text-xs font-semibold text-red-700">
                          {p.processo.prazo_proximo.tipo}: {p.processo.prazo_proximo.dias_restantes} dias
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Maiores exposições */}
                <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-yellow-900">
                    <div className="rounded-lg bg-yellow-500 p-2">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    Maiores Exposições
                  </h3>
                  <div className="space-y-3">
                    {processos.slice(0, 5).map(p => (
                      <div key={p.processo.numero} className="rounded-lg border border-yellow-200 bg-white/70 p-3 backdrop-blur-sm">
                        <p className="mb-1 text-sm font-bold text-yellow-900">
                          {p.processo.numero.slice(-10)}
                        </p>
                        <p className="text-xs font-semibold text-yellow-700">
                          {formatCurrency(p.analise_financeira.exposicao_total.realista)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recomendações de acordo */}
                <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-900">
                    <div className="rounded-lg bg-blue-500 p-2">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    Recomendações de Acordo
                  </h3>
                  <div className="space-y-3">
                    {processos
                      .filter(p => p.recomendacoes_estrategicas.estrategia_principal === 'acordo_judicial')
                      .slice(0, 5)
                      .map(p => (
                        <div key={p.processo.numero} className="rounded-lg border border-blue-200 bg-white/70 p-3 backdrop-blur-sm">
                          <p className="mb-1 text-sm font-bold text-blue-900">
                            {p.processo.numero.slice(-10)}
                          </p>
                          <p className="text-xs font-semibold text-blue-700">
                            Score: {p.analise_risco.score_risco} | {p.analise_risco.classificacao.toUpperCase()}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 rounded-2xl border border-white/60 bg-white/75 px-6 py-5 text-slate-600 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium">
            Dashboard Jurídico CDRJ - Análise Preditiva de Processos Trabalhistas
          </p>
          <p className="text-xs font-semibold text-slate-500">
            Powered by IA Jurídica v{processos[0]?.metadata.modelo_ia.versao || '4.2.1'}
          </p>
        </div>
      </footer>
    </div>
  );
}

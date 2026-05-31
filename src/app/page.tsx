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
  toSafeNumber,
} from '@/lib/processos';
import KpiCard from '@/components/KpiCard';
import ProcessosTable from '@/components/ProcessosTable';
import AlertCarousel from '@/components/AlertCarousel';
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

  const totalProcessos = processos.length;
  const exposicaoTotal = getTotalExposicaoFinanceira(processos);
  const provisaoTotal = getTotalProvisaoRecomendada(processos);
  const processosPorRisco = getProcessosPorRisco(processos);
  const processosPrazosCriticos = getProcessosComPrazosCriticos(processos);

  const probMediaPerda =
    totalProcessos > 0
      ? processos.reduce((acc, p) => acc + toSafeNumber(p.analise_risco.probabilidade_perda.parcial), 0) / totalProcessos
      : 0;

  const scoreMediaRisco =
    totalProcessos > 0 ? processos.reduce((acc, p) => acc + toSafeNumber(p.analise_risco.score_risco), 0) / totalProcessos : 0;

  const riscoData = [
    { name: 'Risco Alto', value: processosPorRisco.alto },
    { name: 'Risco Médio', value: processosPorRisco.medio },
    { name: 'Risco Baixo', value: processosPorRisco.baixo },
  ];

  const processosOrdenadosPorExposicao = [...processos].sort(
    (a, b) =>
      toSafeNumber(b.analise_financeira.exposicao_total.realista) - toSafeNumber(a.analise_financeira.exposicao_total.realista),
  );

  const exposicaoData = processosOrdenadosPorExposicao.slice(0, 10).map(p => ({
    name: p.processo.numero.split('.')[0].slice(-4),
    value: toSafeNumber(p.analise_financeira.exposicao_total.realista),
  }));

  const temasRecorrentes = getTemasRecorrentes(processos);

  const temasData = temasRecorrentes
    .slice(0, 6)
    .map(t => ({
      name: t.tema.length > 30 ? `${t.tema.substring(0, 27)}...` : t.tema,
      value: t.count,
    }));

  const areasData = getAreasComMaisProcessos(processos).map(a => ({
    name: a.area,
    value: a.count,
  }));

  const probabilidadeData = processos.slice(0, 6).map(p => ({
    processo: p.processo.numero.split('.')[0].slice(-4),
    total: toSafeNumber(p.analise_risco.probabilidade_perda.total),
    parcial: toSafeNumber(p.analise_risco.probabilidade_perda.parcial),
    procedencia: toSafeNumber(p.analise_risco.probabilidade_perda.procedencia),
  }));

  const riscoExposicaoData = processos.map(p => ({
    name: p.processo.numero.split('.')[0].slice(-4),
    score: toSafeNumber(p.analise_risco.score_risco),
    exposicao: toSafeNumber(p.analise_financeira.exposicao_total.realista),
  }));

  const percentualAltoRisco = totalProcessos > 0 ? (processosPorRisco.alto / totalProcessos) * 100 : 0;
  const percentualPrazosCriticos = totalProcessos > 0 ? (processosPrazosCriticos.length / totalProcessos) * 100 : 0;
  const temaMaisRecorrente = temasRecorrentes[0] ?? { tema: 'Sem dados disponíveis', count: 0 };
  const processoMaiorExposicao = processosOrdenadosPorExposicao[0];
  const versaoModelo = processos[0]?.metadata.modelo_ia.versao ?? '4.2.1';

  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-indigo-100/70 via-white to-transparent" />
      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white shadow-xl">
          <div className="grid gap-10 px-8 py-10 lg:grid-cols-[1.3fr_1fr] lg:px-12">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-100">
                <BarChart3 className="h-4 w-4" />
                Companhia Docas do Rio de Janeiro
              </span>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Dashboard jurídico orientado por dados</h1>
                <p className="max-w-2xl text-base text-indigo-100/80 sm:text-lg">
                  Visualize rapidamente os principais indicadores de risco, exposição financeira e andamento processual para
                  direcionar estratégias jurídicas com segurança.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-indigo-100/80">Processos monitorados</p>
                  <p className="text-2xl font-bold">{formatNumber(totalProcessos)}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-indigo-100/80">Exposição realista total</p>
                  <p className="text-2xl font-bold">{formatCurrency(exposicaoTotal)}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-100/70">Resumo de risco</h2>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-indigo-100/70">Alto</p>
                  <p className="mt-1 text-2xl font-semibold">{processosPorRisco.alto}</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-indigo-100/70">Médio</p>
                  <p className="mt-1 text-2xl font-semibold">{processosPorRisco.medio}</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-indigo-100/70">Baixo</p>
                  <p className="mt-1 text-2xl font-semibold">{processosPorRisco.baixo}</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-indigo-100/80">
                <p>
                  {formatPercent(percentualAltoRisco)} dos casos estão classificados como risco alto. Reavalie estratégias para
                  estes processos prioritários.
                </p>
                <p>
                  {formatPercent(percentualPrazosCriticos)} possuem prazos críticos em aberto. Garanta resposta ágil para evitar
                  perdas processuais.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-12 grid gap-6 lg:grid-cols-4">
          <KpiCard title="Total de Processos" value={formatNumber(totalProcessos)} icon={FileText} color="blue" />
          <KpiCard
            title="Exposição Financeira"
            value={formatCurrency(exposicaoTotal)}
            icon={DollarSign}
            color="purple"
            subtitle="Cenário realista"
          />
          <KpiCard
            title="Provisão Recomendada"
            value={formatCurrency(provisaoTotal)}
            icon={Shield}
            color="green"
            subtitle="Sugestão de provisionamento"
          />
          <KpiCard
            title="Probabilidade Média"
            value={formatPercent(probMediaPerda)}
            icon={TrendingUp}
            color="indigo"
            subtitle="Probabilidade parcial de perda"
          />
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Destaques estratégicos
              </h2>
              <div className="mt-6 space-y-5 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tema mais recorrente</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{temaMaisRecorrente.tema}</p>
                  <p className="mt-1 text-sm text-slate-600">{temaMaisRecorrente.count} ocorrências registradas</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Maior exposição</p>
                  {processoMaiorExposicao ? (
                    <>
                      <p className="mt-2 text-base font-semibold text-slate-900">{processoMaiorExposicao.processo.numero}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {formatCurrency(processoMaiorExposicao.analise_financeira.exposicao_total.realista)} de exposição realista
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 text-sm text-slate-600">Nenhum processo disponível</p>
                  )}
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Score médio de risco</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{scoreMediaRisco.toFixed(1)}</p>
                  <p className="mt-1 text-sm text-slate-600">Distribuição equilibrada entre níveis de severidade</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Clock className="h-5 w-5 text-sky-500" />
                Prazos críticos recentes
              </h2>
              <AlertCarousel>
                <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-rose-900">
                    <Clock className="h-4 w-4" />
                    Prazos urgentes
                  </h3>
                  <div className="mt-4 space-y-3 text-sm">
                    {processosPrazosCriticos.slice(0, 5).map(p => (
                      <div key={p.processo.numero} className="rounded-xl border border-rose-100 bg-white/70 p-3">
                        <p className="font-semibold text-slate-900">{p.processo.numero}</p>
                        <p className="text-xs text-slate-600">
                          {p.processo.prazo_proximo.tipo}: {p.processo.prazo_proximo.dias_restantes} dias restantes
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-amber-900">
                    <DollarSign className="h-4 w-4" />
                    Maiores exposições
                  </h3>
                  <div className="mt-4 space-y-3 text-sm">
                    {processosOrdenadosPorExposicao.slice(0, 5).map(p => (
                      <div key={p.processo.numero} className="rounded-xl border border-amber-100 bg-white/70 p-3">
                        <p className="font-semibold text-slate-900">{p.processo.numero}</p>
                        <p className="text-xs text-slate-600">{formatCurrency(p.analise_financeira.exposicao_total.realista)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-indigo-900">
                    <Target className="h-4 w-4" />
                    Recomendações de acordo
                  </h3>
                  <div className="mt-4 space-y-3 text-sm">
                    {processos
                      .filter(p =>
                        ['acordo_judicial', 'acordo_imediato'].includes(p.recomendacoes_estrategicas.estrategia_principal),
                      )
                      .slice(0, 5)
                      .map(p => (
                        <div key={p.processo.numero} className="rounded-xl border border-indigo-100 bg-white/70 p-3">
                          <p className="font-semibold text-slate-900">{p.processo.numero}</p>
                          <p className="text-xs text-slate-600">
                            Score {p.analise_risco.score_risco} · {p.analise_risco.classificacao.toUpperCase()}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </AlertCarousel>
            </div>
          </div>

          <div className="space-y-6">
            <DistribuicaoRiscoChart data={riscoData} />
            <AreasAfetadasChart data={areasData} />
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <ExposicaoFinanceiraChart data={exposicaoData} />
          <TemasRecorrentesChart data={temasData} />
          <ProbabilidadePerdaChart data={probabilidadeData} />
          <RiscoExposicaoChart data={riscoExposicaoData} />
        </section>

        <section className="mt-12 space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Monitoramento detalhado</h2>
            <p className="text-sm text-slate-600">
              Acompanhe cada processo com filtros dinâmicos, ordenação por risco e acesso rápido às informações essenciais.
            </p>
          </div>
          <ProcessosTable processos={processos} />
        </section>

        <footer className="mt-16 rounded-3xl border border-slate-200 bg-white/90 px-6 py-6 text-sm text-slate-600 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>Dashboard Jurídico CDRJ · Inteligência aplicada à gestão de litígios</p>
            <p className="font-semibold text-slate-500">Powered by IA Jurídica v{versaoModelo}</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

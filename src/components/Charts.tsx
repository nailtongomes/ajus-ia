'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Area,
} from 'recharts';
import { formatCurrency, toSafeNumber } from '@/lib/utils';

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

// Gráfico de distribuição de risco
interface DistribuicaoRiscoProps {
  data: ChartData[];
}

const RISK_COLORS = ['#ef4444', '#eab308', '#22c55e'];

export function DistribuicaoRiscoChart({ data }: DistribuicaoRiscoProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-green-500 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">Distribuição por Classificação de Risco</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Gráfico de exposição financeira
interface ExposicaoFinanceiraProps {
  data: ChartData[];
}

export function ExposicaoFinanceiraChart({ data }: ExposicaoFinanceiraProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-orange-500 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">Top 10 Processos por Exposição Financeira</h3>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} stroke="#6b7280" />
          <YAxis dataKey="name" type="category" width={100} fontSize={11} stroke="#6b7280" />
          <Tooltip
            formatter={(value) => formatCurrency(toSafeNumber(value))}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend />
          <Bar dataKey="value" fill="url(#redGradient)" name="Exposição Realista (R$)" radius={[0, 8, 8, 0]} />
          <defs>
            <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#f87171" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Gráfico de temas recorrentes
interface TemasRecorrentesProps {
  data: ChartData[];
}

export function TemasRecorrentesChart({ data }: TemasRecorrentesProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-500 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">Temas Jurídicos Recorrentes</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" height={120} fontSize={11} stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
          <Legend />
          <Bar dataKey="value" fill="url(#indigoGradient)" name="Quantidade de Processos" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Gráfico de áreas afetadas
interface AreasAfetadasProps {
  data: ChartData[];
}

const AREA_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export function AreasAfetadasChart({ data }: AreasAfetadasProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-pink-500 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">Processos por Área Operacional</h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, value }: any) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={AREA_COLORS[index % AREA_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Gráfico de análise de probabilidade de perda
interface ProbabilidadePerdaProps {
  data: {
    processo: string;
    total: number;
    parcial: number;
    procedencia: number;
  }[];
}

export function ProbabilidadePerdaChart({ data }: ProbabilidadePerdaProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-yellow-500 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">Probabilidade de Perda por Processo</h3>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="processo" angle={-30} textAnchor="end" height={100} fontSize={10} stroke="#6b7280" />
          <YAxis label={{ value: '%', angle: -90, position: 'insideLeft' }} stroke="#6b7280" />
          <Tooltip
            formatter={(value) => `${toSafeNumber(value).toFixed(1)}%`}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend />
          <Bar dataKey="total" fill="#dc2626" name="Perda Total" stackId="a" radius={[8, 8, 0, 0]} />
          <Bar dataKey="parcial" fill="#f59e0b" name="Perda Parcial" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Gráfico de score de risco vs exposição
interface RiscoExposicaoProps {
  data: {
    name: string;
    score: number;
    exposicao: number;
  }[];
}

export function RiscoExposicaoChart({ data }: RiscoExposicaoProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-8 bg-gradient-to-b from-purple-600 to-red-500 rounded-full"></div>
        <h3 className="text-lg font-bold text-gray-800">Score de Risco vs Exposição Financeira</h3>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" height={100} fontSize={10} stroke="#6b7280" />
          <YAxis yAxisId="left" label={{ value: 'Score', angle: -90, position: 'insideLeft' }} stroke="#6b7280" />
          <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => formatCurrency(value)} stroke="#6b7280" />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'Exposição (R$)') return formatCurrency(toSafeNumber(value));
              return toSafeNumber(value);
            }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="score" fill="url(#purpleGradient)" name="Score de Risco" radius={[8, 8, 0, 0]} />
          <Area yAxisId="right" type="monotone" dataKey="exposicao" fill="#fca5a5" stroke="#dc2626" name="Exposição (R$)" fillOpacity={0.6} strokeWidth={2} />
          <defs>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'indigo';
  trend?: string;
  subtitle?: string;
  change?: {
    value: string;
    direction: 'up' | 'down';
  };
}

const colorMap = {
  blue: {
    gradient: 'from-blue-500/70 via-sky-400/70 to-blue-500/70',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badgeBg: 'bg-blue-50 text-blue-600',
  },
  red: {
    gradient: 'from-rose-500/70 via-rose-400/70 to-rose-500/70',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    badgeBg: 'bg-rose-50 text-rose-600',
  },
  yellow: {
    gradient: 'from-amber-500/70 via-amber-400/70 to-amber-500/70',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-50 text-amber-600',
  },
  green: {
    gradient: 'from-emerald-500/70 via-emerald-400/70 to-emerald-500/70',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-600',
  },
  purple: {
    gradient: 'from-fuchsia-500/70 via-purple-400/70 to-fuchsia-500/70',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    badgeBg: 'bg-purple-50 text-purple-600',
  },
  indigo: {
    gradient: 'from-indigo-500/70 via-indigo-400/70 to-indigo-500/70',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    badgeBg: 'bg-indigo-50 text-indigo-600',
  },
};

export default function KpiCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
  subtitle,
  change,
}: KpiCardProps) {
  const colors = colorMap[color];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${colors.gradient}`} />
      <div className="relative flex items-start justify-between">
        <div className="flex-1 pr-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
          {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
          {trend && (
            <span className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${colors.badgeBg}`}>
              {trend}
            </span>
          )}
          {change && (
            <div
              className={`mt-3 flex items-center text-sm font-semibold ${
                change.direction === 'up' ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              <span>{change.value}</span>
            </div>
          )}
        </div>
        <div className={`${colors.iconBg} rounded-xl p-4 text-slate-900 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105`}>
          <Icon className={`h-7 w-7 ${colors.iconColor}`} />
        </div>
      </div>
    </div>
  );
}

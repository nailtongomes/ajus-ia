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
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconColor: 'text-white',
    border: 'border-blue-200',
    valueColor: 'text-blue-900',
    hoverShadow: 'hover:shadow-blue-200/50',
  },
  red: {
    bg: 'bg-gradient-to-br from-red-50 to-red-100',
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
    iconColor: 'text-white',
    border: 'border-red-200',
    valueColor: 'text-red-900',
    hoverShadow: 'hover:shadow-red-200/50',
  },
  yellow: {
    bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
    iconBg: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    iconColor: 'text-white',
    border: 'border-yellow-200',
    valueColor: 'text-yellow-900',
    hoverShadow: 'hover:shadow-yellow-200/50',
  },
  green: {
    bg: 'bg-gradient-to-br from-green-50 to-green-100',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
    iconColor: 'text-white',
    border: 'border-green-200',
    valueColor: 'text-green-900',
    hoverShadow: 'hover:shadow-green-200/50',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    iconColor: 'text-white',
    border: 'border-purple-200',
    valueColor: 'text-purple-900',
    hoverShadow: 'hover:shadow-purple-200/50',
  },
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    iconColor: 'text-white',
    border: 'border-indigo-200',
    valueColor: 'text-indigo-900',
    hoverShadow: 'hover:shadow-indigo-200/50',
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
    <div
      className={`${colors.bg} border ${colors.border} relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${colors.hoverShadow}`}
    >
      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1 pr-4">
          <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">{title}</p>
          <h3 className={`text-3xl font-extrabold ${colors.valueColor} mb-2 leading-tight`}>{value}</h3>
          {subtitle && <p className="text-xs text-gray-600 mb-2 font-medium">{subtitle}</p>}
          {trend && (
            <div className="mt-3 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full inline-block">
              <p className="text-xs font-semibold text-gray-700">{trend}</p>
            </div>
          )}
          {change && (
            <div className={`flex items-center mt-2 text-sm font-semibold ${
              change.direction === 'up' ? 'text-red-600' : 'text-green-600'
            }`}>
              <span>{change.value}</span>
            </div>
          )}
        </div>
        <div className={`${colors.iconBg} rounded-xl p-4 shadow-lg transition-transform duration-300 group-hover:-translate-y-0.5`}>
          <Icon className={`w-7 h-7 ${colors.iconColor}`} />
        </div>
      </div>
    </div>
  );
}

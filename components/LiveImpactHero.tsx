import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface Stats {
  total: number;
}

interface LiveImpactHeroProps {
  stats: Stats;
  loading: boolean;
}

const StatCard: React.FC<{ value: number; label: string; loading: boolean; color?: string }> = ({ value, label, loading, color }) => {
  const animated = useCountUp(value, 1200);
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
      <div className={`text-2xl md:text-3xl font-black ${color || 'text-slate-900'}`}>
        {loading ? (
          <span className="inline-block w-12 h-7 bg-slate-200 rounded animate-pulse" />
        ) : (
          animated
        )}
      </div>
      <div className="text-xs md:text-sm text-slate-500 font-medium mt-1">{label}</div>
    </div>
  );
};

const LiveImpactHero: React.FC<LiveImpactHeroProps> = ({ stats, loading }) => {
  return (
    <div className="bg-slate-50 pt-24 pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="relative flex h-4 w-4 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
            Live Impact
          </h1>
          <p className="text-slate-500 mt-2 max-w-xl text-sm md:text-base">
            Every rescue. Every treatment. Transparent and real-time.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard value={stats.total} label="Cases (48hr)" loading={loading} color="text-red-600" />
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="text-2xl md:text-3xl font-black text-slate-900">43+</div>
            <div className="text-xs md:text-sm text-slate-500 font-medium mt-1">Ambulances & Clinics</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveImpactHero;

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';

const stats = [
  { value: 1200, suffix: '+', label: 'Members' },
  { value: 60, suffix: '+', label: 'Centers' },
  { value: 20, suffix: '+', label: 'Years of Service' },
  { value: 2005, suffix: '', label: 'Founded' },
];

const StatItem: React.FC<{ value: number; suffix: string; label: string; active: boolean; delay: number }> = ({
  value,
  suffix,
  label,
  active,
  delay,
}) => {
  const count = useCountUp(active ? value : 0, 1500);

  return (
    <div
      className={`scroll-reveal ${active ? 'visible' : ''} text-center`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {label === 'Founded' ? value : count}
        {suffix}
      </div>
      <div className="text-sm text-slate-400">{label}</div>
    </div>
  );
};

const PoweredByAYSG: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" ref={ref}>
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-600/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-600/8 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className={`text-center mb-12 scroll-reveal ${isVisible ? 'visible' : ''}`}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-red-400 mb-3">
              Powered By
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Arham Yuva Seva Group</h2>
            <p className="text-lg text-slate-400 italic mb-6">
              &ldquo;Spreading the Colours of Humanity&rdquo;
            </p>
          </div>

          {/* Description */}
          <div
            className={`scroll-reveal ${isVisible ? 'visible' : ''} text-center mb-14`}
            style={{ animationDelay: '150ms' }}
          >
            <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Founded in 2005 in Mulund, Mumbai, Arham Yuva Seva Group is a non-profit organization
              channeling youthful energy into selfless service — from healthcare and education to
              animal welfare and disaster relief. Always Care is one of their flagship initiatives.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, i) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                active={isVisible}
                delay={300 + i * 100}
              />
            ))}
          </div>

          {/* CTA */}
          <div
            className={`text-center scroll-reveal ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '700ms' }}
          >
            <a
              href="https://arham.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-200"
            >
              Visit arham.org <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoweredByAYSG;

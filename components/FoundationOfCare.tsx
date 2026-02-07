import React from 'react';
import { Siren, Stethoscope, Heart } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const pillars = [
  {
    icon: Siren,
    title: 'Emergency Response',
    description:
      '24/7 rapid dispatch with GPS-tracked ambulances. Our trained paramedics reach injured animals within minutes, equipped with life-saving tools.',
    accent: 'bg-red-100 text-red-600',
    border: 'border-red-100',
  },
  {
    icon: Stethoscope,
    title: 'Treatment & Care',
    description:
      'On-site first-aid, fully equipped mobile clinics, and a network of veterinary hospitals. Every animal gets the medical attention they deserve.',
    accent: 'bg-blue-100 text-blue-600',
    border: 'border-blue-100',
  },
  {
    icon: Heart,
    title: 'Recovery & Rehabilitation',
    description:
      'Post-treatment follow-ups, nutrition programs, and rehabilitation support until every rescued animal is healthy and safe.',
    accent: 'bg-green-100 text-green-600',
    border: 'border-green-100',
  },
];

const FoundationOfCare: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className={`text-center mb-14 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-red-500 mb-3">
            The Foundation of Care
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Built on Compassion, Driven by Action
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Three pillars that power every rescue — from the first call to full recovery.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${150 + i * 120}ms` }}
            >
              <div className={`bg-slate-50 rounded-2xl p-8 border ${pillar.border} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full`}>
                <div className={`w-14 h-14 rounded-xl ${pillar.accent} flex items-center justify-center mb-6`}>
                  <pillar.icon size={26} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundationOfCare;

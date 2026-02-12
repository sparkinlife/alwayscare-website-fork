import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const DonateSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [mode, setMode] = useState<'daily' | 'monthly'>('daily');

  const sponsorAmount = mode === 'daily' ? '5,001 ₹' : '35,001 ₹';

  return (
    <section
      id="donate"
      className="relative overflow-hidden bg-[radial-gradient(900px_420px_at_12%_0%,rgba(251,113,133,0.16),transparent_60%),radial-gradient(900px_420px_at_90%_100%,rgba(59,130,246,0.2),transparent_60%),linear-gradient(180deg,#eef5fd_0%,#d8e8fb_100%)] py-16 md:py-20"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/24 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/18 to-transparent" />
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/3 -translate-y-1/3 rounded-full bg-white/30 blur-3xl animate-float-soft" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-blue-200/30 blur-3xl animate-float-soft [animation-delay:1.5s]" />
      <div className="container mx-auto px-4">
        <div className={`scroll-reveal ${isVisible ? 'visible' : ''} text-center mb-10`}>
          <p className="text-xs tracking-[0.18em] uppercase text-slate-500 font-semibold mb-2">Donate</p>
          <h2 className="premium-heading text-slate-900 leading-tight">
            Right Now,
            <br />
            an Animal Needs You
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4 md:gap-5">
          <article
            className={`scroll-reveal ${isVisible ? 'visible' : ''} card-lift rounded-2xl border border-slate-200/70 bg-white/92 p-5`}
            style={{ animationDelay: '120ms' }}
          >
            <p className="text-xs text-slate-500 mb-1">Support One Injured Animal</p>
            <p className="text-3xl font-extrabold text-slate-900 mb-2">500 ₹</p>
            <p className="text-sm text-slate-600 mb-5">Donate medicines, vaccinations, surgical items.</p>
            <a
              href="#"
              className="premium-btn inline-flex w-full justify-center rounded-full bg-white border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Donate Now
            </a>
          </article>

          <article
            className={`scroll-reveal ${isVisible ? 'visible' : ''} card-lift rounded-2xl border-2 border-blue-400 bg-white/96 p-5 shadow-md animate-glow-soft`}
            style={{ animationDelay: '220ms' }}
          >
            <div className="mb-4 inline-flex rounded-full bg-slate-100 p-1">
              <button
                onClick={() => setMode('daily')}
                className={`rounded-full px-4 py-1 text-xs font-semibold transition-colors ${
                  mode === 'daily' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setMode('monthly')}
                className={`rounded-full px-4 py-1 text-xs font-semibold transition-colors ${
                  mode === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                Monthly
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-1">Sponsor a Day, Week or Month</p>
            <p className="text-3xl font-extrabold text-slate-900 mb-2">{sponsorAmount}</p>
            <p className="text-sm text-slate-600 mb-5">Each ambulance treats 8-12 animals daily.</p>
            <a
              href="#"
              className="btn-shine premium-btn premium-btn-dark inline-flex w-full justify-center rounded-full px-4 py-2.5 text-sm font-semibold"
            >
              Donate Now
            </a>
          </article>

          <article
            className={`scroll-reveal ${isVisible ? 'visible' : ''} card-lift rounded-2xl border border-slate-200/70 bg-white/92 p-5`}
            style={{ animationDelay: '320ms' }}
          >
            <p className="text-xs text-slate-500 mb-1">Join us as a Volunteer</p>
            <p className="text-lg font-bold text-slate-900 mb-2">Join us as a Volunteer</p>
            <p className="text-sm text-slate-600 mb-5">
              Empower our work, join us as a volunteer and help us carry day-to-day on-ground ops.
            </p>
            <a
              href="#volunteer"
              className="premium-btn inline-flex w-full justify-center rounded-full bg-white border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Join Us
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;

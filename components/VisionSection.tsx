import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const VisionSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      className="py-20 bg-gradient-to-br from-amber-50 to-orange-50/30 relative overflow-hidden"
      ref={ref}
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-10 left-10 text-amber-200/30 text-[200px] font-serif leading-none select-none pointer-events-none">
        &ldquo;
      </div>
      <div className="absolute bottom-10 right-10 text-amber-200/30 text-[200px] font-serif leading-none select-none pointer-events-none rotate-180">
        &ldquo;
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <div className={`scroll-reveal ${isVisible ? 'visible' : ''}`}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 mb-10">
              The Vision Behind Always Care
            </p>
          </div>

          {/* Quote */}
          <div
            className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '150ms' }}
          >
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 leading-snug mb-8 italic">
              &ldquo;The birth of any human being is purposeful only with the birth of humanity in our hearts.&rdquo;
            </blockquote>
          </div>

          {/* Attribution */}
          <div
            className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '300ms' }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-8 bg-amber-300"></div>
              <p className="text-sm font-semibold text-amber-700">
                Param Gurudev Shree Namramuni Maharaj Saheb
              </p>
              <div className="h-px w-8 bg-amber-300"></div>
            </div>
          </div>

          {/* Description */}
          <div
            className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
            style={{ animationDelay: '450ms' }}
          >
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Inspired by Rashtrasant Param Gurudev Shree Namramuni Maharaj Saheb, Always Care was born
              from the belief that compassion for all living beings is the highest form of service.
              His vision continues to guide every rescue, every treatment, and every life we touch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const VisionSection: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* ── Desktop: full-viewport split layout ── */}
      <div className="hidden lg:block relative min-h-screen">
        {/* Background image */}
        <img
          src="/images/gurudev-website.jpg"
          alt="Param Gurudev Shree Namramuni Maharaj Saheb"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center right' }}
        />

        {/* Warm gradient overlay on left for card readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.2) 100%)',
          }}
        />

        {/* Content card — vertically centered, left-aligned */}
        <div className="absolute inset-0 flex items-center">
          <div
            className={`scroll-reveal-left ${isVisible ? 'visible' : ''} ml-8 lg:ml-16 xl:ml-24 max-w-[560px] lg:max-w-[600px]`}
          >
            <div
              className="relative bg-white/95 rounded-[32px] p-10 lg:p-[60px]"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            >
              {/* Decorative quote mark */}
              <div
                className={`absolute -top-4 left-8 text-[180px] lg:text-[200px] leading-none select-none pointer-events-none scroll-reveal ${isVisible ? 'visible' : ''}`}
                style={{
                  animationDelay: '400ms',
                  color: '#d4c5b0',
                  opacity: 0.1,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                &ldquo;
              </div>

              {/* Label */}
              <p
                className={`scroll-reveal ${isVisible ? 'visible' : ''} text-sm font-semibold tracking-[2px] uppercase text-[#1a1a1a] mb-6`}
                style={{ animationDelay: '200ms' }}
              >
                Our Founder
              </p>

              {/* Name */}
              <h2
                className={`scroll-reveal ${isVisible ? 'visible' : ''} text-3xl lg:text-[36px] font-semibold text-[#1a1a1a] leading-tight mb-10`}
                style={{
                  animationDelay: '300ms',
                  fontFamily: "'Open Runde', sans-serif",
                }}
              >
                Param Namramuni Gurudev
              </h2>

              {/* Quote */}
              <blockquote
                className={`scroll-reveal ${isVisible ? 'visible' : ''} relative z-10 text-lg leading-[1.8] text-[#3a3a3a] italic mb-8`}
                style={{
                  animationDelay: '500ms',
                  fontFamily: "'Open Runde', sans-serif",
                }}
              >
                &ldquo;The birth of any human being is purposeful only with the birth of humanity in our hearts. Compassion beyond humanity is the highest form of service. Every creature deserves dignity, care, and a chance to heal.&rdquo;
              </blockquote>

              {/* Attribution */}
              <div
                className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: '650ms' }}
              >
                <p className="text-sm text-[#3a3a3a] leading-relaxed mb-8">
                  Inspired by Param Gurudev Namramuni, Always Care was born from the belief that compassion for all living beings is the highest form of service.
                </p>

                <a
                  href="https://parasdham.org/param-gurudev/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-[#333] transition-colors text-sm"
                >
                  Know More <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="lg:hidden pb-10">
        {/* Image with dark overlay */}
        <div className="relative h-[60vh]">
          <img
            src="/images/gurudev-website.jpg"
            alt="Param Gurudev Shree Namramuni Maharaj Saheb"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center top' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        </div>

        {/* Content card */}
        <div
          className={`scroll-reveal ${isVisible ? 'visible' : ''} relative -mt-16 mx-4 bg-white rounded-3xl p-8`}
          style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
        >
          {/* Decorative quote mark */}
          <div
            className="absolute -top-2 left-6 text-[120px] leading-none select-none pointer-events-none"
            style={{
              color: '#d4c5b0',
              opacity: 0.1,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            &ldquo;
          </div>

          <p className="text-sm font-semibold tracking-[2px] uppercase text-[#1a1a1a] mb-4">
            Our Founder
          </p>

          <h2
            className="text-2xl font-semibold text-[#1a1a1a] leading-tight mb-6"
            style={{ fontFamily: "'Open Runde', sans-serif" }}
          >
            Param Namramuni Gurudev
          </h2>

          <blockquote
            className="relative z-10 text-base leading-[1.8] text-[#3a3a3a] italic mb-6"
            style={{ fontFamily: "'Open Runde', sans-serif" }}
          >
            &ldquo;The birth of any human being is purposeful only with the birth of humanity in our hearts. Compassion beyond humanity is the highest form of service.&rdquo;
          </blockquote>

          <p className="text-sm text-[#3a3a3a] leading-relaxed mb-6">
            Inspired by Param Gurudev Namramuni, Always Care was born from the belief that compassion for all living beings is the highest form of service.
          </p>

          <a
            href="https://parasdham.org/param-gurudev/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-[#333] transition-colors text-sm"
          >
            Know More <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;

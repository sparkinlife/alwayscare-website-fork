import React, { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface MediaItem {
  src: string;
  type: 'image' | 'video';
}

const row1Items: MediaItem[] = [
  { src: '/images/photo/up-1.jpg', type: 'image' },
  { src: '/images/photo/up-2.jpg', type: 'image' },
  { src: '/images/photo/up-3.mp4', type: 'video' },
  { src: '/images/photo/up-4.jpg', type: 'image' },
  { src: '/images/photo/up-5.jpg', type: 'image' },
];

const row2Items: MediaItem[] = [
  { src: '/images/photo/down-1.jpg', type: 'image' },
  { src: '/images/photo/down-2.jpg', type: 'image' },
  { src: '/images/photo/down-3.mp4', type: 'video' },
  { src: '/images/photo/down-4.jpg', type: 'image' },
  { src: '/images/photo/down-5.jpg', type: 'image' },
];

const MediaElement: React.FC<{ item: MediaItem; alt: string }> = ({ item, alt }) => {
  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-[180px] md:h-[220px] lg:h-[240px] object-cover"
      />
    );
  }
  return (
    <img
      src={item.src}
      alt={alt}
      loading="lazy"
      className="w-full h-[180px] md:h-[220px] lg:h-[240px] object-cover hover:scale-105 transition-transform duration-500"
    />
  );
};

const GalleryRow = React.forwardRef<HTMLDivElement, { items: MediaItem[] }>(
  ({ items }, ref) => (
    <div className="overflow-hidden">
      <div
        ref={ref}
        className="flex w-max"
        style={{ willChange: 'transform' }}
      >
        {[0, 1, 2].map((setIdx) => (
          <div key={setIdx} className="flex gap-4 shrink-0 pr-4" aria-hidden={setIdx > 0}>
            {items.map((item, i) => (
              <div
                key={`${setIdx}-${i}`}
                className="shrink-0 w-[260px] md:w-[320px] lg:w-[360px] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <MediaElement item={item} alt={setIdx === 0 ? 'Always Care field work' : ''} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
);
GalleryRow.displayName = 'GalleryRow';

const PhotoGallery: React.FC = () => {
  const { ref: revealRef, isVisible } = useScrollReveal({ threshold: 0.05 });
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const autoOffsetRef = useRef(0);
  const prevTimeRef = useRef(0);
  const setWidthRef = useRef(1880);
  const row1InitRef = useRef(0);
  const row2InitRef = useRef(0);

  const AUTO_SPEED = 30; // pixels per second — slow baseline crawl

  // Calculate layout: set width + direction-aware initial offsets to center videos
  useEffect(() => {
    const calcLayout = () => {
      const w = window.innerWidth;
      const itemW = w >= 1024 ? 360 : w >= 768 ? 320 : 260;
      const gap = 16;
      const sw = 5 * itemW + 4 * gap + gap; // items + inter-gaps + right padding

      // Video is the 3rd item (index 2). Its center within one set:
      const videoCenterInSet = 2 * (itemW + gap) + itemW / 2;
      const viewportCenter = w / 2;

      setWidthRef.current = sw;
      row1InitRef.current = videoCenterInSet - viewportCenter;
      row2InitRef.current = sw + (videoCenterInSet - viewportCenter);
    };

    calcLayout();

    window.addEventListener('resize', calcLayout);
    return () => window.removeEventListener('resize', calcLayout);
  }, []);

  // Combined auto-scroll + scroll-driven parallax loop
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!prevTimeRef.current) prevTimeRef.current = timestamp;
      const delta = Math.min((timestamp - prevTimeRef.current) / 1000, 0.1);
      prevTimeRef.current = timestamp;

      // Continuous auto-scroll increment
      autoOffsetRef.current += AUTO_SPEED * delta;
      const sw = setWidthRef.current;
      // Wrap at one set width → seamless infinite loop (content is tripled)
      if (sw > 0 && autoOffsetRef.current >= sw) {
        autoOffsetRef.current -= sw;
      }

      // Scroll-driven parallax offset
      let scrollDriven = 0;
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        const viewportMiddle = window.innerHeight / 2;
        scrollDriven = (viewportMiddle - sectionMiddle) * 0.35;
      }

      const autoVal = autoOffsetRef.current;

      // Direct DOM updates — bypasses React re-renders for 60fps
      // Row 1 moves LEFT: -(init + auto + scroll)
      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${-(row1InitRef.current + autoVal + scrollDriven)}px)`;
      }
      // Row 2 moves RIGHT: -(init - auto - scroll)
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-(row2InitRef.current - autoVal - scrollDriven)}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      className="relative py-12 md:py-16 bg-[#FFFBF5] overflow-hidden"
      ref={(el) => {
        sectionRef.current = el;
        if (typeof revealRef === 'function') {
          revealRef(el);
        } else if (revealRef) {
          (revealRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }
      }}
      style={{ filter: 'sepia(0.08) saturate(1.1)' }}
    >
      <GalleryRow ref={row1Ref} items={row1Items} />

      {/* Overlay heading between rows */}
      <div className={`scroll-reveal ${isVisible ? 'visible' : ''} relative z-10 py-8 md:py-10 text-center`}>
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#B8650A] mb-3">
          On the Ground
        </p>
        <h2
          className="text-[clamp(24px,4vw,42px)] font-extrabold text-[#292524] leading-[1.1] tracking-[-0.03em]"
          style={{ fontFamily: "'Open Runde', sans-serif" }}
        >
          The <span className="bg-gradient-to-r from-[#B7312C] via-[#B8650A] to-[#B7312C] bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">Seva</span> We Do,<br />
          <span className="text-[#78716C] font-bold">Every Single Day</span>
        </h2>
      </div>

      <GalleryRow ref={row2Ref} items={row2Items} />
    </section>
  );
};

export default PhotoGallery;

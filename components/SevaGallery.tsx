import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
    alt: 'Dog rescue operation',
    span: 'row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=800&fit=crop',
    alt: 'Rescued dog recovering',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
    alt: 'Veterinary treatment',
    span: 'row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=800&fit=crop',
    alt: 'Animal care volunteer',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=600&h=400&fit=crop',
    alt: 'Cat rescue',
    span: 'row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop',
    alt: 'Dog rehabilitation',
    span: 'row-span-1',
  },
];

const SevaGallery: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-slate-50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className={`text-center mb-14 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-red-500 mb-3">
            Seva in Action
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Every Rescue Tells a Story of Compassion
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Moments captured from the field — our volunteers and paramedics in action, saving lives every day.
          </p>
        </div>

        {/* Photo grid */}
        <div className="columns-2 md:columns-3 gap-4 max-w-5xl mx-auto space-y-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`scroll-scale ${isVisible ? 'visible' : ''} break-inside-avoid`}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <div className="rounded-xl overflow-hidden group relative">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">{photo.alt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SevaGallery;

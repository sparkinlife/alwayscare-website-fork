import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Stethoscope, Truck, Building2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  {
    id: 'ambulance',
    icon: Truck,
    title: 'Arham Animal Ambulance',
    description:
      'Free ambulances with vets and paravets treating and transporting stray and injured animals.',
    stat: '43+',
    statLabel: 'Ambulances across India',
    images: ['/images/ambulance/1.jpg'],
  },
  {
    id: 'clinic',
    icon: Stethoscope,
    title: 'Arham Animal Clinics',
    description:
      'Free clinics providing ongoing treatment and care for animals in need.',
    stat: '4',
    statLabel: 'Clinics operational',
    images: [
      '/images/clinic/1.jpg',
      '/images/clinic/2.jpg',
      '/images/clinic/3.jpg',
      '/images/clinic/4.jpg',
    ],
  },
  {
    id: 'hospital',
    icon: Building2,
    title: 'Arham Animal Hospital',
    description:
      'A dedicated hospital being built to offer advanced animal care on a larger scale.',
    stat: '1',
    statLabel: 'Hospital under construction',
    images: ['/images/hospital/1.jpeg'],
  },
];

/* ─── Desktop: scroll-driven sticky storytelling ─── */

const DesktopView: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [clinicSlide, setClinicSlide] = useState(0);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver: watches each trigger zone
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    triggerRefs.current.forEach((el, idx) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(idx);
          }
        },
        { rootMargin: '-45% 0px -45% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Auto-cycle clinic images
  useEffect(() => {
    if (services[activeIndex].id !== 'clinic') {
      setClinicSlide(0);
      return;
    }
    const timer = setInterval(() => {
      setClinicSlide((prev) => (prev + 1) % services[1].images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const setTriggerRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      triggerRefs.current[idx] = el;
    },
    [],
  );

  const activeService = services[activeIndex];
  const Icon = activeService.icon;

  return (
    <div className="relative min-h-[300vh]">
      {/* Sticky viewport-height container */}
      <div className="sticky top-0 h-screen flex items-center">
        <div className="container mx-auto px-4">
          {/* Section heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
              The Foundation of Care
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
              Building a comprehensive network of care for animals across India
            </p>
          </div>

          {/* Content: left text + right image */}
          <div className="max-w-6xl mx-auto flex gap-12 items-center">
            {/* Left — Service info (40%) */}
            <div className="w-[40%] relative">
              {services.map((service, idx) => {
                const SIcon = service.icon;
                return (
                  <div
                    key={service.id}
                    className={`transition-all duration-500 ${
                      idx === activeIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 pointer-events-none absolute inset-0'
                    }`}
                  >
                    {/* Step indicator */}
                    <p className="text-sm text-slate-400 font-medium mb-4 tracking-wide">
                      {idx + 1} / {services.length}
                    </p>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
                      <SIcon size={22} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Stat */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl lg:text-5xl font-black text-slate-900">
                        {service.stat}
                      </span>
                      <span className="text-sm text-slate-400 font-medium">
                        {service.statLabel}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Progress dots */}
              <div className="flex gap-2 mt-8">
                {services.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      idx === activeIndex
                        ? 'w-8 bg-red-500'
                        : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right — Image (60%) */}
            <div className="w-[60%]">
              <div className="rounded-3xl overflow-hidden relative aspect-[4/3] shadow-xl">
                {services.map((service, serviceIdx) => (
                  <div
                    key={service.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      serviceIdx === activeIndex
                        ? 'opacity-100 z-10'
                        : 'opacity-0 z-0'
                    }`}
                  >
                    {service.id === 'clinic' ? (
                      service.images.map((src, imgIdx) => (
                        <img
                          key={src}
                          src={src}
                          alt={`${service.title} ${imgIdx + 1}`}
                          loading="lazy"
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                            imgIdx === clinicSlide
                              ? 'opacity-100'
                              : 'opacity-0'
                          }`}
                        />
                      ))
                    ) : (
                      <img
                        src={service.images[0]}
                        alt={service.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invisible scroll-trigger zones */}
      {services.map((service, idx) => (
        <div
          key={service.id}
          ref={setTriggerRef(idx)}
          className="h-screen"
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

/* ─── Mobile: simple stacked cards with scroll-reveal ─── */

const MobileCard: React.FC<{
  service: (typeof services)[number];
  index: number;
  isClinicActive: boolean;
  clinicSlide: number;
}> = ({ service, index, isClinicActive, clinicSlide }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="rounded-2xl overflow-hidden relative aspect-[4/3] shadow-lg mb-5">
        {service.id === 'clinic' ? (
          service.images.map((src, imgIdx) => (
            <img
              key={src}
              src={src}
              alt={`${service.title} ${imgIdx + 1}`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                imgIdx === clinicSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))
        ) : (
          <img
            src={service.images[0]}
            alt={service.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Text */}
      <div className="px-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Icon size={18} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">
          {service.description}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900">
            {service.stat}
          </span>
          <span className="text-sm text-slate-400 font-medium">
            {service.statLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

const MobileView: React.FC = () => {
  const { ref, isVisible } = useScrollReveal();
  const [clinicSlide, setClinicSlide] = useState(0);

  // Auto-cycle clinic images
  useEffect(() => {
    const timer = setInterval(() => {
      setClinicSlide((prev) => (prev + 1) % services[1].images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Section heading */}
      <div
        ref={ref}
        className={`text-center mb-10 scroll-reveal ${isVisible ? 'visible' : ''}`}
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          The Foundation of Care
        </h2>
        <p className="text-slate-500 max-w-md mx-auto text-base">
          Building a comprehensive network of care for animals across India
        </p>
      </div>

      {/* Stacked cards */}
      <div className="flex flex-col gap-12 px-4 max-w-lg mx-auto">
        {services.map((service, idx) => (
          <MobileCard
            key={service.id}
            service={service}
            index={idx}
            isClinicActive={true}
            clinicSlide={clinicSlide}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Main component ─── */

const FoundationOfCare: React.FC = () => {
  return (
    <section className="py-20 md:py-0 bg-slate-100">
      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopView />
      </div>
      {/* Mobile */}
      <div className="md:hidden">
        <MobileView />
      </div>
    </section>
  );
};

export default FoundationOfCare;

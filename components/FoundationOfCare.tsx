import React, { useState, useEffect } from 'react';
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

const ServiceSection: React.FC<{
  service: (typeof services)[number];
  index: number;
  reversed: boolean;
  clinicSlide: number;
}> = ({ service, index, reversed, clinicSlide }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div
        className={`max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
          reversed ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Text */}
        <div className="w-full md:w-1/2">
          <p className="text-sm text-slate-400 font-medium mb-4 tracking-wide">
            {index + 1} / {services.length}
          </p>

          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
            <Icon size={22} />
          </div>

          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
            {service.title}
          </h3>

          <p className="text-slate-500 text-base leading-relaxed mb-6">
            {service.description}
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl lg:text-5xl font-black text-slate-900">
              {service.stat}
            </span>
            <span className="text-sm text-slate-400 font-medium">
              {service.statLabel}
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="rounded-3xl overflow-hidden relative aspect-[4/3] shadow-xl">
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
        </div>
      </div>
    </div>
  );
};

const FoundationOfCare: React.FC = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const [clinicSlide, setClinicSlide] = useState(0);

  // Auto-cycle clinic images
  useEffect(() => {
    const timer = setInterval(() => {
      setClinicSlide((prev) => (prev + 1) % services[1].images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-slate-100">
      {/* Section heading */}
      <div
        ref={headingRef}
        className={`text-center mb-16 scroll-reveal ${headingVisible ? 'visible' : ''}`}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
          The Foundation of Care
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg">
          Building a comprehensive network of care for animals across India
        </p>
      </div>

      {/* Alternating service sections */}
      <div className="flex flex-col gap-20 md:gap-28">
        {services.map((service, idx) => (
          <ServiceSection
            key={service.id}
            service={service}
            index={idx}
            reversed={idx % 2 !== 0}
            clinicSlide={clinicSlide}
          />
        ))}
      </div>
    </section>
  );
};

export default FoundationOfCare;

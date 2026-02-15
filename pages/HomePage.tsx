import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import Hero from '../components/Hero';
import PhotoGallery from '../components/PhotoGallery';
import FoundationOfCare from '../components/FoundationOfCare';
import VisionSection from '../components/VisionSection';
import ArhamYuvaSeva from '../components/ArhamYuvaSeva';
import DonateSection from '../components/DonateSection';
import Volunteer from '../components/Volunteer';

const HomePage: React.FC = () => {
  const location = useLocation();

  usePageMeta({
    title: 'Arham Animal Ambulance | Free 24/7 Animal Rescue Across India',
    description: 'Find the nearest free animal ambulance in 40+ Indian cities. 24/7 emergency rescue, on-site treatment, and rehabilitation for injured street animals.',
    canonical: 'https://arhamanimalambulance.com/',
  });

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <div className="h-px bg-gradient-to-r from-transparent via-[#E8E0D8] to-transparent" />
      <PhotoGallery />
      <div className="h-px bg-gradient-to-r from-transparent via-[#E8E0D8] to-transparent" />
      <FoundationOfCare />
      <VisionSection />
      <ArhamYuvaSeva />
      <div className="h-px bg-gradient-to-r from-transparent via-[#E8E0D8]/50 to-transparent" />
      <DonateSection />
      <div className="h-px bg-gradient-to-r from-transparent via-[#E8E0D8]/50 to-transparent" />
      <Volunteer />
    </>
  );
};

export default HomePage;

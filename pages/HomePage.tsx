import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import FoundationOfCare from '../components/FoundationOfCare';
import SevaGallery from '../components/SevaGallery';
import DonateSection from '../components/DonateSection';
import VisionSection from '../components/VisionSection';
import PoweredByAYSG from '../components/PoweredByAYSG';
import Volunteer from '../components/Volunteer';
import StayInTheLoop from '../components/StayInTheLoop';

const HomePage: React.FC = () => {
  const location = useLocation();

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
      <FoundationOfCare />
      <SevaGallery />
      <DonateSection />
      <VisionSection />
      <PoweredByAYSG />
      <Volunteer />
      <StayInTheLoop />
    </>
  );
};

export default HomePage;

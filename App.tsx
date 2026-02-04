import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LiveStats from './components/LiveStats';
import DonateSection from './components/DonateSection';
import Volunteer from './components/Volunteer';
import Footer from './components/Footer';
// Chat assistant disabled - requires API key
// import GeminiAssistant from './components/GeminiAssistant';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-slate-900 selection:bg-red-200 selection:text-red-900">
      <Header />
      <main>
        <Hero />
        <LiveStats />
        <DonateSection />
        <Volunteer />
      </main>
      <Footer />
      {/* Chat assistant disabled - uncomment when API key is configured */}
      {/* <GeminiAssistant /> */}
    </div>
  );
};

export default App;

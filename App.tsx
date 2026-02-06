import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Volunteer from './components/Volunteer';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-slate-900 selection:bg-red-200 selection:text-red-900">
      <Header />
      <main>
        <Hero />
        <Volunteer />
      </main>
      <Footer />
    </div>
  );
};

export default App;

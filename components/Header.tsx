import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center">
          <img 
            src="https://alwayscare.org/wp-content/uploads/2021/09/logo-1.png" 
            alt="Always Care" 
            className="h-10 md:h-12 w-auto object-contain"
            onError={(e) => {
               // Fallback just in case URL breaks
               e.currentTarget.style.display = 'none';
               e.currentTarget.parentElement!.innerHTML = `<span class="text-xl font-black text-slate-900 tracking-tight">ALWAYS<span class="text-red-600">CARE</span></span>`;
            }}
          />
        </div>

        {/* Desktop Nav */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#home"
            className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 text-sm shadow-lg shadow-red-600/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Phone size={16} className="fill-current" />
            Call Ambulance
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 flex flex-col gap-3">
          {NAV_LINKS.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 font-medium py-3 px-2 border-b border-slate-100 last:border-none hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center px-4 py-3.5 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors mt-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Phone size={18} className="fill-current" />
            Call Ambulance
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

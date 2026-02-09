import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const renderNavLink = (link: typeof NAV_LINKS[number], className: string, onClick?: () => void) => {
    if (link.type === 'route') {
      return (
        <Link key={link.name} to={link.href} className={className} onClick={onClick}>
          {link.name}
        </Link>
      );
    }
    // Anchor links: use <a> on homepage (native scroll), <Link> on other pages (navigate + scroll)
    if (isHomePage) {
      return (
        <a key={link.name} href={link.href.replace('/', '')} className={className} onClick={onClick}>
          {link.name}
        </a>
      );
    }
    return (
      <Link key={link.name} to={link.href} className={className} onClick={onClick}>
        {link.name}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Area */}
        <Link to="/" className="flex items-center">
          <img
            src="/images/alwayscare-logo.png"
            alt="Always Care"
            className="h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link =>
            renderNavLink(
              link,
              "text-sm font-medium text-slate-600 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
            )
          )}
          <Link
            to="/#home"
            className="px-6 py-2.5 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 text-sm shadow-md shadow-red-600/15 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Phone size={16} className="fill-current" />
            Call Ambulance
          </Link>
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
          {NAV_LINKS.map(link =>
            renderNavLink(
              link,
              "text-slate-800 font-medium py-3 px-2 border-b border-slate-100 last:border-none hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500",
              () => setMobileMenuOpen(false)
            )
          )}
          <Link
            to="/#home"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center px-4 py-3.5 bg-red-600 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors mt-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Phone size={18} className="fill-current" />
            Call Ambulance
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

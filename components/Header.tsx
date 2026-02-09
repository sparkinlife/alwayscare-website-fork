import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (link: typeof NAV_LINKS[number]) => {
    if (link.type === 'route') return location.pathname === link.href;
    if (link.name === 'Home') return isHomePage && !location.hash;
    return false;
  };

  const renderNavLink = (link: typeof NAV_LINKS[number], className: string, onClick?: () => void) => {
    if (link.type === 'route') {
      return (
        <Link key={link.name} to={link.href} className={className} onClick={onClick}>
          {link.name}
        </Link>
      );
    }
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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Morphing navbar: full-width → floating pill */}
      <div
        className="flex items-center justify-between backdrop-blur-xl"
        style={{
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          marginTop: scrolled ? '12px' : '0px',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: scrolled ? '64rem' : '100%',
          width: scrolled ? 'calc(100% - 24px)' : '100%',
          borderRadius: scrolled ? '9999px' : '0px',
          padding: scrolled ? '8px 24px' : '8px 32px',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,1)',
          borderBottom: scrolled ? 'none' : '1px solid rgb(226,232,240)',
          border: scrolled ? '1px solid rgba(226,232,240,0.8)' : undefined,
          boxShadow: scrolled
            ? '0 4px 30px rgba(0,0,0,0.08)'
            : '0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <img
            src="/images/alwayscare-logo.png"
            alt="Always Care"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const active = isActiveLink(link);
            return renderNavLink(
              link,
              `relative text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                active
                  ? 'text-red-600 bg-red-50/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`
            );
          })}
          <Link
            to="/#home"
            className="btn-shine ml-3 px-5 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-600/25 transition-all duration-200 flex items-center gap-2 text-sm shadow-md shadow-red-600/15 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Phone size={15} className="fill-current" />
            Call Ambulance
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-900 p-2 rounded-full hover:bg-slate-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden mx-3 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-transparent shadow-none'
        }`}
      >
        <div className="p-4 flex flex-col gap-1">
          {NAV_LINKS.map((link, idx) => {
            const active = isActiveLink(link);
            return renderNavLink(
              link,
              `animate-fadeUp text-slate-800 font-medium py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                active ? 'text-red-600 bg-red-50/60' : 'hover:bg-red-50/50'
              }`,
              () => setMobileMenuOpen(false)
            );
          })}
          <Link
            to="/#home"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-shine animate-fadeUp w-full text-center px-4 py-3 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-200 mt-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md shadow-red-600/15"
            style={{ animationDelay: '150ms' }}
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

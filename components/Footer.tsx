import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/arham-alwayscare-logo.png" alt="Always Care" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
              Arham Yuva Seva Group operates India's largest free animal ambulance network.
              We provide 24/7 emergency response, treatment, and rehabilitation for injured street animals across 40+ cities.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Find Ambulance
                </a>
              </li>
              <li>
                <Link to="/live-impact" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Our Impact
                </Link>
              </li>
              <li>
                <a href="#donate" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Donate
                </a>
              </li>
              <li>
                <a href="#volunteer" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-400">24/7 Helpline</p>
                  <a href="tel:+919876543210" className="text-white font-medium hover:text-red-400 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a href="mailto:help@alwayscare.org" className="text-white font-medium hover:text-red-400 transition-colors">
                    help@alwayscare.org
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-slate-400">Headquarters</p>
                  <p className="text-white text-sm">Ahmedabad, Gujarat, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-500 text-sm text-center md:text-left">
              &copy; {currentYear} Arham Yuva Seva Group. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="text-green-400 font-medium">80G Tax Exemption Available</span>
              <span className="text-slate-600">|</span>
              <Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="text-slate-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/refund-cancellation" className="text-slate-400 hover:text-white transition-colors">
                Refund & Cancellation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

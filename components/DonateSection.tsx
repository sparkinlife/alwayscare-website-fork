import React, { useState } from 'react';
import { Heart, CreditCard, Gift, Share2, Copy, Check } from 'lucide-react';

const DonateSection: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const bankDetails = {
    accName: 'Arham Yuva Seva Group',
    accNo: '50200023412345',
    ifsc: 'HDFC0000001',
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      // Modern clipboard API (requires HTTPS)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllDetails = () => {
    const allDetails = `Account Name: ${bankDetails.accName}\nAccount No: ${bankDetails.accNo}\nIFSC: ${bankDetails.ifsc}`;
    copyToClipboard(allDetails, 'all');
  };

  return (
    <section id="donate" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-6 fill-current animate-pulse-slow" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Help Us Save More Lives</h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            Every contribution helps us fuel an ambulance, buy medicine, or feed a recovered animal.
            We maintain 100% transparency in our funds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Bank Transfer Card */}
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-all text-center group">
            <div className="w-14 h-14 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <CreditCard size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Bank Transfer</h3>
            <p className="text-slate-300 text-sm mb-6">Directly transfer to our NGO account. Tax exempted under 80G.</p>

            <div className="bg-black/30 p-4 rounded-xl text-left text-sm space-y-3">
              <div className="flex justify-between items-center gap-2">
                <div>
                  <span className="text-slate-500 text-xs block">Account Name</span>
                  <span className="text-slate-200 font-medium">{bankDetails.accName}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.accName, 'accName')}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Copy account name"
                >
                  {copied === 'accName' ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-slate-400" />}
                </button>
              </div>

              <div className="flex justify-between items-center gap-2">
                <div>
                  <span className="text-slate-500 text-xs block">Account Number</span>
                  <span className="text-slate-200 font-mono font-medium">{bankDetails.accNo}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.accNo, 'accNo')}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Copy account number"
                >
                  {copied === 'accNo' ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-slate-400" />}
                </button>
              </div>

              <div className="flex justify-between items-center gap-2">
                <div>
                  <span className="text-slate-500 text-xs block">IFSC Code</span>
                  <span className="text-slate-200 font-mono font-medium">{bankDetails.ifsc}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(bankDetails.ifsc, 'ifsc')}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Copy IFSC code"
                >
                  {copied === 'ifsc' ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-slate-400" />}
                </button>
              </div>
            </div>

            <button
              onClick={copyAllDetails}
              className="w-full mt-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 font-semibold transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Copy all bank details to clipboard"
            >
              {copied === 'all' ? (
                <>
                  <Check size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy All Details
                </>
              )}
            </button>
          </div>

          {/* Sponsor Card */}
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-all text-center group">
            <div className="w-14 h-14 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Gift size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Sponsor an Ambulance</h3>
            <p className="text-slate-300 text-sm mb-6">Adopt the operational cost of one ambulance for a month or year.</p>
            <button
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Contact us to sponsor an ambulance"
            >
              Contact for Sponsorship
            </button>
          </div>

          {/* Donate Supplies Card */}
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-all text-center group">
            <div className="w-14 h-14 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Share2 size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Donate Supplies</h3>
            <p className="text-slate-300 text-sm mb-6">We accept medicine, old clothes, food, and medical equipment.</p>
            <button
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="View our donation wishlist"
            >
              View Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;

import React, { useState } from 'react';
import { Loader2, CheckCircle, ArrowRight, Shield, Heart } from 'lucide-react';

const impactCards = [
  { icon: '🚑', title: 'On-Ground Rescue Support', desc: 'Assist ambulance teams during rescues, transport animals, and coordinate emergency calls', color: 'bg-[#E8652E]/15' },
  { icon: '📢', title: 'Social Media & Awareness', desc: 'Create content, share rescue stories, and help spread the word across communities', color: 'bg-[#7A9E7E]/20' },
  { icon: '🤝', title: 'Fundraising & Events', desc: 'Organize campaigns, corporate drives, and community events to support operations', color: 'bg-amber-400/15' },
];

const roleOptions = [
  { id: 'rescue', icon: '🚑', label: 'Rescue Support' },
  { id: 'social', icon: '📱', label: 'Social Media' },
  { id: 'events', icon: '📋', label: 'Events' },
  { id: 'vet', icon: '💊', label: 'Vet / Medical' },
];

const stats = [
  { num: '35+', label: 'Ambulances' },
  { num: '9+', label: 'Cities' },
  { num: '100%', label: 'Free Care' },
  { num: '24/7', label: 'Operations' },
];

const Volunteer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set(['rescue']));

  const toggleRole = (id: string) => {
    setSelectedRoles(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      <section id="volunteer" className="grid md:grid-cols-2 md:h-screen">

        {/* ── LEFT: Story & Impact ── */}
        <div className="relative bg-[#1A1512] flex flex-col justify-center px-6 py-10 md:px-10 lg:px-12 md:py-10 overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(232,102,46,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(122,158,126,0.1) 0%, transparent 50%)' }} />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#E8652E]/30 to-transparent" />

          {/* Live ticker */}
          <div className="relative flex items-center gap-2.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
            <span className="text-[11px] tracking-[2px] uppercase text-white/60 font-semibold">247 rescues completed this week</span>
          </div>

          {/* Headline */}
          <h2 className="relative text-[clamp(26px,3.5vw,44px)] font-extrabold leading-[1.1] text-white mb-4">
            Every Rescue Needs<br />
            <em className="italic text-[#E8652E] relative">
              Someone Like You
              <span className="absolute bottom-0.5 left-0 w-full h-[3px] bg-[#E8652E]/40 rounded-full" />
            </em>
          </h2>

          {/* Sub-text */}
          <p className="relative text-[14px] leading-[1.6] text-white/65 max-w-[420px] mb-6">
            Join 75+ vets and volunteers saving hundreds of injured street animals daily across 9 cities. Whether you have an hour a week or a day a month — your time directly saves lives.
          </p>

          {/* Impact cards */}
          <div className="relative flex flex-col gap-2.5">
            {impactCards.map(card => (
              <div
                key={card.title}
                className="flex items-center gap-3 px-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-xl transition-all duration-300 hover:bg-white/[0.08] hover:border-[#E8652E]/20 hover:translate-x-1.5 cursor-default"
              >
                <div className={`w-9 h-9 rounded-lg ${card.color} flex items-center justify-center text-lg shrink-0`}>
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-white tracking-wide">{card.title}</h4>
                  <p className="text-[11px] text-white/45 leading-snug">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="relative flex flex-wrap gap-5 md:gap-8 mt-8 pt-5 border-t border-white/[0.08]">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-[22px] font-extrabold text-[#E8652E] leading-none">{s.num}</div>
                <div className="text-[10px] uppercase tracking-[1.5px] text-white/40 font-semibold mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="relative bg-[#FFF8F0] flex items-center justify-center px-5 py-8 md:px-8 lg:px-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(232,102,46,0.06) 0%, transparent 70%)' }} />

          <div className="relative z-10 w-full max-w-[460px]">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F0E9] rounded-full text-[11px] font-bold text-[#7A9E7E] uppercase tracking-wider mb-3">
              <Heart size={12} />
              Volunteer Application
            </div>

            <h3 className="text-[26px] font-extrabold text-[#1A1512] leading-tight mb-1">Start Making a Difference</h3>
            <p className="text-[13px] text-[#6B5E54] leading-relaxed mb-5">
              Fill this out in under 2 minutes. Our city coordinator will reach out within 48 hours.
            </p>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-14 h-14 text-green-500 mb-3" />
                <h4 className="text-lg font-bold text-[#1A1512] mb-2">Thank You!</h4>
                <p className="text-sm text-[#6B5E54]">Your application has been submitted. Our coordinator will contact you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
                  <div>
                    <label className="block text-[10.5px] font-bold tracking-wider uppercase text-[#6B5E54] mb-1.5">
                      First Name <span className="text-[#E8652E]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya"
                      className="w-full px-3.5 py-2.5 text-[13px] text-[#1A1512] bg-white border-[1.5px] border-[#E8E0D8] rounded-lg outline-none transition-all placeholder:text-[#B8ADA2] focus:border-[#E8652E] focus:shadow-[0_0_0_3px_rgba(232,102,46,0.08)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-bold tracking-wider uppercase text-[#6B5E54] mb-1.5">
                      Last Name <span className="text-[#E8652E]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sharma"
                      className="w-full px-3.5 py-2.5 text-[13px] text-[#1A1512] bg-white border-[1.5px] border-[#E8E0D8] rounded-lg outline-none transition-all placeholder:text-[#B8ADA2] focus:border-[#E8652E] focus:shadow-[0_0_0_3px_rgba(232,102,46,0.08)]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-3.5">
                  <label className="block text-[10.5px] font-bold tracking-wider uppercase text-[#6B5E54] mb-1.5">
                    Phone Number <span className="text-[#E8652E]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-[13px] text-[#1A1512] bg-white border-[1.5px] border-[#E8E0D8] rounded-lg outline-none transition-all placeholder:text-[#B8ADA2] focus:border-[#E8652E] focus:shadow-[0_0_0_3px_rgba(232,102,46,0.08)]"
                  />
                </div>

                {/* City */}
                <div className="mb-3.5">
                  <label className="block text-[10.5px] font-bold tracking-wider uppercase text-[#6B5E54] mb-1.5">
                    City <span className="text-[#E8652E]">*</span>
                  </label>
                  <select
                    required
                    defaultValue=""
                    className="w-full px-3.5 py-2.5 text-[13px] text-[#1A1512] bg-white border-[1.5px] border-[#E8E0D8] rounded-lg outline-none transition-all appearance-none cursor-pointer bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B5E54%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] pr-10 focus:border-[#E8652E] focus:shadow-[0_0_0_3px_rgba(232,102,46,0.08)]"
                  >
                    <option value="" disabled>Select your city</option>
                    <option>Mumbai</option>
                    <option>Hyderabad</option>
                    <option>Pune</option>
                    <option>Nagpur</option>
                    <option>Verawal</option>
                    <option>Gondal</option>
                    <option>Ahmedabad</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Role chips */}
                <div className="mb-3.5">
                  <div className="text-[10.5px] font-bold tracking-wider uppercase text-[#6B5E54] mb-2">
                    I'd like to help with <span className="text-[#E8652E]">*</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {roleOptions.map(role => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => toggleRole(role.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border-[1.5px] transition-all duration-200 select-none ${
                          selectedRoles.has(role.id)
                            ? 'bg-[#E8652E]/[0.08] border-[#E8652E] text-[#E8652E] font-semibold'
                            : 'bg-white border-[#E8E0D8] text-[#6B5E54] hover:border-[#FF8A57] hover:text-[#E8652E]'
                        }`}
                      >
                        <span className="text-[13px]">{role.icon}</span>
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div className="mb-4">
                  <label className="block text-[10.5px] font-bold tracking-wider uppercase text-[#6B5E54] mb-1.5">
                    Anything else?
                  </label>
                  <textarea
                    placeholder="Your availability, experience, or anything you'd like us to know..."
                    className="w-full px-3.5 py-2.5 text-[13px] text-[#1A1512] bg-white border-[1.5px] border-[#E8E0D8] rounded-lg outline-none transition-all resize-y min-h-[60px] placeholder:text-[#B8ADA2] focus:border-[#E8652E] focus:shadow-[0_0_0_3px_rgba(232,102,46,0.08)]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#E8652E] text-white font-bold text-[14px] tracking-wide rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(232,102,46,0.35)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Trust note */}
                <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-[#6B5E54] opacity-70">
                  <Shield size={12} className="text-[#7A9E7E]" />
                  Your information is safe with us — no spam, ever.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Social Proof Strip ── */}
      <div className="bg-[#F5EDE4] border-t border-black/[0.04] px-6 py-4 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5">
        <div className="flex">
          {[
            { letter: 'A', bg: 'bg-[#E8652E]' },
            { letter: 'R', bg: 'bg-[#7A9E7E]' },
            { letter: 'P', bg: 'bg-[#D4956A]' },
            { letter: 'K', bg: 'bg-[#7B8DBE]' },
          ].map((a, i) => (
            <div
              key={a.letter}
              className={`w-8 h-8 rounded-full ${a.bg} border-[2.5px] border-[#F5EDE4] flex items-center justify-center text-xs font-bold text-white ${i > 0 ? '-ml-2.5' : ''}`}
            >
              {a.letter}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full bg-white border-[2.5px] border-[#E8E0D8] flex items-center justify-center text-[10px] font-semibold text-[#6B5E54] -ml-2.5">
            75+
          </div>
        </div>
        <p className="text-[13px] text-[#6B5E54] text-center md:text-left">
          <strong className="text-[#1A1512] font-bold">75+ volunteers</strong> already making a difference across India — be the next one.
        </p>
      </div>
    </>
  );
};

export default Volunteer;

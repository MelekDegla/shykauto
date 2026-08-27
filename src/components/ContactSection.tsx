import React, { useState } from 'react';
import { Phone, Mail, MapPin, Copy, Check, Send, ExternalLink } from 'lucide-react';
import { CONTACT_DATA } from '../data/content';

interface ContactSectionProps {
  onOpenInquire: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquire }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [quickMessageSent, setQuickMessageSent] = useState(false);
  const [quickMessage, setQuickMessage] = useState({ name: '', contact: '', message: '' });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMessage.name || !quickMessage.contact) return;
    setQuickMessageSent(true);
    setTimeout(() => {
      setQuickMessageSent(false);
      setQuickMessage({ name: '', contact: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#faf9fc]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl text-[#000613] tracking-tight">
            Connect.
          </h2>
          <p className="font-mono-tech text-xs sm:text-sm tracking-[0.2em] text-[#43474e] uppercase font-bold mt-2">
            INITIATE CONTACT
          </p>
        </div>

        {/* 3 Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Phone */}
          <div className="bg-white border border-[#e2e8f0] hover:border-[#007aff] p-8 sm:p-10 rounded-sm transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
            <div>
              <div className="text-[#007aff] mb-8 group-hover:scale-110 transition-transform origin-left">
                <Phone size={24} strokeWidth={1.75} />
              </div>
              <div className="font-mono-tech text-xs tracking-wider text-[#43474e] font-bold uppercase mb-3">
                {CONTACT_DATA.phone.label}
              </div>
              <a
                href={CONTACT_DATA.phone.href}
                className="font-montserrat font-bold text-xl sm:text-2xl text-[#000613] hover:text-[#007aff] transition-colors block"
              >
                {CONTACT_DATA.phone.value}
              </a>
            </div>

            <div className="mt-8 pt-4 border-t border-[#e2e8f0]/60 flex items-center justify-between">
              <span className="font-mono-tech text-xs text-slate-400">LUN - SAM : 08H00 - 18H00</span>
              <button
                onClick={() => handleCopy(CONTACT_DATA.phone.value, 'phone')}
                title="Copier le numéro"
                className="text-xs font-mono-tech text-[#007aff] hover:text-[#000613] flex items-center gap-1"
              >
                {copiedKey === 'phone' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copiedKey === 'phone' ? 'Copié' : 'Copier'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white border border-[#e2e8f0] hover:border-[#007aff] p-8 sm:p-10 rounded-sm transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
            <div>
              <div className="text-[#007aff] mb-8 group-hover:scale-110 transition-transform origin-left">
                <Mail size={24} strokeWidth={1.75} />
              </div>
              <div className="font-mono-tech text-xs tracking-wider text-[#43474e] font-bold uppercase mb-3">
                {CONTACT_DATA.email.label}
              </div>
              <a
                href={CONTACT_DATA.email.href}
                className="font-montserrat font-bold text-lg sm:text-xl text-[#000613] hover:text-[#007aff] transition-colors break-all block"
              >
                {CONTACT_DATA.email.value}
              </a>
            </div>

            <div className="mt-8 pt-4 border-t border-[#e2e8f0]/60 flex items-center justify-between">
              <span className="font-mono-tech text-xs text-slate-400">RÉPONSE SOUS 2H</span>
              <button
                onClick={() => handleCopy(CONTACT_DATA.email.value, 'email')}
                title="Copier l'email"
                className="text-xs font-mono-tech text-[#007aff] hover:text-[#000613] flex items-center gap-1"
              >
                {copiedKey === 'email' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copiedKey === 'email' ? 'Copié' : 'Copier'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="bg-white border border-[#e2e8f0] hover:border-[#007aff] p-8 sm:p-10 rounded-sm transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
            <div>
              <div className="text-[#007aff] mb-8 group-hover:scale-110 transition-transform origin-left">
                <MapPin size={24} strokeWidth={1.75} />
              </div>
              <div className="font-mono-tech text-xs tracking-wider text-[#43474e] font-bold uppercase mb-3">
                {CONTACT_DATA.location.label}
              </div>
              <div className="font-montserrat font-bold text-lg sm:text-xl text-[#000613]">
                {CONTACT_DATA.location.primary}
              </div>
              <div className="font-grotesk text-base text-[#43474e] mt-0.5">
                {CONTACT_DATA.location.secondary}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#e2e8f0]/60 flex items-center justify-between">
              <span className="font-mono-tech text-xs text-slate-400">{CONTACT_DATA.location.coordinates}</span>
              <button
                onClick={onOpenInquire}
                className="text-xs font-mono-tech text-[#007aff] hover:text-[#000613] flex items-center gap-1 font-semibold"
              >
                <span>Prendre RDV</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>

        </div>

        {/* Quick Message Dispatch Panel */}
        <div className="mt-12 bg-white border border-[#e2e8f0] p-8 sm:p-10 rounded-sm shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <div className="font-mono-tech text-xs text-[#007aff] font-bold tracking-widest uppercase mb-1">
                DISPATCH TECHNIQUE DIRECT
              </div>
              <h3 className="font-montserrat font-bold text-2xl text-[#000613] tracking-tight">
                Une urgence sur votre groupe frigorifique ?
              </h3>
              <p className="font-grotesk text-sm text-[#43474e] mt-2">
                Nos techniciens mobiles interviennent sur site ou dans nos ateliers de Tunis pour diagnostiquer et rétablir votre froid immédiatement.
              </p>
            </div>

            <div className="lg:col-span-8">
              {quickMessageSent ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 flex items-center gap-3">
                  <Check className="text-emerald-600" size={24} />
                  <div>
                    <div className="font-bold font-montserrat">Demande reçue par notre régie technique !</div>
                    <div className="text-sm font-grotesk">Un ingénieur vous rappelle au numéro indiqué dans les 15 minutes.</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono-tech text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Nom / Société
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ex. Transports Express"
                      value={quickMessage.name}
                      onChange={(e) => setQuickMessage({ ...quickMessage, name: e.target.value })}
                      className="w-full bg-[#faf9fc] border border-[#e2e8f0] focus:border-[#007aff] px-3.5 py-2.5 rounded-sm font-grotesk text-sm text-[#000613] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-tech text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+216 -- --- ---"
                      value={quickMessage.contact}
                      onChange={(e) => setQuickMessage({ ...quickMessage, contact: e.target.value })}
                      className="w-full bg-[#faf9fc] border border-[#e2e8f0] focus:border-[#007aff] px-3.5 py-2.5 rounded-sm font-grotesk text-sm text-[#000613] outline-none font-mono-tech"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-[#000613] hover:bg-[#001f3f] text-white px-5 py-2.5 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 h-[42px]"
                    >
                      <Send size={14} />
                      <span>Rappel Immédiat</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

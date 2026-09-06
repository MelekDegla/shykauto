import React from 'react';
import { ActiveTab } from '../types';
import { COLORS } from '../constants/theme';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenInquire: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenInquire }) => {
  return (
    <footer className="text-white pt-20 pb-16 border-t border-[#1e293b] bg-[#05080f]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Top Section: Brand Name */}
        <div className="mb-14">
          <button
            onClick={() => {
              setActiveTab('home');
              if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group text-left focus:outline-none block"
          >
            <h2 className="font-montserrat font-black text-4xl sm:text-5xl tracking-tight uppercase">
              <span className="text-white group-hover:text-[#007aff] transition-colors duration-200">SHYK</span>
              {' '}
              <span className="text-white group-hover:text-[#cbd5e1] transition-colors duration-200">AUTO</span>
            </h2>
          </button>
          <p className="font-mono-tech text-xs tracking-widest uppercase mt-2 text-[#cbd5e1]">
            Automotive Climate & Refrigeration Engineering Since 1985
          </p>
        </div>

        {/* Middle Section: Links & Directory */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-[#1e293b]">
          
          {/* Links Column */}
          <div className="space-y-4">
            <div className="font-mono-tech text-xs font-bold uppercase tracking-widest text-slate-400">
              NAVIGATION
            </div>
            <ul className="space-y-3 font-grotesk text-sm text-slate-300">
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-[#cbd5e1] transition-colors"
                >
                  À propos & Histoire
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-[#cbd5e1] transition-colors"
                >
                  Nos Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className="hover:text-[#cbd5e1] transition-colors"
                >
                  Catalogue Produits
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="hover:text-[#cbd5e1] transition-colors"
                >
                  Galerie Réalisations
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-4">
            <div className="font-mono-tech text-xs font-bold uppercase tracking-widest text-slate-400">
              SOLUTIONS
            </div>
            <ul className="space-y-3 font-grotesk text-sm text-slate-300">
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-[#cbd5e1] transition-colors">
                  Groupes Frigorifiques Route
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-[#cbd5e1] transition-colors">
                  Unités Secteur 380V Standby
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#cbd5e1] transition-colors">
                  Systèmes Climatisation Diavia
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#cbd5e1] transition-colors">
                  Chauffages Webasto Air Top
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Certifications */}
          <div className="space-y-4">
            <div className="font-mono-tech text-xs font-bold uppercase tracking-widest text-slate-400">
              ACCRÉDITATIONS
            </div>
            <p className="font-grotesk text-xs text-slate-400 leading-relaxed">
              Centre technique agréé pour la pose, recharge thermodynamique, attestation d'étanchéité et mise en service conforme ATP.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="font-mono-tech text-[10px] px-2.5 py-1 rounded border bg-[#0a1329] text-[#cbd5e1] border-[#cbd5e1]/30">
                WEBASTO CERTIFIED
              </span>
              <span className="font-mono-tech text-[10px] px-2.5 py-1 rounded border bg-[#0a1329] text-[#cbd5e1] border-[#cbd5e1]/30">
                DIAVIA PARTNER
              </span>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="space-y-4">
            <div className="font-mono-tech text-xs font-bold uppercase tracking-widest text-slate-400">
              ATELIER CENTRAL
            </div>
            <div className="font-grotesk text-xs text-slate-300 space-y-1">
              <p>Zone Industrielle de Tunis</p>
              <p>Tunisie</p>
              <p className="font-mono-tech pt-2 text-[#cbd5e1] font-bold">+216 71 000 000</p>
            </div>
            <button
              onClick={onOpenInquire}
              className="px-5 py-2.5 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-wider transition-all w-full text-center bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] shadow-md"
            >
              Demander un Devis
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-slate-500">
          <div>
            <span>TUNISIE — EXPÉDITION & INTERVENTION NATIONALE</span>
          </div>
          <div className="tracking-widest uppercase">
            © 1985 SHYK AUTO. ARCHITECTURAL AUTOMOTIVE EXCELLENCE.
          </div>
        </div>

      </div>
    </footer>
  );
};

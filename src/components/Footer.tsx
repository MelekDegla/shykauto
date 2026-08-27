import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenInquire: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenInquire }) => {
  return (
    <footer className="bg-[#000613] text-white pt-20 pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Top Section: Brand Name */}
        <div className="mb-14">
          <h2 className="font-montserrat font-black text-4xl sm:text-5xl tracking-tight text-white uppercase">
            SHYK AUTO
          </h2>
          <p className="font-mono-tech text-xs text-[#00e3fd] tracking-widest uppercase mt-2">
            Automotive Climate & Refrigeration Engineering Since 1985
          </p>
        </div>

        {/* Middle Section: Links & Directory */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/10">
          
          {/* Links Column as in design */}
          <div className="space-y-4">
            <div className="font-mono-tech text-xs font-bold uppercase tracking-widest text-slate-400">
              LINKS
            </div>
            <ul className="space-y-3 font-grotesk text-sm text-slate-300">
              <li>
                <button
                  onClick={() => alert("Politique de Confidentialité : SHYK AUTO protège rigoureusement vos données techniques et d'entreprise.")}
                  className="hover:text-[#00e3fd] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Conditions Générales de Service : Interventions techniques certifiées conformes aux spécifications constructeurs.")}
                  className="hover:text-[#00e3fd] transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('heritage');
                    document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#00e3fd] transition-colors"
                >
                  Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#00e3fd] transition-colors"
                >
                  Global Locations
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
                <button onClick={() => setActiveTab('inventory')} className="hover:text-[#00e3fd] transition-colors">
                  Groupes Frigorifiques Route
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('inventory')} className="hover:text-[#00e3fd] transition-colors">
                  Unités Secteur 380V Standby
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#00e3fd] transition-colors">
                  Systèmes Climatisation Diavia
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#00e3fd] transition-colors">
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
              <span className="font-mono-tech text-[10px] bg-[#001f3f] px-2.5 py-1 rounded text-[#00e3fd] border border-[#00e3fd]/30">
                WEBASTO CERTIFIED
              </span>
              <span className="font-mono-tech text-[10px] bg-[#001f3f] px-2.5 py-1 rounded text-[#00e3fd] border border-[#00e3fd]/30">
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
              <p className="font-mono-tech text-[#00e3fd] pt-2">+216 71 000 000</p>
            </div>
            <button
              onClick={onOpenInquire}
              className="bg-[#00e3fd] hover:bg-[#00c5dc] text-[#000613] px-5 py-2.5 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-wider transition-all w-full text-center"
            >
              Prendre Rendez-vous
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-slate-400">
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

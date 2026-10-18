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

        {/* Top Section: Brand Name & Intro */}
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
          <p className="font-mono-tech text-xs tracking-widest uppercase mt-2 text-[#cbd5e1] font-bold">
            Froid embarqué • Climatisation automobile • Solutions thermiques
          </p>
          <p className="font-grotesk text-sm text-slate-400 max-w-2xl mt-3 leading-relaxed">
            Depuis 1985, SHYK AUTO accompagne les professionnels et les particuliers dans l’installation, la maintenance et la réparation de leurs équipements frigorifiques et systèmes de climatisation automobile.
          </p>
        </div>

        {/* Middle Section: Links & Directory */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-[#1e293b]">

          {/* Navigation Column */}
          <div className="space-y-4">
            <div className="font-mono-tech text-xs font-bold uppercase tracking-widest text-slate-400">
              NAVIGATION
            </div>
            <ul className="space-y-3 font-grotesk text-sm text-slate-300">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-[#cbd5e1] transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-[#cbd5e1] transition-colors"
                >
                  À propos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-[#cbd5e1] transition-colors"
                >
                  Nos services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className="hover:text-[#cbd5e1] transition-colors"
                >
                  Nos solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="hover:text-[#cbd5e1] transition-colors"
                >
                  Nos réalisations
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-[#cbd5e1] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-4">
            <div className="font-mono-tech text-xs font-bold uppercase tracking-widest text-slate-400">
              NOS SOLUTIONS
            </div>
            <ul className="space-y-3 font-grotesk text-sm text-slate-300">
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#cbd5e1] transition-colors">
                  Groupes frigorifiques
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#cbd5e1] transition-colors">
                  Véhicules isothermes
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#cbd5e1] transition-colors">
                  Climatisation automobile
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('services')} className="hover:text-[#cbd5e1] transition-colors">
                  Maintenance & intervention
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-[#cbd5e1] transition-colors">
                  Équipements & pièces
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4 md:col-span-2">
            <div className="font-mono-tech text-xs font-bold uppercase tracking-widest text-slate-400">
              CONTACT
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="font-grotesk text-xs text-slate-300 space-y-1.5">
                <div className="font-mono-tech text-[11px] text-slate-400 font-bold uppercase">Siège & Atelier (Tunis)</div>
                <p>1 Rue Méditerranée, Ezzahra</p>
                <p>2034 Ben Arous, Tunisie</p>
                <div className="space-y-0.5 font-mono-tech text-xs pt-1">
                  <div>
                    <a href="tel:+21699321543" className="text-[#cbd5e1] font-bold hover:text-white transition-colors">
                      +216 99 321 543
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <a href="tel:+21620555593" className="hover:text-[#cbd5e1] transition-colors">
                      +216 20 555 593
                    </a>
                    <span>/</span>
                    <a href="tel:+21656321570" className="hover:text-[#cbd5e1] transition-colors">
                      56 321 570
                    </a>
                  </div>
                </div>

                <div className="font-mono-tech text-[11px] text-slate-400 font-bold uppercase pt-2">Filiale (Sousse)</div>
                <p className="text-slate-200 font-semibold">Climatisation Auto</p>
                <p>16, Route de Tunis 4011 - H.Sousse</p>
                <div className="space-y-0.5 font-mono-tech text-xs pt-0.5">
                  <a href="tel:+21673361817" className="text-[#cbd5e1] font-bold hover:text-white transition-colors block">
                    Tél : (+216) 73 361 817
                  </a>
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <span>Mob :</span>
                    <a href="tel:+21651230400" className="hover:text-[#cbd5e1] transition-colors">
                      (+216) 51 230 400
                    </a>
                    <span>/</span>
                    <a href="tel:+21692311027" className="hover:text-[#cbd5e1] transition-colors">
                      92 311 027
                    </a>
                  </div>
                </div>
              </div>

              <div className="font-grotesk text-xs text-slate-300 space-y-2">
                <div className="font-mono-tech text-[11px] text-slate-400 font-bold uppercase">Courriels Directs</div>
                <div>
                  <span className="font-mono-tech text-[10px] text-slate-400 uppercase block">Siège :</span>
                  <a href="mailto:soniadhoukar@shykauto.tn" className="font-mono-tech text-[#cbd5e1] hover:text-white">
                    soniadhoukar@shykauto.tn
                  </a>
                </div>
                <div>
                  <span className="font-mono-tech text-[10px] text-slate-400 uppercase block">Filiale Sousse :</span>
                  <a href="mailto:commercial@autoclimdoucar.com" className="font-mono-tech text-[#cbd5e1] hover:text-white break-all">
                    commercial@autoclimdoucar.com
                  </a>
                </div>

                <div className="font-mono-tech text-[11px] text-slate-400 font-bold uppercase pt-2">Horaires d'Ouverture</div>
                <p>Lundi – Vendredi : 08h00 – 18h00</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-slate-500">
          <div>
            <span>© 2026 SHYK AUTO — Tous droits réservés. Froid embarqué & climatisation automobile depuis 1985.</span>
          </div>
          <div className="flex gap-4">
            <a href="#contact" className="hover:text-slate-300 transition-colors">Mentions légales</a>
            <span>·</span>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Politique de confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

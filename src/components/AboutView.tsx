import React from 'react';
import { HeritageSection } from './HeritageSection';
import { TechnicalSection } from './TechnicalSection';
import { Target, Compass, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COLORS } from '../constants/theme';

interface AboutViewProps {
  onOpenInquire: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenInquire }) => {
  return (
    <div className="w-full bg-[#f4f5f7] text-[#0f172a]">
      {/* Page Header */}
      <section className="py-16 sm:py-20 border-b border-[#1e293b] relative overflow-hidden bg-[#070b14] text-white">
        <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
          <span className="font-mono-tech text-xs tracking-widest uppercase font-bold text-[#cbd5e1] mb-2 inline-block">
            QUI SOMMES-NOUS
          </span>
          <h1 className="font-montserrat font-black text-4xl sm:text-6xl tracking-tight uppercase text-white">
            À Propos de <span className="text-[#007aff]">Shyk</span><span className="text-[#cbd5e1]">Auto.</span>
          </h1>
          <p className="font-grotesk text-slate-300 text-base sm:text-xl max-w-3xl mt-4 font-light leading-relaxed">
            Depuis 1985, quatre décennies d'excellence thermodynamique, d'ingénierie frigorifique mobile et d'accompagnement technique pour l'automobile et les transports professionnels en Tunisie.
          </p>
        </div>
      </section>

      {/* 1. Histoire de l'entreprise (Heritage & Timeline) */}
      <div id="histoire">
        <HeritageSection />
      </div>

      {/* 2. Notre Expertise (Technical Blueprint Diagram) */}
      <div id="expertise">
        <TechnicalSection />
      </div>

      {/* 3. Vision et Mission */}
      <section id="vision-mission" className="py-24 lg:py-32 border-b border-[#e2e8f0] bg-[#f4f5f7]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono-tech text-xs tracking-[0.2em] text-[#007aff] uppercase font-bold">
              ORIENTATIONS STRATÉGIQUES
            </span>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-5xl tracking-tight mt-2 text-[#0f172a]">
              Vision, Mission & <span className="text-[#007aff]">Valeurs.</span>
            </h2>
            <p className="font-grotesk text-sm sm:text-base text-[#43474e] mt-3">
              Les piliers fondamentaux qui guident chacune de nos interventions et notre développement technologique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Vision */}
            <div className="p-8 sm:p-10 rounded-sm border border-[#e2e8f0] bg-white hover:border-[#000613] shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
              <div>
                <div className="w-14 h-14 rounded bg-[#f4f5f7] border border-[#e2e8f0] flex items-center justify-center text-[#007aff] mb-6 shadow-sm group-hover:bg-[#000613] group-hover:border-[#000613] group-hover:text-[#cbd5e1] transition-colors">
                  <Compass size={28} />
                </div>
                <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#007aff] block mb-2">
                  NOTRE HORIZON
                </span>
                <h3 className="font-montserrat font-bold text-2xl text-[#0f172a] mb-4">
                  Notre Vision
                </h3>
                <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                  Devenir le pôle d'excellence incontournable du froid mobile propre et connecté en Afrique du Nord, en intégrant des systèmes frigorifiques 100% électriques et des fluides frigorigènes éco-responsables à faible impact environnemental.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#e2e8f0] text-xs font-mono-tech text-slate-500">
                TRANSITION ÉNERGÉTIQUE & ZÉRO ÉMISSION
              </div>
            </div>

            {/* Card 2: Mission */}
            <div className="p-8 sm:p-10 rounded-sm border border-[#e2e8f0] bg-white hover:border-[#000613] shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
              <div>
                <div className="w-14 h-14 rounded bg-[#f4f5f7] border border-[#e2e8f0] flex items-center justify-center text-sky-500 mb-6 shadow-sm">
                  <Target size={28} className="text-sky-400" />
                </div>
                <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-sky-400 block mb-2">
                  NOTRE ENGAGEMENT QUOTIDIEN
                </span>
                <h3 className="font-montserrat font-bold text-2xl text-[#0f172a] mb-4">
                  Notre Mission
                </h3>
                <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                  Sécuriser sans faille la chaîne du froid des denrées alimentaires et des produits pharmaceutiques vitaux grâce à une ingénierie thermique de pointe, un calibrage méticuleux et une réactivité d'intervention 24h/24 pour garantir zéro rupture de froid.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#e2e8f0] text-xs font-mono-tech text-slate-500">
                SÉCURITÉ SANITAIRE CERTIFIÉE ATP & HACCP
              </div>
            </div>

            {/* Card 3: Valeurs */}
            <div className="p-8 sm:p-10 rounded-sm border border-[#e2e8f0] bg-white hover:border-[#000613] shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
              <div>
                <div className="w-14 h-14 rounded bg-[#f4f5f7] border border-[#e2e8f0] flex items-center justify-center text-emerald-500 mb-6 shadow-sm">
                  <ShieldCheck size={28} />
                </div>
                <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                  NOS EXIGENCES
                </span>
                <h3 className="font-montserrat font-bold text-2xl text-[#0f172a] mb-4">
                  Nos Valeurs
                </h3>
                <ul className="space-y-3 font-grotesk text-sm sm:text-base text-[#43474e]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                    <span><strong className="text-[#0f172a]">Précision :</strong> Tolérances micrométriques et étanchéité absolue.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                    <span><strong className="text-[#0f172a]">Durabilité :</strong> Composants OEM d'origine certifiée uniquement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-1" />
                    <span><strong className="text-[#0f172a]">Disponibilité :</strong> Support et dépannage rapide pour flottes.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#e2e8f0] text-xs font-mono-tech text-slate-500">
                QUALITÉ SUPÉRIEURE & CONFIANCE CLIENT
              </div>
            </div>

          </div>

          {/* Quick CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={onOpenInquire}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-widest bg-[#000613] hover:bg-[#001f3f] text-white shadow-md transition-all"
            >
              <span>Demander une étude personnalisée</span>
              <ArrowRight size={15} />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

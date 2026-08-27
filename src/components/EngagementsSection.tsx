import React from 'react';
import { ShieldCheck, Timer, HeartHandshake, Eye } from 'lucide-react';
import { ENGAGEMENTS_DATA, TRANSPARENCE_DATA } from '../data/content';

export const EngagementsSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#faf9fc] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl text-[#000613] tracking-tight">
            Nos Engagements
          </h2>
          <p className="font-mono-tech text-xs sm:text-sm tracking-[0.2em] text-[#43474e] uppercase font-bold mt-3">
            THE STANDARDS WE HOLD
          </p>
        </div>

        {/* 3 Ghost Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
          
          {/* Card 1: Qualité Supérieure */}
          <div className="bg-white border border-[#e2e8f0] hover:border-[#000613] p-8 sm:p-10 rounded-sm transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between">
            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-sm bg-[#faf9fc] border border-[#e2e8f0] flex items-center justify-center text-[#000613] group-hover:bg-[#000613] group-hover:text-[#00e3fd] transition-colors mb-8">
                <ShieldCheck size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-[#000613] tracking-tight mb-4">
                Qualité Supérieure
              </h3>
              <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                Des pièces d'origine et une exécution irréprochable pour chaque intervention.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#e2e8f0]/60 flex items-center justify-between text-xs font-mono-tech text-slate-400">
              <span>NORME ISO 9001 / ATP</span>
              <span className="text-[#007aff] font-bold">100% OEM</span>
            </div>
          </div>

          {/* Card 2: Délais Respectés */}
          <div className="bg-white border border-[#e2e8f0] hover:border-[#000613] p-8 sm:p-10 rounded-sm transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-sm bg-[#faf9fc] border border-[#e2e8f0] flex items-center justify-center text-[#000613] group-hover:bg-[#000613] group-hover:text-[#00e3fd] transition-colors mb-8">
                <Timer size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-[#000613] tracking-tight mb-4">
                Délais Respectés
              </h3>
              <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                Une gestion du temps rigoureuse pour minimiser l'immobilisation de vos véhicules.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#e2e8f0]/60 flex items-center justify-between text-xs font-mono-tech text-slate-400">
              <span>DISPONIBILITÉ FLOTTE</span>
              <span className="text-[#007aff] font-bold">EXPRESS 24H</span>
            </div>
          </div>

          {/* Card 3: Service Client */}
          <div className="bg-white border border-[#e2e8f0] hover:border-[#000613] p-8 sm:p-10 rounded-sm transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-sm bg-[#faf9fc] border border-[#e2e8f0] flex items-center justify-center text-[#000613] group-hover:bg-[#000613] group-hover:text-[#00e3fd] transition-colors mb-8">
                <HeartHandshake size={24} strokeWidth={1.75} />
              </div>
              <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-[#000613] tracking-tight mb-4">
                Service Client
              </h3>
              <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                Un accompagnement personnalisé et transparent tout au long de notre collaboration.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#e2e8f0]/60 flex items-center justify-between text-xs font-mono-tech text-slate-400">
              <span>SUPPORT DÉDIÉ</span>
              <span className="text-[#007aff] font-bold">ASSISTANCE PRO</span>
            </div>
          </div>

        </div>

        {/* Wide Card: Transparence Totale */}
        <div className="relative bg-white border border-[#e2e8f0] border-t-4 border-t-[#007aff] p-8 sm:p-12 rounded-sm shadow-sm transition-all duration-300">
          
          {/* Header with Eye Icon */}
          <div className="flex items-center gap-3 mb-8">
            <div className="text-[#007aff]">
              <Eye size={22} strokeWidth={2} />
            </div>
            <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-[#000613] tracking-tight">
              {TRANSPARENCE_DATA.title}
            </h3>
          </div>

          {/* Two-Column Detail Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 pt-2">
            
            {/* Column 1: Tarification */}
            <div className="space-y-2">
              <div className="font-mono-tech text-xs tracking-wider text-[#43474e] font-bold uppercase">
                {TRANSPARENCE_DATA.tarification.label}
              </div>
              <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                {TRANSPARENCE_DATA.tarification.description}
              </p>
            </div>

            {/* Column 2: Suivi */}
            <div className="space-y-2">
              <div className="font-mono-tech text-xs tracking-wider text-[#43474e] font-bold uppercase">
                {TRANSPARENCE_DATA.suivi.label}
              </div>
              <p className="font-grotesk text-sm sm:text-base text-[#43474e] leading-relaxed">
                {TRANSPARENCE_DATA.suivi.description}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

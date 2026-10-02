import React from 'react';
import { ArrowRight, ThermometerSnowflake, ShieldCheck, Wrench } from 'lucide-react';
import heroTruckImage from '../../assets/images/shyk-auto-hero.jpg';
import { COLORS } from '../constants/theme';

interface HeroSectionProps {
  onOpenInquire: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenInquire,
  onExploreServices,
}) => {
  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#000d1a]">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={typeof heroTruckImage === 'string' ? heroTruckImage : (heroTruckImage as any).src}
          alt="SHYK AUTO Camionnette frigorifique avec groupe froid"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-right md:object-center opacity-85 filter brightness-95 contrast-105"
        />
        {/* Cinematic Gradient Overlays for optimal readability and depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000814]/95 via-[#000d1a]/50 to-[#000d1a]/0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-[#000814]/0" />
      </div>

      {/* Blueprint Subgrid overlay subtle effect */}
      <div className="absolute inset-0 blueprint-subgrid opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20 lg:py-28 w-full">
        <div className="max-w-3xl">
          {/* Badge Above Title */}
          <div className="inline-block font-mono-tech text-xs tracking-widest uppercase font-bold text-[#cbd5e1] bg-white/10 px-3.5 py-1.5 rounded border border-white/20 mb-4 backdrop-blur-sm">
            CLIMATISATION AUTOMOBILE & RÉFRIGÉRATION EMBARQUÉE
          </div>

          {/* Main Display Headline */}
          <h1 className="font-montserrat font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.1] mb-6 sm:mb-8 drop-shadow-sm">
            Votre spécialiste
          </h1>
            <h1 className="font-montserrat font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[1.1] mb-6 sm:mb-8 drop-shadow-sm">
            du froid et de la climatisation depuis 1985.
          </h1>

          {/* Description text with vertical accent indicator */}
          <div className="flex flex-col gap-3 border-l-4 border-[#cbd5e1] pl-4 sm:pl-6 py-1 max-w-2xl">
            <p className="font-grotesk text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              De la climatisation automobile aux systèmes de réfrigération pour véhicules et cabines isothermes, SHYK AUTO vous accompagne dans l'installation, l'équipement et la maintenance de vos solutions thermiques.
            </p>
            <p className="font-mono-tech text-xs text-[#cbd5e1]/80 tracking-wider">
              Une expertise développée depuis 1985 avec DOUCAR.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              id="hero-inquire-btn"
              onClick={onOpenInquire}
              className="px-8 py-3.5 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-widest bg-[#cbd5e1] hover:bg-[#e2e8f0] text-[#000613] shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <span>Demander un devis</span>
              <ArrowRight size={15} />
            </button>

            <button
              id="hero-explore-btn"
              onClick={onExploreServices}
              className="px-7 py-3.5 rounded-sm font-mono-tech text-xs font-semibold uppercase tracking-widest bg-[#000613]/80 hover:bg-[#001f3f] border border-white/20 hover:border-[#cbd5e1] text-white transition-all duration-200 backdrop-blur-sm"
            >
              Découvrir nos solutions
            </button>
          </div>

          {/* Key Stat Indicators */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded border bg-white/5 border-white/10 text-[#cbd5e1]">
                <Wrench size={18} />
              </div>
              <div>
                <div className="font-montserrat font-extrabold text-xl text-white">40+</div>
                <div className="font-mono-tech text-xs tracking-wider text-slate-300">Années d'expérience</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded border bg-white/5 border-white/10 text-[#cbd5e1]">
                <ThermometerSnowflake size={18} />
              </div>
              <div>
                <div className="font-montserrat font-extrabold text-xl text-white">1985</div>
                <div className="font-mono-tech text-xs tracking-wider text-slate-300">Fondation DOUCAR</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded border bg-white/5 border-white/10 text-[#cbd5e1]">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="font-montserrat font-extrabold text-xl text-white">2003</div>
                <div className="font-mono-tech text-xs tracking-wider text-slate-300">Naissance de SHYK AUTO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

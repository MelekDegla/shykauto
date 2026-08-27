import React from 'react';
import { ArrowRight, ThermometerSnowflake, ShieldCheck, Wrench } from 'lucide-react';

interface HeroSectionProps {
  onOpenInquire: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenInquire,
  onExploreServices,
}) => {
  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-center overflow-hidden bg-[#001122]">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=2000&q=85"
          alt="SHYK AUTO Refrigerated Transport Vehicle"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-70 filter contrast-105"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b18]/90 via-[#001122]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000b18] via-transparent to-black/30" />
      </div>

      {/* Blueprint Subgrid overlay subtle effect */}
      <div className="absolute inset-0 blueprint-subgrid opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20 lg:py-28 w-full">
        <div className="max-w-3xl">
          {/* Main Display Headline */}
          <h1 className="font-montserrat font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95] mb-6 sm:mb-8 drop-shadow-sm">
            ARCHITECTS<br />
            OF COLD.
          </h1>

          {/* Subtitle with vertical blue accent indicator */}
          <div className="flex items-start gap-4 sm:gap-5 border-l-4 border-[#007aff] pl-4 sm:pl-6 py-1 max-w-2xl">
            <p className="font-grotesk text-lg sm:text-xl lg:text-2xl text-slate-100 font-light leading-relaxed">
              Leading automotive climate & refrigeration in Tunisia since 1985.<br className="hidden sm:inline" />
              Engineering precise environmental control for specialized transport.
            </p>
          </div>

          {/* Quick Action Badges / CTAs */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              id="hero-inquire-btn"
              onClick={onOpenInquire}
              className="bg-[#00e3fd] hover:bg-[#00c5dc] text-[#000613] px-8 py-3.5 rounded-sm font-mono-tech text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-2 shadow-lg shadow-[#00e3fd]/10 hover:shadow-[#00e3fd]/25"
            >
              <span>Demander une étude technique</span>
              <ArrowRight size={15} />
            </button>

            <button
              id="hero-explore-btn"
              onClick={onExploreServices}
              className="bg-[#000613]/80 hover:bg-[#001f3f] border border-white/20 hover:border-[#00e3fd] text-white px-7 py-3.5 rounded-sm font-mono-tech text-xs font-semibold uppercase tracking-widest transition-all duration-200 backdrop-blur-sm"
            >
              Découvrir nos solutions
            </button>
          </div>

          {/* Engineering Metadata Badges */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-[#00e3fd]">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-slate-400">Homologation</div>
                <div className="font-montserrat font-bold text-sm text-white">WEBASTO & DIAVIA</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-[#00e3fd]">
                <ThermometerSnowflake size={18} />
              </div>
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-slate-400">Plage Thermique</div>
                <div className="font-montserrat font-bold text-sm text-white">-25°C à +15°C ATP</div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div className="p-2 rounded bg-white/5 border border-white/10 text-[#00e3fd]">
                <Wrench size={18} />
              </div>
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-slate-400">Expérience</div>
                <div className="font-montserrat font-bold text-sm text-white">40 Ans d'Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

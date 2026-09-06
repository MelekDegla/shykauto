import React, { useState } from 'react';
import { TECHNICAL_PARTS } from '../data/content';
import { Settings, Snowflake, Cpu, Info } from 'lucide-react';
import { TechnicalPart } from '../types';
import { COLORS } from '../constants/theme';

export const TechnicalSection: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<TechnicalPart>(TECHNICAL_PARTS[0]);
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);

  const accentColor = COLORS.primary; // #cbd5e1

  return (
    <section id="services" className="py-24 lg:py-32 text-white relative overflow-hidden bg-[#070b14] border-b border-[#1e293b]">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Service Specifications */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              {/* Eyebrow */}
              <div className="font-mono-tech text-xs tracking-widest uppercase font-bold mb-3 flex items-center gap-2 text-[#cbd5e1]">
                <span className="w-2 h-2 rounded-full animate-ping bg-[#cbd5e1]" />
                <span>PRECISION ENGINEERING</span>
              </div>

              {/* Title */}
              <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                Équipe Technique & Expertise
              </h2>
            </div>

            {/* Description */}
            <p className="font-grotesk text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Notre équipe est composée d'experts frigoristes certifiés. Partenaires de confiance de WEBASTO et DIAVIA, nous garantissons des interventions et calibrages d'une précision micrométrique.
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-[#1e293b] w-full my-6" />

            {/* Feature 1 & 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Diagnostics Avancés */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-[#cbd5e1]">
                  <div className="p-2 rounded-sm border bg-[#0a1428] border-[#cbd5e1]/40">
                    <Settings size={18} className="text-[#cbd5e1]" />
                  </div>
                  <h3 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-white">
                    DIAGNOSTICS AVANCÉS
                  </h3>
                </div>
                <p className="font-grotesk text-xs sm:text-sm text-slate-400 leading-normal">
                  Analyse thermodynamique sous azote et résolution de fuites complexes.
                </p>
              </div>

              {/* Installation Premium */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-[#cbd5e1]">
                  <div className="p-2 rounded-sm border bg-[#0a1428] border-[#cbd5e1]/40">
                    <Snowflake size={18} className="text-[#cbd5e1]" />
                  </div>
                  <h3 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-white">
                    INSTALLATION PREMIUM
                  </h3>
                </div>
                <p className="font-grotesk text-xs sm:text-sm text-slate-400 leading-normal">
                  Intégration de circuits frigorifiques certifiés normes ATP et FRC.
                </p>
              </div>
            </div>

            {/* Selected Component Quick Inspector */}
            {selectedPart && (
              <div className="mt-8 p-5 border border-[#cbd5e1]/30 rounded-sm bg-[#0d1527] shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Info size={14} className="text-[#cbd5e1]" />
                    <span className="font-mono-tech text-xs font-bold text-[#cbd5e1]">
                      {selectedPart.name} ({selectedPart.code})
                    </span>
                  </div>
                  <span className="font-mono-tech text-[10px] text-slate-400 uppercase">
                    {selectedPart.category}
                  </span>
                </div>
                <p className="font-grotesk text-xs text-slate-300 mb-3 leading-relaxed">
                  {selectedPart.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedPart.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="font-mono-tech text-[10px] px-2 py-0.5 rounded text-slate-300 border bg-[#070b14] border-slate-700"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Technical Blueprint Schematic */}
          <div className="lg:col-span-7">
            <div className="relative border border-[#cbd5e1]/30 p-6 sm:p-8 rounded-sm shadow-2xl overflow-hidden bg-[#0a1122]">
              
              {/* Technical Blueprint Grid background */}
              <div className="absolute inset-0 blueprint-grid opacity-50" />
              <div className="absolute inset-0 blueprint-subgrid opacity-30" />

              {/* Header inside blueprint */}
              <div className="relative z-10 flex items-center justify-between border-b border-[#cbd5e1]/20 pb-3 mb-6">
                <div className="flex items-center gap-3">
                  <Cpu size={16} className="text-[#cbd5e1]" />
                  <span className="font-mono-tech text-xs uppercase tracking-widest font-bold text-[#cbd5e1]">
                    CIRCUIT THERMODYNAMIQUE // SCHÉMA ÉCLATÉ
                  </span>
                </div>
                <span className="font-mono-tech text-[10px] text-slate-400">
                  REV. 2026-A
                </span>
              </div>

              {/* Interactive Blueprint Schematic Area */}
              <div className="relative z-10 aspect-[4/3] w-full max-w-2xl mx-auto flex items-center justify-center">
                <svg
                  viewBox="0 0 800 600"
                  className="w-full h-full stroke-current stroke-[1.5] fill-none"
                  style={{ color: accentColor }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(203, 213, 225, 0.15)" strokeWidth="0.5" />
                    </pattern>
                  </defs>

                  <rect width="800" height="600" fill="url(#grid)" />

                  {/* Connecting Piping (Refrigeration lines) */}
                  <path
                    d="M 280 430 L 280 230 L 320 230"
                    stroke={accentColor}
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                  <path
                    d="M 440 230 L 580 230 L 580 290"
                    stroke={accentColor}
                    strokeWidth="2"
                  />
                  <path
                    d="M 600 320 L 600 210 L 640 210"
                    stroke={accentColor}
                    strokeWidth="2"
                  />
                  <path
                    d="M 720 280 L 720 480 L 300 480 L 300 450"
                    stroke={accentColor}
                    strokeWidth="3"
                    strokeDasharray="6 3"
                  />

                  {/* 1. CONDENSER COIL (Left Top) */}
                  <g
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedPart(TECHNICAL_PARTS[0])}
                    onMouseEnter={() => setHoveredPartId('condenser')}
                    onMouseLeave={() => setHoveredPartId(null)}
                  >
                    <rect
                      x="180"
                      y="160"
                      width="150"
                      height="120"
                      fill={
                        hoveredPartId === 'condenser' || selectedPart.id === 'condenser'
                          ? 'rgba(203, 213, 225, 0.25)'
                          : 'rgba(0, 31, 63, 0.7)'
                      }
                      stroke={selectedPart.id === 'condenser' ? '#ffffff' : accentColor}
                      strokeWidth={selectedPart.id === 'condenser' ? '2.5' : '1.5'}
                      rx="4"
                    />
                    {/* Condenser fins */}
                    <line x1="195" y1="170" x2="195" y2="270" stroke={accentColor} strokeWidth="1" />
                    <line x1="210" y1="170" x2="210" y2="270" stroke={accentColor} strokeWidth="1" />
                    <line x1="225" y1="170" x2="225" y2="270" stroke={accentColor} strokeWidth="1" />
                    <line x1="240" y1="170" x2="240" y2="270" stroke={accentColor} strokeWidth="1" />
                    <line x1="255" y1="170" x2="255" y2="270" stroke={accentColor} strokeWidth="1" />
                    <line x1="270" y1="170" x2="270" y2="270" stroke={accentColor} strokeWidth="1" />
                    <line x1="285" y1="170" x2="285" y2="270" stroke={accentColor} strokeWidth="1" />
                    <line x1="300" y1="170" x2="300" y2="270" stroke={accentColor} strokeWidth="1" />
                    <line x1="315" y1="170" x2="315" y2="270" stroke={accentColor} strokeWidth="1" />

                    <line x1="255" y1="150" x2="255" y2="100" stroke={accentColor} strokeWidth="1" />
                    <line x1="255" y1="100" x2="160" y2="100" stroke={accentColor} strokeWidth="1" />
                    <text x="160" y="92" fill={accentColor} fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                      CONDENSER COIL
                    </text>
                  </g>

                  {/* 2. RECEIVER-DRIER */}
                  <g
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedPart(TECHNICAL_PARTS[2])}
                    onMouseEnter={() => setHoveredPartId('receiver')}
                    onMouseLeave={() => setHoveredPartId(null)}
                  >
                    <rect
                      x="560"
                      y="290"
                      width="60"
                      height="110"
                      rx="8"
                      fill={
                        hoveredPartId === 'receiver' || selectedPart.id === 'receiver'
                          ? 'rgba(203, 213, 225, 0.25)'
                          : 'rgba(0, 31, 63, 0.7)'
                      }
                      stroke={selectedPart.id === 'receiver' ? '#ffffff' : accentColor}
                      strokeWidth={selectedPart.id === 'receiver' ? '2.5' : '1.5'}
                    />
                    <circle cx="590" cy="330" r="10" stroke={accentColor} strokeWidth="1" />
                    <line x1="620" y1="345" x2="680" y2="345" stroke={accentColor} strokeWidth="1" />
                    <text x="685" y="349" fill={accentColor} fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                      RECEIVER-DRIER
                    </text>
                  </g>

                  {/* 3. EVAPORATOR CORE */}
                  <g
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedPart(TECHNICAL_PARTS[1])}
                    onMouseEnter={() => setHoveredPartId('evaporator')}
                    onMouseLeave={() => setHoveredPartId(null)}
                  >
                    <rect
                      x="640"
                      y="160"
                      width="130"
                      height="100"
                      rx="4"
                      fill={
                        hoveredPartId === 'evaporator' || selectedPart.id === 'evaporator'
                          ? 'rgba(203, 213, 225, 0.25)'
                          : 'rgba(0, 31, 63, 0.7)'
                      }
                      stroke={selectedPart.id === 'evaporator' ? '#ffffff' : accentColor}
                      strokeWidth={selectedPart.id === 'evaporator' ? '2.5' : '1.5'}
                    />
                    <circle cx="680" cy="210" r="22" stroke={accentColor} strokeWidth="1" />
                    <circle cx="730" cy="210" r="22" stroke={accentColor} strokeWidth="1" />

                    <line x1="705" y1="150" x2="705" y2="100" stroke={accentColor} strokeWidth="1" />
                    <text x="640" y="92" fill={accentColor} fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                      EVAPORATOR CORE
                    </text>
                  </g>

                  {/* 4. COMPRESSOR */}
                  <g
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedPart(TECHNICAL_PARTS[3])}
                    onMouseEnter={() => setHoveredPartId('compressor')}
                    onMouseLeave={() => setHoveredPartId(null)}
                  >
                    <rect
                      x="170"
                      y="370"
                      width="160"
                      height="110"
                      rx="6"
                      fill={
                        hoveredPartId === 'compressor' || selectedPart.id === 'compressor'
                          ? 'rgba(203, 213, 225, 0.25)'
                          : 'rgba(0, 31, 63, 0.7)'
                      }
                      stroke={selectedPart.id === 'compressor' ? '#ffffff' : accentColor}
                      strokeWidth={selectedPart.id === 'compressor' ? '2.5' : '1.5'}
                    />
                    <circle cx="210" cy="425" r="30" stroke={accentColor} strokeWidth="1.5" />
                    <circle cx="210" cy="425" r="12" stroke={accentColor} strokeWidth="1" />

                    <line x1="160" y1="425" x2="90" y2="425" stroke={accentColor} strokeWidth="1" />
                    <text x="10" y="420" fill={accentColor} fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                      COMPRESSOR ASSY
                    </text>
                  </g>

                  {/* 5. MOUNTING BRACKET */}
                  <g
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedPart(TECHNICAL_PARTS[4])}
                    onMouseEnter={() => setHoveredPartId('mounting')}
                    onMouseLeave={() => setHoveredPartId(null)}
                  >
                    <polygon
                      points="450,440 550,440 570,520 430,520"
                      fill={
                        hoveredPartId === 'mounting' || selectedPart.id === 'mounting'
                          ? 'rgba(203, 213, 225, 0.25)'
                          : 'rgba(0, 31, 63, 0.7)'
                      }
                      stroke={selectedPart.id === 'mounting' ? '#ffffff' : accentColor}
                      strokeWidth={selectedPart.id === 'mounting' ? '2.5' : '1.5'}
                    />
                    <circle cx="460" cy="465" r="4" stroke={accentColor} strokeWidth="1.5" />
                    <circle cx="530" cy="465" r="4" stroke={accentColor} strokeWidth="1.5" />
                    <circle cx="470" cy="500" r="5" stroke={accentColor} strokeWidth="1.5" />
                    <circle cx="550" cy="500" r="5" stroke={accentColor} strokeWidth="1.5" />

                    <line x1="560" y1="520" x2="620" y2="550" stroke={accentColor} strokeWidth="1" />
                    <line x1="620" y1="550" x2="720" y2="550" stroke={accentColor} strokeWidth="1" />
                    <text x="620" y="542" fill={accentColor} fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                      MOUNTING BRACKET
                    </text>
                  </g>

                  {/* Technical Blueprint Title Block in bottom right */}
                  <g transform="translate(620, 480)">
                    <rect x="0" y="0" width="165" height="95" fill="#070b14" stroke={accentColor} strokeWidth="1.5" />
                    <line x1="0" y1="24" x2="165" y2="24" stroke={accentColor} strokeWidth="1" />
                    <line x1="0" y1="48" x2="165" y2="48" stroke={accentColor} strokeWidth="1" />
                    <line x1="0" y1="72" x2="165" y2="72" stroke={accentColor} strokeWidth="1" />
                    <text x="8" y="16" fill={accentColor} fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">PROJECT: SHYK AUTO</text>
                    <text x="8" y="40" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono">DOUCAR THERMO-SYSTEM</text>
                    <text x="8" y="64" fill={accentColor} fontSize="9" fontFamily="JetBrains Mono">REF: A1-TN</text>
                    <text x="8" y="88" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono">SCALE: 1:5 CLINICAL</text>
                  </g>
                </svg>
              </div>

              {/* Instructions footer on schematic */}
              <div className="relative z-10 mt-4 flex items-center justify-between text-xs font-mono-tech text-slate-400 border-t border-[#cbd5e1]/20 pt-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#cbd5e1]" />
                  Cliquez sur un composant pour inspecter ses spécifications techniques
                </span>
                <span className="font-bold"><span className="text-[#007aff]">SHYK</span> <span className="text-[#cbd5e1]">CAD ENGINE</span></span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

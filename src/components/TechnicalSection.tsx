import React, { useState } from 'react';
import { TECHNICAL_PARTS } from '../data/content';
import { Settings, Snowflake, Wrench, Cpu, Check, Info } from 'lucide-react';
import { TechnicalPart } from '../types';

export const TechnicalSection: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<TechnicalPart>(TECHNICAL_PARTS[0]);
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#001122] text-white relative overflow-hidden">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Service Specifications */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              {/* Eyebrow */}
              <div className="font-mono-tech text-xs tracking-widest text-[#00e3fd] uppercase font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00e3fd] animate-ping" />
                <span>PRECISION ENGINEERING</span>
              </div>

              {/* Title */}
              <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                Equipe Technique
              </h2>
            </div>

            {/* Description */}
            <p className="font-grotesk text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Notre équipe est composée d'experts formés aux technologies les plus récentes. Partenaires de confiance de WEBASTO et DIAVIA, nous garantissons des interventions d'une précision clinique.
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-white/15 w-full my-6" />

            {/* Feature 1 & 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Diagnostics Avancés */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-[#00e3fd]">
                  <div className="p-2 bg-[#001f3f] border border-[#00e3fd]/40 rounded-sm">
                    <Settings size={18} className="text-[#00e3fd]" />
                  </div>
                  <h3 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-white">
                    DIAGNOSTICS AVANCÉS
                  </h3>
                </div>
                <p className="font-grotesk text-xs sm:text-sm text-slate-400 leading-normal">
                  Analyse systémique et résolution de problèmes complexes.
                </p>
              </div>

              {/* Installation Premium */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-[#00e3fd]">
                  <div className="p-2 bg-[#001f3f] border border-[#00e3fd]/40 rounded-sm">
                    <Snowflake size={18} className="text-[#00e3fd]" />
                  </div>
                  <h3 className="font-mono-tech text-xs font-bold uppercase tracking-wider text-white">
                    INSTALLATION PREMIUM
                  </h3>
                </div>
                <p className="font-grotesk text-xs sm:text-sm text-slate-400 leading-normal">
                  Intégration parfaite des systèmes WEBASTO & DIAVIA.
                </p>
              </div>
            </div>

            {/* Selected Component Quick Inspector */}
            {selectedPart && (
              <div className="mt-8 p-4 bg-[#001f3f]/80 border border-[#00e3fd]/30 rounded-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Info size={14} className="text-[#00e3fd]" />
                    <span className="font-mono-tech text-xs font-bold text-[#00e3fd]">
                      {selectedPart.name} ({selectedPart.code})
                    </span>
                  </div>
                  <span className="font-mono-tech text-[10px] text-slate-400">
                    {selectedPart.category}
                  </span>
                </div>
                <p className="font-grotesk text-xs text-slate-300 mb-3">
                  {selectedPart.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedPart.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="font-mono-tech text-[10px] bg-[#000b18] px-2 py-0.5 rounded text-slate-300 border border-white/10"
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
            <div className="relative bg-[#000b18] border border-[#00e3fd]/40 p-6 sm:p-8 rounded-sm shadow-2xl overflow-hidden group">
              
              {/* Technical Blueprint Grid background */}
              <div className="absolute inset-0 blueprint-grid opacity-50" />
              <div className="absolute inset-0 blueprint-subgrid opacity-30" />

              {/* Header inside blueprint */}
              <div className="relative z-10 flex items-center justify-between border-b border-[#00e3fd]/30 pb-3 mb-6">
                <div className="flex items-center gap-3">
                  <Cpu size={16} className="text-[#00e3fd]" />
                  <span className="font-mono-tech text-xs uppercase tracking-widest text-[#00e3fd] font-bold">
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
                  className="w-full h-full text-[#00e3fd] stroke-current stroke-[1.5] fill-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 227, 253, 0.15)" strokeWidth="0.5" />
                    </pattern>
                  </defs>

                  <rect width="800" height="600" fill="url(#grid)" />

                  {/* Connecting Piping (Refrigeration lines) */}
                  {/* High Pressure Gas (Discharge line: Compressor -> Condenser) */}
                  <path
                    d="M 280 430 L 280 230 L 320 230"
                    stroke="#00e3fd"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                  {/* Liquid Line: Condenser -> Receiver Drier */}
                  <path
                    d="M 440 230 L 580 230 L 580 290"
                    stroke="#00e3fd"
                    strokeWidth="2"
                  />
                  {/* Low Temp Liquid: Receiver -> Evaporator Core */}
                  <path
                    d="M 600 320 L 600 210 L 640 210"
                    stroke="#00e3fd"
                    strokeWidth="2"
                  />
                  {/* Suction Line: Evaporator -> Compressor */}
                  <path
                    d="M 720 280 L 720 480 L 300 480 L 300 450"
                    stroke="#00e3fd"
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
                      fill={hoveredPartId === 'condenser' || selectedPart.id === 'condenser' ? 'rgba(0, 227, 253, 0.2)' : 'rgba(0, 31, 63, 0.6)'}
                      stroke={selectedPart.id === 'condenser' ? '#00e3fd' : '#00a0b0'}
                      strokeWidth={selectedPart.id === 'condenser' ? '2.5' : '1.5'}
                      rx="4"
                    />
                    {/* Condenser fins */}
                    <line x1="195" y1="170" x2="195" y2="270" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="210" y1="170" x2="210" y2="270" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="225" y1="170" x2="225" y2="270" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="240" y1="170" x2="240" y2="270" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="255" y1="170" x2="255" y2="270" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="270" y1="170" x2="270" y2="270" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="285" y1="170" x2="285" y2="270" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="300" y1="170" x2="300" y2="270" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="315" y1="170" x2="315" y2="270" stroke="#00e3fd" strokeWidth="1" />

                    {/* Label Callout */}
                    <line x1="180" y1="160" x2="120" y2="120" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="120" y1="120" x2="60" y2="120" stroke="#00e3fd" strokeWidth="1" />
                    <text x="60" y="112" fill="#00e3fd" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                      CONDENSER COIL
                    </text>
                  </g>

                  {/* 2. EVAPORATOR CORE (Right Top) */}
                  <g
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedPart(TECHNICAL_PARTS[1])}
                    onMouseEnter={() => setHoveredPartId('evaporator')}
                    onMouseLeave={() => setHoveredPartId(null)}
                  >
                    <rect
                      x="530"
                      y="140"
                      width="160"
                      height="130"
                      fill={hoveredPartId === 'evaporator' || selectedPart.id === 'evaporator' ? 'rgba(0, 227, 253, 0.2)' : 'rgba(0, 31, 63, 0.6)'}
                      stroke={selectedPart.id === 'evaporator' ? '#00e3fd' : '#00a0b0'}
                      strokeWidth={selectedPart.id === 'evaporator' ? '2.5' : '1.5'}
                      rx="4"
                    />
                    {/* Evaporator blower turbines */}
                    <circle cx="580" cy="205" r="30" stroke="#00e3fd" strokeWidth="1" strokeDasharray="3 2" />
                    <circle cx="640" cy="205" r="30" stroke="#00e3fd" strokeWidth="1" strokeDasharray="3 2" />
                    <path d="M 580 185 L 580 225 M 560 205 L 600 205" stroke="#00e3fd" strokeWidth="1" />
                    <path d="M 640 185 L 640 225 M 620 205 L 660 205" stroke="#00e3fd" strokeWidth="1" />

                    {/* Label Callout */}
                    <line x1="610" y1="140" x2="650" y2="100" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="650" y1="100" x2="740" y2="100" stroke="#00e3fd" strokeWidth="1" />
                    <text x="650" y="92" fill="#00e3fd" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                      EVAPORATOR CORE
                    </text>
                  </g>

                  {/* 3. RECEIVER-DRIER (Center Right) */}
                  <g
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedPart(TECHNICAL_PARTS[2])}
                    onMouseEnter={() => setHoveredPartId('receiver')}
                    onMouseLeave={() => setHoveredPartId(null)}
                  >
                    <rect
                      x="570"
                      y="290"
                      width="40"
                      height="80"
                      fill={hoveredPartId === 'receiver' || selectedPart.id === 'receiver' ? 'rgba(0, 227, 253, 0.2)' : 'rgba(0, 31, 63, 0.6)'}
                      stroke={selectedPart.id === 'receiver' ? '#00e3fd' : '#00a0b0'}
                      strokeWidth={selectedPart.id === 'receiver' ? '2.5' : '1.5'}
                      rx="10"
                    />
                    <circle cx="590" cy="330" r="5" stroke="#00e3fd" strokeWidth="1.5" />

                    {/* Label Callout */}
                    <line x1="610" y1="330" x2="680" y2="330" stroke="#00e3fd" strokeWidth="1" />
                    <text x="685" y="334" fill="#00e3fd" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                      RECEIVER-DRIER
                    </text>
                  </g>

                  {/* 4. COMPRESSOR ASSY (Bottom Left) */}
                  <g
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedPart(TECHNICAL_PARTS[3])}
                    onMouseEnter={() => setHoveredPartId('compressor')}
                    onMouseLeave={() => setHoveredPartId(null)}
                  >
                    {/* Compressor Main Body */}
                    <path
                      d="M 170 380 L 290 380 L 290 460 L 170 460 Z"
                      fill={hoveredPartId === 'compressor' || selectedPart.id === 'compressor' ? 'rgba(0, 227, 253, 0.2)' : 'rgba(0, 31, 63, 0.6)'}
                      stroke={selectedPart.id === 'compressor' ? '#00e3fd' : '#00a0b0'}
                      strokeWidth={selectedPart.id === 'compressor' ? '2.5' : '1.5'}
                    />
                    {/* Pulley & Clutch */}
                    <circle cx="150" cy="420" r="28" stroke="#00e3fd" strokeWidth="2" />
                    <circle cx="150" cy="420" r="16" stroke="#00e3fd" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="150" cy="420" r="6" fill="#00e3fd" />

                    {/* Compressor head cylinder shapes */}
                    <rect x="200" y="365" width="20" height="15" stroke="#00e3fd" strokeWidth="1.5" fill="none" />
                    <rect x="235" y="365" width="20" height="15" stroke="#00e3fd" strokeWidth="1.5" fill="none" />
                    <rect x="270" y="365" width="20" height="15" stroke="#00e3fd" strokeWidth="1.5" fill="none" />

                    {/* Label Callout */}
                    <line x1="150" y1="450" x2="100" y2="500" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="100" y1="500" x2="40" y2="500" stroke="#00e3fd" strokeWidth="1" />
                    <text x="40" y="492" fill="#00e3fd" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                      COMPRESSOR ASSY
                    </text>
                  </g>

                  {/* 5. MOUNTING BRACKET (Bottom Right) */}
                  <g
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedPart(TECHNICAL_PARTS[4])}
                    onMouseEnter={() => setHoveredPartId('mounting')}
                    onMouseLeave={() => setHoveredPartId(null)}
                  >
                    <path
                      d="M 460 440 L 560 440 L 590 520 L 430 520 Z"
                      fill={hoveredPartId === 'mounting' || selectedPart.id === 'mounting' ? 'rgba(0, 227, 253, 0.2)' : 'rgba(0, 31, 63, 0.6)'}
                      stroke={selectedPart.id === 'mounting' ? '#00e3fd' : '#00a0b0'}
                      strokeWidth={selectedPart.id === 'mounting' ? '2.5' : '1.5'}
                    />
                    {/* Mounting holes */}
                    <circle cx="460" cy="465" r="4" stroke="#00e3fd" strokeWidth="1.5" />
                    <circle cx="530" cy="465" r="4" stroke="#00e3fd" strokeWidth="1.5" />
                    <circle cx="470" cy="500" r="5" stroke="#00e3fd" strokeWidth="1.5" />
                    <circle cx="550" cy="500" r="5" stroke="#00e3fd" strokeWidth="1.5" />

                    {/* Label Callout */}
                    <line x1="560" y1="520" x2="620" y2="550" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="620" y1="550" x2="720" y2="550" stroke="#00e3fd" strokeWidth="1" />
                    <text x="620" y="542" fill="#00e3fd" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">
                      MOUNTING BRACKET
                    </text>
                  </g>

                  {/* Technical Blueprint Title Block in bottom right */}
                  <g transform="translate(620, 480)">
                    <rect x="0" y="0" width="165" height="95" fill="#000b18" stroke="#00e3fd" strokeWidth="1.5" />
                    <line x1="0" y1="24" x2="165" y2="24" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="0" y1="48" x2="165" y2="48" stroke="#00e3fd" strokeWidth="1" />
                    <line x1="0" y1="72" x2="165" y2="72" stroke="#00e3fd" strokeWidth="1" />
                    <text x="8" y="16" fill="#00e3fd" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">PROJECT: SHYK AUTO</text>
                    <text x="8" y="40" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono">DOUCAR THERMO-SYSTEM</text>
                    <text x="8" y="64" fill="#00e3fd" fontSize="9" fontFamily="JetBrains Mono">REF: A1-TN</text>
                    <text x="8" y="88" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono">SCALE: 1:5 CLINICAL</text>
                  </g>
                </svg>
              </div>

              {/* Instructions footer on schematic */}
              <div className="relative z-10 mt-4 flex items-center justify-between text-xs font-mono-tech text-slate-400 border-t border-[#00e3fd]/20 pt-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00e3fd]" />
                  Cliquez sur un composant pour inspecter ses spécifications techniques
                </span>
                <span className="text-[#00e3fd] font-bold">SHYK CAD ENGINE</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

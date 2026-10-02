import React from 'react';
import { HERITAGE_TEXT } from '../data/content';
import { History } from 'lucide-react';
import { COLORS } from '../constants/theme';

export const HeritageSection: React.FC = () => {

  return (
    <section id="heritage" className="py-24 lg:py-32 border-b border-[#e2e8f0] bg-[#f4f5f7] text-[#0f172a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
            {/* Left Column: Title with 1985 Watermark */}
            <div className="lg:col-span-5 relative select-none">
              {/* Giant 1985 Watermark */}
              <div className="font-montserrat font-black text-8xl sm:text-9xl lg:text-[140px] leading-none absolute -top-12 sm:-top-16 left-0 -z-0 tracking-tighter text-slate-200 pointer-events-none">
                {HERITAGE_TEXT.yearWatermark}
              </div>

              {/* Foreground Heading */}
              <div className="relative z-10 pt-4 sm:pt-6">
                <div className="font-mono-tech text-xs tracking-widest uppercase font-bold mb-2 flex items-center gap-2 text-[#007aff]">
                  <History size={14} className="text-[#007aff]" />
                  <span>NOTRE HISTOIRE • DOUCAR 1985 / SHYK AUTO 2003</span>
                </div>
                <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0f172a]">
                  {HERITAGE_TEXT.title}
                </h2>
                <div className="w-20 h-1.5 mt-4 rounded-full bg-[#007aff]" />
              </div>

              {/* Historical Fact Pill */}
              <div className="mt-10 p-5 bg-white border border-[#e2e8f0] rounded-sm max-w-md shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono-tech text-[#64748b] mb-2 font-bold">
                  <span>FONDATION DOUCAR</span>
                  <span className="text-[#007aff]">TUNIS, TN</span>
                </div>
                <p className="text-sm font-grotesk text-[#43474e] leading-relaxed">
                  Pionnier de la climatisation automobile en Tunisie depuis 1985. Naissance de SHYK-AUTO en 2003.
                </p>
              </div>
            </div>

            {/* Right Column: Editorial Paragraphs */}
            <div className="lg:col-span-7 space-y-6">
              {HERITAGE_TEXT.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={`font-grotesk text-base sm:text-lg leading-relaxed ${
                    idx === HERITAGE_TEXT.paragraphs.length - 1
                      ? 'font-medium text-[#0f172a] text-lg sm:text-xl border-l-4 border-[#007aff] pl-4 italic bg-white p-4 rounded-r border border-[#e2e8f0] shadow-sm'
                      : 'text-[#43474e]'
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>

        </div>
      </div>
    </section>
  );
};

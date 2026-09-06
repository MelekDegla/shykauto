import React, { useState } from 'react';
import { HERITAGE_TEXT, MILESTONES } from '../data/content';
import { History, Calendar } from 'lucide-react';
import { COLORS } from '../constants/theme';

export const HeritageSection: React.FC = () => {
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(0);
  const [showFullTimeline, setShowFullTimeline] = useState(true);

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
                <span>DEPUIS 1985</span>
              </div>
              <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl tracking-tight text-[#0f172a]">
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
                Pionnier de la thermodynamique véhiculaire et des caisses isothermes sous le climat méditerranéen exigeant.
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

            {/* Interactive Timeline */}
            <div className="pt-6">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3 mb-4">
                <span className="font-mono-tech text-xs uppercase tracking-widest font-bold flex items-center gap-2 text-[#0f172a]">
                  <Calendar size={14} className="text-[#007aff]" />
                  Repères Historiques & Évolution
                </span>
                <button
                  onClick={() => setShowFullTimeline(!showFullTimeline)}
                  className="font-mono-tech text-xs hover:underline font-semibold text-[#007aff]"
                >
                  {showFullTimeline ? 'Réduire' : 'Explorer la chronologie'}
                </button>
              </div>

              {/* Quick Year Selector Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {MILESTONES.map((m, i) => (
                  <button
                    key={m.year}
                    onClick={() => {
                      setSelectedMilestoneIndex(i);
                      setShowFullTimeline(true);
                    }}
                    className={`px-3.5 py-1.5 rounded-sm font-mono-tech text-xs font-bold transition-all ${
                      selectedMilestoneIndex === i
                        ? 'bg-[#000613] text-white shadow-md'
                        : 'bg-white border border-[#e2e8f0] text-[#43474e] hover:border-[#000613] hover:text-[#000613]'
                    }`}
                  >
                    {m.year}
                  </button>
                ))}
              </div>

              {/* Active Milestone Card */}
              {showFullTimeline && (
                <div className="mt-4 p-6 bg-white border border-[#e2e8f0] rounded-sm shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-montserrat font-bold text-base text-[#0f172a]">
                      {MILESTONES[selectedMilestoneIndex].year} — {MILESTONES[selectedMilestoneIndex].title}
                    </span>
                    <span className="font-mono-tech text-[10px] px-2.5 py-0.5 rounded bg-[#f4f5f7] text-[#007aff] font-bold border border-[#e2e8f0]">
                      {MILESTONES[selectedMilestoneIndex].tag}
                    </span>
                  </div>
                  <p className="font-grotesk text-sm text-[#43474e] leading-relaxed">
                    {MILESTONES[selectedMilestoneIndex].description}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

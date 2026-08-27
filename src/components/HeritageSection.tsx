import React, { useState } from 'react';
import { HERITAGE_TEXT, MILESTONES } from '../data/content';
import { History, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

export const HeritageSection: React.FC = () => {
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(0);
  const [showFullTimeline, setShowFullTimeline] = useState(false);

  return (
    <section id="heritage" className="py-24 lg:py-32 bg-[#faf9fc] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title with 1985 Watermark */}
          <div className="lg:col-span-5 relative select-none">
            {/* Giant 1985 Watermark */}
            <div className="font-montserrat font-black text-8xl sm:text-9xl lg:text-[140px] leading-none text-[#efedf0] absolute -top-12 sm:-top-16 left-0 -z-0 tracking-tighter opacity-80 pointer-events-none">
              {HERITAGE_TEXT.yearWatermark}
            </div>

            {/* Foreground Heading */}
            <div className="relative z-10 pt-4 sm:pt-6">
              <div className="font-mono-tech text-xs tracking-widest text-[#006875] uppercase font-bold mb-2 flex items-center gap-2">
                <History size={14} className="text-[#007aff]" />
                <span>DEPUIS 1985</span>
              </div>
              <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl text-[#000613] tracking-tight">
                {HERITAGE_TEXT.title}
              </h2>
              {/* Cyan Accent Bar Under Heading */}
              <div className="w-20 h-1.5 bg-[#00e3fd] mt-4 rounded-full" />
            </div>

            {/* Historical Fact Pill */}
            <div className="mt-10 p-5 bg-white border border-[#e2e8f0] rounded-sm max-w-md shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500 mb-2">
                <span>FONDATION DOUCAR</span>
                <span className="text-[#007aff] font-bold">TUNIS, TN</span>
              </div>
              <p className="text-sm font-grotesk text-slate-700">
                Pionnier de la thermodynamique véhiculaire et des caisses isothermes sous le climat méditerranéen exigeant.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Paragraphs */}
          <div className="lg:col-span-7 space-y-6">
            {HERITAGE_TEXT.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={`font-grotesk text-lg leading-relaxed text-[#43474e] ${
                  idx === HERITAGE_TEXT.paragraphs.length - 1
                    ? 'font-medium text-[#1a1c1e] text-xl border-l-2 border-[#00e3fd] pl-4 italic'
                    : ''
                }`}
              >
                {p}
              </p>
            ))}

            {/* Interactive Timeline Preview / Expander */}
            <div className="pt-6">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3 mb-4">
                <span className="font-mono-tech text-xs uppercase tracking-widest font-bold text-[#000613] flex items-center gap-2">
                  <Calendar size={14} className="text-[#007aff]" />
                  Repères Historiques & Évolution
                </span>
                <button
                  onClick={() => setShowFullTimeline(!showFullTimeline)}
                  className="font-mono-tech text-xs text-[#007aff] hover:underline font-semibold"
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
                        ? 'bg-[#000613] text-[#00e3fd]'
                        : 'bg-white border border-[#e2e8f0] text-[#43474e] hover:border-[#000613]'
                    }`}
                  >
                    {m.year}
                  </button>
                ))}
              </div>

              {/* Active Milestone Card */}
              {showFullTimeline && (
                <div className="mt-4 p-5 bg-white border border-[#00e3fd]/40 rounded-sm animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-montserrat font-bold text-base text-[#000613]">
                      {MILESTONES[selectedMilestoneIndex].year} — {MILESTONES[selectedMilestoneIndex].title}
                    </span>
                    <span className="font-mono-tech text-[10px] bg-[#001122] text-[#00e3fd] px-2 py-0.5 rounded">
                      {MILESTONES[selectedMilestoneIndex].tag}
                    </span>
                  </div>
                  <p className="font-grotesk text-sm text-[#43474e]">
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

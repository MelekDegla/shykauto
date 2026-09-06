import React, { useState, useRef } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'AVANT (ORIGINE)',
  afterLabel = 'APRÈS (SHYKAUTO)',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-[320px] sm:h-[400px] rounded-lg overflow-hidden select-none cursor-ew-resize border border-slate-700/50 shadow-2xl bg-slate-950"
    >
      {/* After Image (Full Background) */}
      <img
        src={afterImage}
        alt="After transformation"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono-tech text-[#cbd5e1] border border-[#cbd5e1]/30 uppercase font-bold tracking-wider z-10">
        {afterLabel}
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute top-0 left-0 bottom-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before transformation"
          className="absolute top-0 left-0 h-full max-w-none object-cover"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
        />
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono-tech text-amber-400 border border-amber-400/30 uppercase font-bold tracking-wider z-10">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Splitter Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-[#cbd5e1] shadow-[0_0_15px_#cbd5e1] z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#000613] border-2 border-[#cbd5e1] text-[#cbd5e1] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
          <ArrowLeftRight size={18} />
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Maximize2, X } from 'lucide-react';
import { formatImageDisplay } from '../utils/imageUtils';

interface ImageCarouselProps {
  images?: string[];
  alt?: string;
  categoryBadge?: string;
  statusBadge?: React.ReactNode;
  className?: string;
  aspectRatioClass?: string;
  showThumbnails?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  fitMode?: 'contain' | 'cover';
  allowFullscreen?: boolean;
}

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80';

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images = [],
  alt = 'Réalisation ShykAuto',
  categoryBadge,
  statusBadge,
  className = '',
  aspectRatioClass = 'h-[320px] sm:h-[400px]',
  showThumbnails = false,
  autoPlay = false,
  autoPlayInterval = 5000,
  fitMode = 'contain',
  allowFullscreen = true,
}) => {
  // Filter out empty or whitespace-only images
  const validImages = images
    .filter((img) => typeof img === 'string' && img.trim().length > 0)
    .map((img) => formatImageDisplay(img, DEFAULT_FALLBACK_IMAGE));

  // If no images provided, use default placeholder
  const slideImages = validImages.length > 0 ? validImages : [DEFAULT_FALLBACK_IMAGE];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-play support if requested
  useEffect(() => {
    if (!autoPlay || slideImages.length <= 1 || isPaused || isFullscreenOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, slideImages.length, isPaused, isFullscreenOpen]);

  // Keep currentIndex in bounds if images list changes
  useEffect(() => {
    if (currentIndex >= slideImages.length) {
      setCurrentIndex(0);
    }
  }, [slideImages.length, currentIndex]);

  // Keyboard navigation for fullscreen lightbox
  useEffect(() => {
    if (!isFullscreenOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreenOpen(false);
      if (e.key === 'ArrowLeft') setCurrentIndex((p) => (p === 0 ? slideImages.length - 1 : p - 1));
      if (e.key === 'ArrowRight') setCurrentIndex((p) => (p + 1) % slideImages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenOpen, slideImages.length]);

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slideImages.length);
  };

  const goToSlide = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(idx);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (deltaX > 45) {
      goToPrevious();
    } else if (deltaX < -45) {
      goToNext();
    }
  };

  const hasMultiple = slideImages.length > 1;

  return (
    <>
      <div
        className={`relative select-none flex flex-col ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main Slide Display */}
        <div
          className={`relative w-full ${aspectRatioClass} rounded overflow-hidden bg-slate-950 group shadow-inner flex items-center justify-center`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images Layer */}
          {slideImages.map((src, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center overflow-hidden ${
                idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {fitMode === 'contain' ? (
                <>
                  {/* 1. Ambient Blurred Backdrop: Fills any aspect-ratio gap with harmonious ambient color */}
                  <img
                    src={src}
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-125 select-none pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/45 pointer-events-none" />

                  {/* 2. Main Contained Product Image: 100% visible, never cropped, adapts to all dimensions */}
                  <img
                    src={src}
                    alt={`${alt} - photo ${idx + 1}`}
                    className="relative z-10 max-w-full max-h-full w-auto h-auto object-contain p-3.5 transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-md select-none"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </>
              ) : (
                <img
                  src={src}
                  alt={`${alt} - photo ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              )}
            </div>
          ))}

          {/* Subtle Dark Gradient Overlay at Bottom */}
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

          {/* Top Badges */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
            {/* Multiple Photos Badge */}
            {hasMultiple ? (
              <div className="pointer-events-auto flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono-tech text-white border border-white/20 shadow">
                <ImageIcon size={13} className="text-[#38bdf8]" />
                <span className="font-bold">
                  {currentIndex + 1} / {slideImages.length}
                </span>
              </div>
            ) : (
              <div />
            )}

            {/* Category & Status Badges */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {categoryBadge && (
                <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono-tech text-[#cbd5e1] border border-[#cbd5e1]/30 uppercase font-bold tracking-wider shadow">
                  {categoryBadge}
                </div>
              )}
              {statusBadge}
            </div>
          </div>

          {/* Fullscreen Expand Button */}
          {allowFullscreen && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreenOpen(true);
              }}
              title="Agrandir la photo"
              className="absolute top-3 right-3 sm:right-auto sm:left-3 z-20 p-1.5 rounded bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow"
            >
              <Maximize2 size={13} />
            </button>
          )}

          {/* Previous Button */}
          {hasMultiple && (
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Image précédente"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all opacity-85 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 shadow-lg active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Next Button */}
          {hasMultiple && (
            <button
              type="button"
              onClick={goToNext}
              aria-label="Image suivante"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all opacity-85 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 shadow-lg active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Dot Pagination Indicators */}
          {hasMultiple && (
            <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-20 pointer-events-none">
              <div className="pointer-events-auto bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10 shadow">
                {slideImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => goToSlide(idx, e)}
                    aria-label={`Aller à la photo ${idx + 1}`}
                    className={`transition-all rounded-full ${
                      idx === currentIndex
                        ? 'w-5 h-2 bg-[#007aff] shadow-[0_0_8px_#007aff]'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Optional Thumbnails Strip */}
        {showThumbnails && hasMultiple && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
            {slideImages.map((src, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => goToSlide(idx, e)}
                className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all bg-slate-950 flex items-center justify-center ${
                  idx === currentIndex
                    ? 'border-[#007aff] scale-105 shadow-md'
                    : 'border-slate-700 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={src} alt={`Miniature ${idx + 1}`} className="max-w-full max-h-full object-contain p-0.5" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreenOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setIsFullscreenOpen(false)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between py-3 text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="font-montserrat font-bold text-sm sm:text-base text-slate-200">
                {alt}
              </span>
              <span className="text-xs font-mono-tech text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2 py-0.5 rounded">
                {currentIndex + 1} / {slideImages.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsFullscreenOpen(false)}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white transition-colors"
              title="Fermer (Échap)"
            >
              <X size={20} />
            </button>
          </div>

          {/* Fullscreen Image Container */}
          <div
            className="relative flex-1 w-full max-w-6xl flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={slideImages[currentIndex]}
              alt={`${alt} - photo ${currentIndex + 1} grand format`}
              className="max-w-full max-h-[82vh] object-contain drop-shadow-2xl select-none transition-transform duration-300"
            />

            {/* Left / Right Navigation in Fullscreen */}
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label="Image précédente"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-xl"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Image suivante"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110 shadow-xl"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RollingBannerProps {
  banners: string[];
}

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const RollingBanner: React.FC<RollingBannerProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const currentUrl = banners[currentIndex];
  const youtubeId = getYoutubeId(currentUrl);

  return (
    <div className="relative w-full aspect-video bg-black comic-border overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-500 pointer-events-none">
      <div className="absolute inset-0 halftone-bg opacity-10 pointer-events-none z-10" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${banners.length === 1 ? 1 : 0}&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
              className="w-full h-full border-none"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Banner Video"
            />
          ) : (
            <img
              src={currentUrl}
              alt="Banner"
              className="w-full h-full object-cover transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {banners.length > 1 && (
        <div className="absolute bottom-2 right-2 z-20 flex gap-1">
          {banners.map((_, idx) => (
            <div 
              key={idx}
              className={`w-2 h-2 rounded-full border border-white ${idx === currentIndex ? 'bg-[#e63946]' : 'bg-white/30'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

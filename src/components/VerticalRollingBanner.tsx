import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VerticalRollingBannerProps {
  images: string[];
}

export const VerticalRollingBanner: React.FC<VerticalRollingBannerProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full aspect-[3/4] bg-black comic-border overflow-hidden transform lg:-rotate-1 hover:rotate-0 transition-transform duration-500">
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
          <img
            src={images[currentIndex]}
            alt="Vertical Banner"
            className="w-full h-full object-cover transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-2 right-2 z-20 flex gap-1">
          {images.map((_, idx) => (
            <div 
              key={idx}
              className={`w-1.5 h-1.5 rounded-full border border-white ${idx === currentIndex ? 'bg-[#e63946]' : 'bg-white/30'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

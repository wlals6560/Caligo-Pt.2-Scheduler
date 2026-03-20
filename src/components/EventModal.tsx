import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, Clock, Info } from 'lucide-react';
import { ScheduleEvent } from '../data/schedule';
import { renderDescriptionWithLinks } from '../utils/text';

interface EventModalProps {
  event: ScheduleEvent | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  return (
    <AnimatePresence>
      {event && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.9, y: 20, opacity: 0, rotate: 2 }}
            className="relative w-full max-w-lg bg-white comic-border p-8 text-black overflow-hidden"
          >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-[#e63946] hover:text-white transition-colors rounded-full border-2 border-black"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-10">
              <div className={`
                inline-block px-4 py-1 font-display italic text-xl mb-4 transform -skew-x-12
                ${event.type === 'CONCEPT PHOTO' ? 'bg-[#ff0000] text-white glow-red' : 
                  event.type === 'PRE-ORDER' ? 'bg-white text-black border-2 border-black' : 
                  event.type === 'ALBUM PREVIEW' ? 'bg-black text-white' : 
                  event.type === 'PROMOTION' ? 'bg-gray-300 text-black border-2 border-black' : 
                  event.type === 'COMEBACK' ? 'bg-yellow-400 text-black' : 
                  'bg-white text-black'}
              `}>
                {event.type.toUpperCase()}
              </div>

              <h2 className="text-4xl md:text-5xl font-display comic-title mb-8 leading-tight tracking-normal">
                {event.title}
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-xl font-bold italic">
                  <CalendarIcon className="w-6 h-6 text-[#e63946]" />
                  <span>{event.date} {event.endDate ? `~ ${event.endDate}` : ''}</span>
                </div>
                
                {event.time && (
                  <div className="flex items-center gap-3 text-xl font-bold italic">
                    <Clock className="w-6 h-6 text-[#e63946]" />
                    <span>{event.time}</span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-[#e63946] mt-1 shrink-0" />
                  <div className="text-lg font-medium leading-relaxed">
                    {renderDescriptionWithLinks(event.description)}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t-4 border-black border-dashed">
                <p className="text-sm font-black uppercase tracking-widest text-gray-400">
                  PLAVE 4TH MINI ALBUM [CALIGO]
                </p>
              </div>
            </div>

            {/* Decorative comic elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400 border-4 border-black rotate-12 flex items-center justify-center">
              <span className="font-display text-4xl italic">!</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, Info } from 'lucide-react';
import { ScheduleEvent } from '../data/schedule';
import { isSameDay, parseISO, isWithinInterval } from 'date-fns';
import { renderDescriptionWithLinks } from '../utils/text';

interface TodayScheduleProps {
  schedule: ScheduleEvent[];
}

export const TodaySchedule: React.FC<TodayScheduleProps> = ({ schedule }) => {
  const today = new Date();
  
  const todayEvents = schedule.filter(event => {
    const eventDate = parseISO(event.date);
    if (event.endDate) {
      const eventEndDate = parseISO(event.endDate);
      return isWithinInterval(today, { start: eventDate, end: eventEndDate });
    }
    return isSameDay(today, eventDate);
  });

  return (
    <div className="bg-black p-3 md:p-6 comic-border h-full flex flex-col">
      <h2 className="text-xl md:text-3xl font-display text-white comic-title italic mb-4 md:mb-6 text-center">
        TODAY'S SCHEDULE
      </h2>
      
      <div className="flex-1 space-y-4 md:space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        {todayEvents.length > 0 ? (
          todayEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-4 comic-border text-black relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className={`
                  inline-block px-2 py-0.5 font-display italic text-xs mb-2 transform -skew-x-12
                  ${event.type === 'CONCEPT PHOTO' ? 'bg-[#ff0000] text-white glow-red' : 
                    event.type === 'PRE-ORDER' ? 'bg-white text-black border border-black' : 
                    event.type === 'ALBUM PREVIEW' ? 'bg-black text-white' : 
                    event.type === 'PROMOTION' ? 'bg-gray-300 text-black border border-black' : 
                    event.type === 'COMEBACK' ? 'bg-yellow-400 text-black' : 
                    'bg-white text-black'}
                `}>
                  {event.type.toUpperCase()}
                </div>

                <h3 className="text-xl font-display comic-title mb-3 leading-tight">
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm font-bold italic">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#e63946]" />
                    <span>{event.date} {event.endDate ? `~ ${event.endDate}` : ''}</span>
                  </div>
                  
                  {event.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#e63946]" />
                      <span>{event.time}</span>
                    </div>
                  )}

                  <div className="flex items-start gap-2 pt-1">
                    <Info className="w-4 h-4 text-[#e63946] mt-0.5 shrink-0" />
                    <div className="font-medium leading-snug">
                      {renderDescriptionWithLinks(event.description)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-white/50 text-center italic py-10">
            No events scheduled for today.
          </div>
        )}
      </div>
    </div>
  );
};

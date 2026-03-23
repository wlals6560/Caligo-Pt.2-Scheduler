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
    <div className="bg-black p-4 md:p-8 lg:p-4 comic-border h-full flex flex-col lg:transform lg:-rotate-1">
      <h2 className="text-2xl md:text-4xl lg:text-xl font-display text-white comic-title italic mb-6 md:mb-8 lg:mb-4 text-center">
        TODAY'S SCHEDULE
      </h2>
      
      <div className="flex-1 space-y-6 md:space-y-8 lg:space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {todayEvents.length > 0 ? (
          todayEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 lg:p-3 border-4 border-black text-black relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className={`
                  inline-block px-3 py-1 lg:px-2 lg:py-0.5 font-display italic text-sm lg:text-[10px] mb-3 lg:mb-1 transform -skew-x-12
                  ${event.type === 'CONCEPT PHOTO' ? 'bg-[#D93915] text-white' : 
                    event.type === 'PRE-ORDER' ? 'bg-white text-black border border-black' : 
                    event.type === 'ALBUM PREVIEW' ? 'bg-black text-white' : 
                    event.type === 'PROMOTION' ? 'bg-gray-300 text-black border border-black' : 
                    event.type === 'COMEBACK' ? 'bg-yellow-400 text-black' : 
                    'bg-white text-black'}
                `}>
                  {event.type.toUpperCase()}
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-lg font-display comic-title mb-4 lg:mb-2 leading-tight">
                  {event.title}
                </h3>

                <div className="space-y-3 lg:space-y-1 text-base lg:text-xs font-bold italic">
                  <div className="flex items-center gap-3 lg:gap-2">
                    <CalendarIcon className="w-5 h-5 lg:w-3 lg:h-3 text-[#e63946]" />
                    <span>{event.date} {event.endDate ? `~ ${event.endDate}` : ''}</span>
                  </div>
                  
                  {event.time && (
                    <div className="flex items-center gap-3 lg:gap-2">
                      <Clock className="w-5 h-5 lg:w-3 lg:h-3 text-[#e63946]" />
                      <span>{event.time}</span>
                    </div>
                  )}

                  <div className="flex items-start gap-3 lg:gap-2 pt-2 lg:pt-1">
                    <Info className="w-5 h-5 lg:w-3 lg:h-3 text-[#e63946] mt-0.5 shrink-0" />
                    <div className="font-medium leading-snug text-sm md:text-base lg:text-[11px]">
                      {renderDescriptionWithLinks(event.description)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-white/50 text-center italic py-16 lg:py-8 text-lg lg:text-sm">
            No events scheduled for today.
          </div>
        )}
      </div>
    </div>
  );
};

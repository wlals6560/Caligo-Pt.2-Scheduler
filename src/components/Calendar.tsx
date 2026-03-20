import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isWithinInterval,
  parseISO
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScheduleEvent } from '../data/schedule';

interface CalendarProps {
  schedule: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ schedule, onEventClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // Start with March 2026

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const getEventsForDay = (day: Date) => {
    return schedule.filter(event => {
      const eventDate = parseISO(event.date);
      if (event.endDate) {
        const eventEndDate = parseISO(event.endDate);
        return isWithinInterval(day, { start: eventDate, end: eventEndDate });
      }
      return isSameDay(day, eventDate);
    });
  };

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="w-full max-w-7xl lg:max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pb-4 md:pb-8 pt-0">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-8 bg-black p-1 md:p-2 lg:p-3 comic-border transform -rotate-1">
        <button 
          onClick={prevMonth}
          className="p-1 hover:bg-[#e63946] transition-colors rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <h2 className="text-lg md:text-2xl font-display text-white comic-title italic">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>

        <button 
          onClick={nextMonth}
          className="p-1 hover:bg-[#e63946] transition-colors rounded-full"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0 md:gap-1 lg:gap-4 border-black border-collapse">
        {weekDays.map(day => (
          <div key={day} className="text-center font-display text-[10px] md:text-sm lg:text-lg text-white bg-black py-0.5 md:py-1 px-0.5 md:px-2 border-[1px] md:border-2 border-black mb-0 md:mb-1 lg:mb-2">
            {day}
          </div>
        ))}

        {calendarDays.map((day, idx) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());

          return (
            <motion.div
              key={day.toString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.01 }}
              className={`
                min-h-[75px] md:min-h-[110px] lg:min-h-[140px] p-0.5 md:p-1 lg:p-2 border-[0.5px] md:border-2 lg:border-2 border-black transition-all
                ${!isCurrentMonth ? 'opacity-30 grayscale' : 'hover:scale-105 hover:z-10 cursor-default'}
                ${isToday ? 'bg-yellow-50 border-2 md:border-2 border-[#e63946] z-10' : 'bg-white'}
                relative group
              `}
            >
              <div className="absolute inset-0 halftone-bg pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity" />
              
              <span className={`
                text-[10px] md:text-lg lg:text-2xl font-display italic
                ${isToday ? 'text-[#e63946] underline' : 'text-black'}
              `}>
                {format(day, 'd')}
              </span>

              <div className="mt-0.5 md:mt-1 lg:mt-2 flex flex-row flex-wrap gap-1 md:flex-col md:space-y-1">
                {dayEvents.map(event => (
                  <button
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className={`
                      text-left px-1 md:px-1.5 lg:px-2 py-0.5 md:py-0.5 lg:py-1 text-[8px] md:text-[9px] lg:text-xs font-bold uppercase
                      border-[0.5px] md:border-1 lg:border-2 border-black
                      hover:translate-x-[1px] hover:translate-y-[1px]
                      transition-all whitespace-nowrap md:whitespace-normal break-words leading-tight
                      max-w-[calc(100%-2px)] md:max-w-full overflow-hidden text-ellipsis
                      ${event.type === 'CONCEPT PHOTO' ? 'bg-red-600 text-white' : 
                        event.type === 'PRE-ORDER' ? 'bg-white text-black' : 
                        event.type === 'ALBUM PREVIEW' ? 'bg-black text-white' : 
                        event.type === 'PROMOTION' ? 'bg-gray-300 text-black' : 
                        event.type === 'COMEBACK' ? 'bg-yellow-400 text-black' : 
                        'bg-white text-black'}
                    `}
                  >
                    <span className="hidden md:inline">{event.title}</span>
                    <span className="inline md:hidden">{event.title.length > 3 ? `${event.title.substring(0, 3)}...` : event.title}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

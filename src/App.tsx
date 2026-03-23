import { useState, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { EventModal } from './components/EventModal';
import { TodaySchedule } from './components/TodaySchedule';
import { RollingBanner } from './components/RollingBanner';
import { VerticalRollingBanner } from './components/VerticalRollingBanner';
import { AdminEditModal } from './components/AdminEditModal';
import { PLAVE_SCHEDULE, ScheduleEvent } from './data/schedule';
import { motion } from 'motion/react';
import { Star, Settings } from 'lucide-react';
import logo from './assets/logo.png';

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [schedule, setSchedule] = useState<ScheduleEvent[]>(PLAVE_SCHEDULE);
  const [banners, setBanners] = useState<string[]>([
    "https://pbs.twimg.com/media/HEGJwD3bMAAohWm?format=jpg&name=4096x4096",
    "https://pbs.twimg.com/media/HEGJM1fagAAaczp?format=jpg&name=4096x4096",
    "https://pbs.twimg.com/media/HEGJmr2aAAAIe58?format=jpg&name=4096x4096",
    "https://pbs.twimg.com/media/HEGJdB4akAAdBAS?format=jpg&name=4096x4096",
    "https://pbs.twimg.com/media/HEGJUt9acAAnfgA?format=jpg&name=4096x4096"
  ]);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Load from local storage if available
  useEffect(() => {
    const savedSchedule = localStorage.getItem('plave_schedule');
    if (savedSchedule) {
      try {
        setSchedule(JSON.parse(savedSchedule));
      } catch (e) {
        console.error('Failed to parse saved schedule', e);
      }
    }
    const savedBanners = localStorage.getItem('plave_banners');
    if (savedBanners) {
      try {
        setBanners(JSON.parse(savedBanners));
      } catch (e) {
        console.error('Failed to parse saved banners', e);
      }
    }
  }, []);

  const handleSaveSchedule = (newSchedule: ScheduleEvent[]) => {
    // Sort by date by default
    const sorted = [...newSchedule].sort((a, b) => a.date.localeCompare(b.date));
    setSchedule(sorted);
    localStorage.setItem('plave_schedule', JSON.stringify(sorted));
  };

  const handleSaveBanners = (newBanners: string[]) => {
    setBanners(newBanners);
    localStorage.setItem('plave_banners', JSON.stringify(newBanners));
  };

  const imageBanners = banners;

  return (
    <div className="min-h-screen bg-[#252525] relative overflow-hidden font-sans selection:bg-[#e63946] selection:text-white">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 halftone-bg opacity-10 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/50 pointer-events-none" />
      
      {/* Scattered Comic Effects in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Dots in top right */}
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] text-white opacity-[0.03] comic-dots-patch" />
        
        {/* Additional Dots in top right area */}
        <div className="absolute top-[10%] right-[5%] w-64 h-64 text-white opacity-[0.04] comic-dots-patch" />
        
        {/* Lines in bottom left */}
        <div className="absolute bottom-20 -left-20 w-[600px] h-[300px] text-white opacity-[0.05] comic-lines rotate-[15deg]" />
        
        {/* Dots patch in middle left */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 text-white opacity-[0.03] comic-dots-patch" />
        
        {/* Another dots patch in bottom right */}
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] text-white opacity-[0.06] comic-dots-patch" />

        {/* Scattered Stars - Monochrome */}
        <Star className="absolute top-[12%] left-[8%] w-4 h-4 md:w-8 md:h-8 text-white fill-white opacity-10 rotate-12" />
        <Star className="absolute top-[22%] right-[12%] w-5 h-5 md:w-10 md:h-10 text-white fill-white opacity-10 -rotate-12" />
        <Star className="absolute bottom-[18%] left-[15%] w-3 h-3 md:w-6 md:h-6 text-white fill-white opacity-10 rotate-45" />
        <Star className="absolute bottom-[35%] right-[20%] w-4 h-4 md:w-9 md:h-9 text-white fill-white opacity-10 -rotate-6" />
        <Star className="absolute top-[55%] left-[18%] w-2 h-2 md:w-5 md:h-5 text-white fill-white opacity-10" />
        <Star className="absolute top-[40%] right-[25%] w-3 h-3 md:w-7 md:h-7 text-white fill-white opacity-10 rotate-12" />
        <Star className="absolute bottom-[45%] left-[30%] w-2 h-2 md:w-4 md:h-4 text-white fill-white opacity-10" />
      </div>
      
      <motion.div 
        initial={{ rotate: -5, scale: 1.2, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 0.05 }}
        className="fixed -top-20 -left-20 w-[600px] h-[600px] bg-white rounded-full blur-[120px] pointer-events-none"
      />
      
      <motion.div 
        initial={{ rotate: 5, scale: 1.2, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 0.05 }}
        className="fixed -bottom-20 -right-20 w-[600px] h-[600px] bg-white rounded-full blur-[120px] pointer-events-none"
      />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto pt-24 pb-12 px-4">
        {/* Header Section */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block relative"
          >
            <div className="relative z-10 flex flex-row items-center justify-center gap-3 md:gap-4">
              {/* Logo Image */}
              <img 
                src={logo} 
                alt="CALIGO PT.2" 
                className="h-10 md:h-20 lg:h-28 object-contain caligo-logo"
                referrerPolicy="no-referrer"
              />

              {/* Text Block - Vertically Centered and Tightly Integrated */}
              <div className="flex flex-col items-start text-left justify-center">
                <span className="text-[11px] md:text-2xl lg:text-3xl caligo-title select-none leading-none">
                  PLAVE
                </span>
                <span className="text-[10px] md:text-lg lg:text-xl caligo-subtitle select-none leading-tight mt-0.5">
                  4TH MINI ALBUM SCHEDULER
                </span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Mobile only Banner Area at top */}
        <div className="lg:hidden w-full max-w-2xl mx-auto mb-20 px-4">
          {imageBanners.length > 0 && (
            <VerticalRollingBanner images={imageBanners} />
          )}
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Today's Schedule & Sidebar (Mobile: 1st, Desktop: Sidebar) */}
          <div className="order-1 lg:order-2 lg:col-span-4 lg:sticky lg:top-8 space-y-8 lg:space-y-6 w-full px-4 md:px-0">
            <TodaySchedule schedule={schedule} />
            
            {/* Desktop only specialized areas */}
            <div className="hidden lg:block w-full">
              {imageBanners.length > 0 && (
                <VerticalRollingBanner images={imageBanners} />
              )}
            </div>

            {/* Mobile only Banner area (if needed, but already handled above) */}
            <div className="lg:hidden w-full">
              {imageBanners.length > 0 && (
                <VerticalRollingBanner images={imageBanners} />
              )}
            </div>
          </div>

          {/* Calendar (Mobile: 2nd, Desktop: Main) */}
          <div className="order-2 lg:order-1 lg:col-span-8 w-full">
            <Calendar schedule={schedule} onEventClick={setSelectedEvent} />
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-12 text-center pb-8">
        </footer>
      </main>

      {/* Admin Edit Button (Invisible but functional) */}
      <button 
        onClick={() => setIsAdminModalOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 p-2 md:p-4 opacity-0 cursor-default"
        title="Admin Edit"
      >
        <Settings className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Event Details Modal */}
      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />

      {/* Admin Edit Modal */}
      <AdminEditModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        schedule={schedule}
        onSave={handleSaveSchedule}
        banners={banners}
        onSaveBanners={handleSaveBanners}
      />

      {/* Comic Panel Borders (Visual only) */}
      <div className="fixed top-0 bottom-0 left-0 w-4 bg-black z-20" />
      <div className="fixed top-0 bottom-0 right-0 w-4 bg-black z-20" />
      <div className="fixed top-0 left-0 right-0 h-4 bg-black z-20" />
      <div className="fixed bottom-0 left-0 right-0 h-4 bg-black z-20" />
    </div>
  );
}

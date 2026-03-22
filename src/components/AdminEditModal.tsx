import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, Save, RotateCcw, Copy, Check } from 'lucide-react';
import { ScheduleEvent, ScheduleType } from '../data/schedule';

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: ScheduleEvent[];
  onSave: (newSchedule: ScheduleEvent[]) => void;
  banners: string[];
  onSaveBanners: (newBanners: string[]) => void;
}

const TAG_OPTIONS: ScheduleType[] = ['CONCEPT PHOTO', 'PRE-ORDER', 'ALBUM PREVIEW', 'PROMOTION', 'COMEBACK'];

export const AdminEditModal: React.FC<AdminEditModalProps> = ({ isOpen, onClose, schedule, onSave, banners, onSaveBanners }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'banners'>('schedule');
  const [editedSchedule, setEditedSchedule] = useState<ScheduleEvent[]>(schedule);
  const [editedBanners, setEditedBanners] = useState<string[]>(banners);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEditedSchedule(schedule);
      setEditedBanners(banners);
    }
  }, [isOpen, schedule, banners]);

  const handleAddRow = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setEditedSchedule([
      ...editedSchedule,
      {
        id: newId,
        title: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        type: 'CONCEPT PHOTO'
      }
    ]);
  };

  const handleAddBanner = () => {
    setEditedBanners([...editedBanners, '']);
  };

  const handleRemoveBanner = (index: number) => {
    setEditedBanners(editedBanners.filter((_, i) => i !== index));
  };

  const handleBannerChange = (index: number, value: string) => {
    const newBanners = [...editedBanners];
    newBanners[index] = value;
    setEditedBanners(newBanners);
  };

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleRemoveRow = (id: string) => {
    setEditedSchedule(editedSchedule.filter(item => item.id !== id));
  };

  const handleChange = (id: string, field: keyof ScheduleEvent, value: string) => {
    setEditedSchedule(editedSchedule.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSave = () => {
    if (activeTab === 'schedule') {
      onSave(editedSchedule);
    } else {
      onSaveBanners(editedBanners);
    }
    onClose();
  };

  const handleExportData = () => {
    const data = {
      schedule: editedSchedule,
      banners: editedBanners
    };
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-6xl bg-[#f0f0f0] comic-border p-3 md:p-6 text-black overflow-hidden flex flex-col max-h-[95vh] md:max-h-[90vh]"
          >
            <div className="absolute inset-0 halftone-bg opacity-5 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto">
                <h2 className="text-xl md:text-3xl font-display comic-title italic">
                  ADMIN EDITOR
                </h2>
                <div className="flex gap-1 bg-gray-200 p-1 rounded-lg border-2 border-black w-full md:w-auto">
                  <button 
                    onClick={() => setActiveTab('schedule')}
                    className={`flex-1 md:flex-none px-3 md:px-4 py-1 text-xs md:text-sm font-bold transition-all ${activeTab === 'schedule' ? 'bg-black text-white' : 'hover:bg-gray-300'}`}
                  >
                    SCHEDULE
                  </button>
                  <button 
                    onClick={() => setActiveTab('banners')}
                    className={`flex-1 md:flex-none px-3 md:px-4 py-1 text-xs md:text-sm font-bold transition-all ${activeTab === 'banners' ? 'bg-black text-white' : 'hover:bg-gray-300'}`}
                  >
                    BANNERS
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto">
                {activeTab === 'schedule' ? (
                  <button 
                    onClick={handleAddRow}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-yellow-400 px-3 md:px-4 py-2 text-xs md:text-sm font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                    ADD EVENT
                  </button>
                ) : (
                  <button 
                    onClick={handleAddBanner}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-yellow-400 px-3 md:px-4 py-2 text-xs md:text-sm font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                    ADD BANNER
                  </button>
                )}
                <button 
                  onClick={handleSave}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#e63946] text-white px-3 md:px-4 py-2 text-xs md:text-sm font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  <Save className="w-4 h-4 md:w-5 md:h-5" />
                  SAVE
                </button>
                <button 
                  onClick={handleExportData}
                  title="Copy data for AI to update the source code"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-500 text-white px-3 md:px-4 py-2 text-xs md:text-sm font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  {isCopied ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 md:w-5 md:h-5" />}
                  {isCopied ? 'COPIED!' : 'COPY FOR AI'}
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 transition-colors rounded-full border-2 border-black"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            <div className="relative z-10 flex-1 overflow-auto border-2 md:border-4 border-black bg-white">
              {activeTab === 'schedule' ? (
                <div className="w-full">
                  {/* Desktop Table View */}
                  <table className="hidden md:table w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-black text-white z-20">
                      <tr>
                        <th className="p-3 border-r border-white/20 font-display text-sm">DATE (START ~ END)</th>
                        <th className="p-3 border-r border-white/20 font-display text-sm">EVENT NAME</th>
                        <th className="p-3 border-r border-white/20 font-display text-sm">TAG</th>
                        <th className="p-3 border-r border-white/20 font-display text-sm">DESCRIPTION</th>
                        <th className="p-3 font-display text-sm w-16"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...editedSchedule].sort((a,b) => a.date.localeCompare(b.date)).map((item) => (
                        <tr key={item.id} className="border-b-2 border-black hover:bg-yellow-50 transition-colors">
                          <td className="p-2 border-r-2 border-black align-top">
                            <div className="flex flex-col gap-1">
                              <input 
                                type="date" 
                                value={item.date}
                                onChange={(e) => handleChange(item.id, 'date', e.target.value)}
                                className="w-full p-1 border border-gray-300 font-mono text-xs"
                              />
                              <input 
                                type="date" 
                                value={item.endDate || ''}
                                onChange={(e) => handleChange(item.id, 'endDate', e.target.value)}
                                className="w-full p-1 border border-gray-300 font-mono text-xs"
                                placeholder="End Date (Optional)"
                              />
                            </div>
                          </td>
                          <td className="p-2 border-r-2 border-black align-top">
                            <input 
                              type="text" 
                              value={item.title}
                              onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                              className="w-full p-1 border border-gray-300 font-bold"
                              placeholder="Event Title"
                            />
                          </td>
                          <td className="p-2 border-r-2 border-black align-top">
                            <select 
                              value={item.type}
                              onChange={(e) => handleChange(item.id, 'type', e.target.value as ScheduleType)}
                              className="w-full p-1 border border-gray-300 font-bold text-xs"
                            >
                              {TAG_OPTIONS.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </td>
                          <td className="p-2 border-r-2 border-black align-top">
                            <textarea 
                              value={item.description}
                              onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                              className="w-full p-1 border border-gray-300 text-xs h-16 resize-none"
                              placeholder="Event Description (Links supported)"
                            />
                          </td>
                          <td className="p-2 align-top text-center">
                            <button 
                              onClick={() => handleRemoveRow(item.id)}
                              className="p-2 text-[#e63946] hover:bg-[#e63946] hover:text-white transition-all rounded-md"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile Card View */}
                  <div className="md:hidden divide-y-2 divide-black">
                    {[...editedSchedule].sort((a,b) => a.date.localeCompare(b.date)).map((item) => (
                      <div key={item.id} className="p-4 space-y-3 bg-white">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 space-y-2">
                            <div className="flex gap-1">
                              <input 
                                type="date" 
                                value={item.date}
                                onChange={(e) => handleChange(item.id, 'date', e.target.value)}
                                className="w-full p-1 border border-gray-300 font-mono text-xs"
                              />
                              <input 
                                type="date" 
                                value={item.endDate || ''}
                                onChange={(e) => handleChange(item.id, 'endDate', e.target.value)}
                                className="w-full p-1 border border-gray-300 font-mono text-xs"
                                placeholder="End Date"
                              />
                            </div>
                            <input 
                              type="text" 
                              value={item.title}
                              onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                              className="w-full p-1 border border-gray-300 font-bold text-sm"
                              placeholder="Event Title"
                            />
                          </div>
                          <button 
                            onClick={() => handleRemoveRow(item.id)}
                            className="p-2 text-[#e63946] border border-[#e63946] rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <select 
                            value={item.type}
                            onChange={(e) => handleChange(item.id, 'type', e.target.value as ScheduleType)}
                            className="w-full p-1 border border-gray-300 font-bold text-[10px]"
                          >
                            {TAG_OPTIONS.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                        <textarea 
                          value={item.description}
                          onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                          className="w-full p-1 border border-gray-300 text-xs h-20 resize-none"
                          placeholder="Description"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {editedBanners.map((url, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 border-2 border-black relative group">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold">BANNER #{idx + 1}</span>
                          <button 
                            onClick={() => handleRemoveBanner(idx)}
                            className="ml-auto text-[#e63946] hover:bg-[#e63946] hover:text-white p-1 rounded transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input 
                          type="text"
                          value={url}
                          onChange={(e) => handleBannerChange(idx, e.target.value)}
                          placeholder="Image URL or YouTube Link"
                          className="w-full p-2 border-2 border-black font-mono text-xs mb-4"
                        />
                        <div className="aspect-video bg-black flex items-center justify-center overflow-hidden border-2 border-black">
                          {url ? (
                            getYoutubeId(url) ? (
                              <div className="relative w-full h-full">
                                <img 
                                  src={`https://img.youtube.com/vi/${getYoutubeId(url)}/0.jpg`} 
                                  alt="YouTube Preview" 
                                  className="w-full h-full object-cover opacity-60"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="bg-red-600 text-white px-3 py-1 font-bold text-[10px] comic-border">YOUTUBE</div>
                                </div>
                              </div>
                            ) : (
                              <img src={url} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            )
                          ) : (
                            <div className="text-gray-500 text-xs italic">NO PREVIEW</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {editedBanners.length === 0 && (
                    <div className="text-center py-20 text-gray-400 italic">
                      No banners added. Click "ADD BANNER" to start.
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="mt-4 text-xs font-bold text-gray-500 italic">
              * Changes will be applied to the calendar and today's schedule immediately after saving.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

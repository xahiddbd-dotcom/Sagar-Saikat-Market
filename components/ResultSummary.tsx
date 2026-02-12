
import React, { useState, useEffect, useCallback } from 'react';
import { MarketEntity } from '../types';

interface ResultSummaryProps {
  onInteract: () => void;
  shops: MarketEntity[];
}

type TransitionEffect = 'effect-water' | 'effect-rainbow' | 'effect-glass' | 'effect-velocity' | 'effect-flip' | 'effect-blur';

const ResultSummary: React.FC<ResultSummaryProps> = ({ onInteract, shops }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentEffect, setCurrentEffect] = useState<TransitionEffect>('effect-blur');
  const [triggerKey, setTriggerKey] = useState(0);

  const entities = shops;
  const effects: TransitionEffect[] = ['effect-water', 'effect-rainbow', 'effect-glass', 'effect-velocity', 'effect-flip', 'effect-blur'];

  const pickRandomEffect = () => {
    const randomIdx = Math.floor(Math.random() * effects.length);
    setCurrentEffect(effects[randomIdx]);
    setTriggerKey(prev => prev + 1);
  };

  const handleNext = useCallback(() => {
    onInteract();
    pickRandomEffect();
    setCurrentIndex((prev) => (prev + 1) % entities.length);
  }, [entities.length, onInteract]);

  const handlePrev = useCallback(() => {
    onInteract();
    pickRandomEffect();
    setCurrentIndex((prev) => (prev - 1 + entities.length) % entities.length);
  }, [entities.length, onInteract]);

  const togglePlay = () => {
    onInteract();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let timer: number;
    if (isPlaying && entities.length > 0) {
      timer = window.setInterval(handleNext, 30000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, handleNext, entities.length]);

  if (entities.length === 0) return null;
  const current = entities[currentIndex];

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative group md:h-[380px]">
      <div className={`absolute inset-0 opacity-5 transition-colors duration-1000 ${current.category === 'Coaching' ? 'bg-orange-600' : 'bg-blue-800'}`}></div>
      <div className="absolute top-3 left-3 md:top-5 md:left-5 z-20 flex items-center gap-2">
        <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 md:px-3.5 md:py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-gray-100/50">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-[7px] md:text-[9px] font-black text-blue-900 tracking-tighter uppercase">{current.floor} {current.side ? `| ${current.side === 'Left' ? 'বাম' : 'ডান'}` : ''}</span>
        </div>
      </div>
      <div className="absolute top-3 right-3 md:top-5 md:right-5 z-20 bg-black/20 backdrop-blur px-2 py-0.5 rounded-full">
         <span className="text-white text-[8px] md:text-[9px] font-mono font-bold tracking-widest">{String(currentIndex + 1).padStart(2, '0')} / {entities.length}</span>
      </div>
      <div key={`${current.id}-${triggerKey}`} className={`grid grid-cols-1 md:grid-cols-2 h-full ${currentEffect}`}>
        <div className="relative overflow-hidden h-36 md:h-full group/img">
          <img src={current.imageUrl} alt={current.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 text-white transform">
             <p className="text-[7px] md:text-[9px] font-bold uppercase tracking-widest text-blue-400">মালিকানা</p>
             <p className="text-xs md:text-base font-black">{current.owner}</p>
          </div>
        </div>
        <div className="p-5 md:p-8 flex flex-col justify-center bg-white relative z-10">
          <div className="space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[7px] md:text-[9px] font-black uppercase tracking-widest">
              {current.category === 'Coaching' ? 'কোচিং সেন্টার' : 'বানিজ্যিক প্রতিষ্ঠান'}
            </div>
            <h2 className="text-xl md:text-3xl font-black text-gray-900 leading-tight tracking-tighter line-clamp-2">{current.name}</h2>
            <div className="space-y-2 md:space-y-3 pr-0 md:pr-2">
              <p className="text-xs md:text-base text-gray-500 font-medium italic line-clamp-2">"{current.specialty}"</p>
              <div className="flex flex-wrap gap-2 pt-1">
                 <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                    <span className="text-[9px] md:text-xs font-black text-gray-700">{current.contact}</span>
                 </div>
                 <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${current.status === 'Open' ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${current.status === 'Open' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
                    <span className={`text-[9px] md:text-xs font-black ${current.status === 'Open' ? 'text-green-800' : 'text-red-800'}`}>
                      {current.status === 'Open' ? 'এখন খোলা' : 'এখন বন্ধ'}
                    </span>
                 </div>
              </div>
            </div>
            <div className="pt-3 md:pt-6 flex items-center justify-between md:justify-start gap-3 md:gap-5">
              <button onClick={handlePrev} className="p-2.5 md:p-3 rounded-xl bg-gray-50 text-gray-400 hover:bg-blue-800 hover:text-white transition-all transform active:scale-90 border border-gray-100 shadow-sm"><svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg></button>
              <button onClick={togglePlay} className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-xl transition-all transform active:scale-90 shadow-lg ${isPlaying ? 'bg-blue-800 text-white' : 'bg-orange-600 text-white'}`}>{isPlaying ? <svg className="w-5 h-5 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> : <svg className="w-5 h-5 md:w-7 md:h-7 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>}</button>
              <button onClick={handleNext} className="p-2.5 md:p-3 rounded-xl bg-gray-50 text-gray-400 hover:bg-blue-800 hover:text-white transition-all transform active:scale-90 border border-gray-100 shadow-sm"><svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
        </div>
      </div>
      {isPlaying && (
        <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
          <div key={currentIndex} className="h-full bg-gradient-to-r from-blue-800 to-indigo-600" style={{ animation: 'progress 30s linear forwards' }}></div>
        </div>
      )}
      <style>{`@keyframes progress { from { width: 0; } to { width: 100%; } }`}</style>
    </div>
  );
};

export default ResultSummary;

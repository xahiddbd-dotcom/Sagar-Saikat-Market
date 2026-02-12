
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import LiveTicker from './components/LiveTicker';
import ResultSummary from './components/ResultSummary';
import EmployeeShowcase from './components/EmployeeShowcase';
import NewsSection from './components/NewsSection';
import ComplaintBox from './components/ComplaintBox';
import AdminPanel from './components/AdminPanel';
import { MARKET_ENTITIES } from './constants';
import { MarketEntity, MarketNews } from './types';
import { fetchMarketUpdates } from './services/geminiService';

const INITIAL_MEMBERS = [
  { name: 'আলহাজ্ব মোঃ আব্দুর রহিম', position: 'সভাপতি', phone: '০১৮১৮-xxxxxx', info: 'ব্যবসায়ী ও সমাজসেবক' },
  { name: 'মোঃ কামাল হোসেন', position: 'সহ-সভাপতি', phone: '০১৯১১-xxxxxx', info: 'প্রোপাইটর, রহিম স্টোর' },
  { name: 'মোঃ জাফর আলম', position: 'সাধারণ সম্পাদক', phone: '০১৭১১-xxxxxx', info: 'আইটি বিশেষজ্ঞ' },
  { name: 'মোঃ শাহ আলম', position: 'কোষাধ্যক্ষ', phone: '০১৫৫২-xxxxxx', info: 'হিসাব রক্ষণ কর্মকর্তা' },
  { name: 'মোঃ আবু তাহের', position: 'সদস্য', phone: '০১৭২২-xxxxxx', info: 'মালিক, তাহের এন্টারপ্রাইজ' },
];

const INITIAL_EMPLOYEES = [
  {
    name: 'সুমন আহমেদ',
    shop: 'Food Lover Zone',
    skill: 'দ্রুত সেবা ও কাস্টমার ম্যানেজমেন্ট',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    badge: 'সেরা কর্মী'
  },
  {
    name: 'আরিফ হোসেন',
    shop: 'সাইফুল কম্পিউটার',
    skill: 'গ্রাফিক্স ডিজাইন ও দ্রুত টাইপিং',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    badge: 'সেরা টেকনিশিয়ান'
  }
];

const INITIAL_NOTICES = [
  'মেডিকো কোচিং সেন্টারে নতুন ব্যাচে ভর্তি চলছে! ৩য় তলা, দোকান নং ৩০৫।',
  'সাগর ইলেকট্রনিক্সে ঈদ ধামাকা অফার শুরু হয়েছে - সব পণ্যে ১০% ডিসকাউন্ট!',
  'আগামী শুক্রবার মার্কেট সাপ্তাহিক ছুটির দিন হিসেবে বন্ধ থাকবে।'
];

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEffectActive, setIsEffectActive] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Global App States
  const [shops, setShops] = useState<MarketEntity[]>(MARKET_ENTITIES);
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [news, setNews] = useState<MarketNews[]>([]);
  const [notices, setNotices] = useState(INITIAL_NOTICES);

  // Login Credentials
  const [adminCreds, setAdminCreds] = useState({ user: '', pass: '' });

  // Load initial news via Gemini
  useEffect(() => {
    const loadNews = async () => {
      const latestNews = await fetchMarketUpdates();
      if (latestNews && latestNews.length > 0) {
        setNews(latestNews);
      }
    };
    loadNews();
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCreds.user === 'admin' && adminCreds.pass === 'admin') {
      setIsAdminLoggedIn(true);
      setShowAdminLogin(false);
      setShowAdminPanel(true);
    } else {
      alert('ইউজার আইডি বা পাসওয়ার্ড সঠিক নয়! ইউজার: admin, পাসওয়ার্ড: admin ব্যবহার করুন।');
    }
  };

  const triggerGlobalEffect = () => {
    setIsEffectActive(true);
    setTimeout(() => setIsEffectActive(false), 800);
  };

  const filteredEntities = useMemo(() => {
    return shops.filter(entity => 
      entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [shops, searchTerm]);

  const groupedByFloor = useMemo(() => {
    const groups: Record<string, MarketEntity[]> = {};
    filteredEntities.forEach(entity => {
      if (!groups[entity.floor]) {
        groups[entity.floor] = [];
      }
      groups[entity.floor].push(entity);
    });
    return groups;
  }, [filteredEntities]);

  const floorOrder = useMemo(() => {
     const uniqueFloors = Array.from(new Set(shops.map(s => s.floor)));
     const standardOrder = ['নিচতলা', '২য় তলা', '৩য় তলা', '৪র্থ তলা', '৫ম তলা', '৬ষ্ঠ তলা'];
     return uniqueFloors.sort((a, b) => {
       const idxA = standardOrder.indexOf(a);
       const idxB = standardOrder.indexOf(b);
       if (idxA === -1) return 1;
       if (idxB === -1) return -1;
       return idxA - idxB;
     });
  }, [shops]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 ${isEffectActive ? 'bg-blue-50' : 'bg-gray-50'}`}>
      
      {/* Admin Login Overlay */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl w-full max-w-sm border border-gray-100 animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-blue-800 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-xl">A</div>
            <h2 className="text-2xl font-black text-gray-900 mb-2 text-center">সিস্টেম লগইন</h2>
            <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest mb-8 italic">Admin: admin | Pass: admin</p>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input 
                type="text" 
                required 
                placeholder="ইউজার আইডি" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-800/10 font-bold"
                value={adminCreds.user}
                onChange={e => setAdminCreds({...adminCreds, user: e.target.value})}
              />
              <input 
                type="password" 
                required 
                placeholder="পাসওয়ার্ড" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-800/10 font-bold"
                value={adminCreds.pass}
                onChange={e => setAdminCreds({...adminCreds, pass: e.target.value})}
              />
              <button type="submit" className="w-full bg-blue-800 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-blue-900 transition-all active:scale-95">লগইন করুন</button>
              <button type="button" onClick={() => setShowAdminLogin(false)} className="w-full text-gray-400 text-xs font-black uppercase tracking-widest mt-4">ফিরে যান</button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Panel Overlay */}
      {showAdminPanel && (
        <AdminPanel 
          onClose={() => setShowAdminPanel(false)} 
          shops={shops} setShops={setShops}
          members={members} setMembers={setMembers}
          employees={employees} setEmployees={setEmployees}
          news={news} setNews={setNews}
          notices={notices} setNotices={setNotices}
        />
      )}

      <Navbar onAdminClick={() => isAdminLoggedIn ? setShowAdminPanel(true) : setShowAdminLogin(true)} />
      <LiveTicker notices={notices} />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          <div className="lg:col-span-2 order-1">
            <ResultSummary onInteract={triggerGlobalEffect} shops={shops} />
            <EmployeeShowcase employees={employees} />
          </div>
          
          <div className="space-y-8 order-2">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 relative overflow-hidden group">
              <h3 className="text-xl font-black text-gray-900 mb-2 relative z-10">প্রতিষ্ঠান খুঁজুন</h3>
              <p className="text-xs text-gray-400 mb-6 relative z-10 font-medium">নাম বা সেবার ধরণ লিখে ডিরেক্টরি সার্চ করুন</p>
              <div className="relative z-10">
                <input 
                  type="text"
                  placeholder="উদা: ফটোকপি বা মেডিকো..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-800/10 transition-all font-bold"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
              <h3 className="font-black text-gray-900 flex items-center gap-3 mb-8">
                <span className="w-2 h-8 bg-orange-600 rounded-full"></span>
                মার্কেট সমিতির সদস্যবৃন্দ
              </h3>
              <div className="space-y-4">
                {members.map((member, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100 group">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 shrink-0 font-black text-xs">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-black text-gray-900 truncate">{member.name}</h4>
                        <span className="text-[8px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full whitespace-nowrap">{member.position}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5 font-bold uppercase tracking-wider">{member.info}</p>
                      <div className="flex items-center gap-2 mt-3 text-[11px] font-black text-blue-800 bg-blue-50 w-fit px-3 py-1 rounded-lg">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        {member.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-12 italic border-l-8 border-blue-800 pl-6">সাগর সৈকত ডিজিটাল ডিরেক্টরি</h2>
          <div className="space-y-20">
            {floorOrder.map(floorName => {
              const entitiesInFloor = groupedByFloor[floorName];
              if (!entitiesInFloor || entitiesInFloor.length === 0) return null;
              return (
                <div key={floorName} className="space-y-10">
                  <div className="flex items-center gap-6">
                    <h3 className="text-xl md:text-3xl font-black text-white bg-blue-800 px-8 md:px-12 py-3 rounded-tr-[40px] rounded-bl-[40px] shadow-xl transform -rotate-1 italic">
                      {floorName}
                    </h3>
                    <div className="flex-1 h-px bg-blue-800/10"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {entitiesInFloor.map(entity => <EntityCard key={entity.id} entity={entity} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <NewsSection initialNews={news} onNewsUpdate={setNews} />
      </main>

      <footer className="bg-gray-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="w-16 h-16 bg-blue-800 rounded-3xl mx-auto mb-8 flex items-center justify-center font-black text-2xl shadow-2xl transform rotate-12">স</div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter italic">সাগর সৈকত মার্কেট</h2>
          <p className="text-gray-500 text-xs md:text-base max-w-sm md:max-w-xl mx-auto leading-relaxed font-medium mb-12 italic">
            "ডিজিটাল বাংলাদেশের পথে সাগর সৈকত মার্কেট - আপনার বিশ্বস্ত গন্তব্য।"
          </p>
          <div className="mt-12 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-[9px] md:text-[11px] text-gray-500 font-black uppercase tracking-[0.2em]">
            <span>© ২০২৪ সাগর সৈকত মার্কেট। ডিজিটাল ডিরেক্টরি।</span>
            <span className="hidden md:block w-1.5 h-1.5 bg-white/10 rounded-full"></span>
            <span className="text-blue-600">ডিজাইন ও ডেভেলপমেন্ট: সাগর সৈকত আইটি টিম</span>
          </div>
        </div>
      </footer>

      <ComplaintBox shops={shops} />
    </div>
  );
};

const EntityCard: React.FC<{ entity: MarketEntity }> = ({ entity }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex gap-5">
    <div className={`absolute top-0 left-0 w-2 h-full ${
      entity.category === 'Coaching' ? 'bg-orange-500' : 
      entity.category === 'Service' ? 'bg-green-500' : 'bg-blue-800'
    }`}></div>
    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
       <img src={entity.imageUrl} alt={entity.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    </div>
    <div className="flex-1 min-w-0 flex flex-col justify-center">
      <div className="flex justify-between items-start mb-1">
        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
          entity.category === 'Coaching' ? 'bg-orange-100 text-orange-700' : 
          entity.category === 'Service' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-800'
        }`}>
          {entity.category === 'Coaching' ? 'কোচিং' : entity.category === 'Service' ? 'সেবা' : 'দোকান'}
        </span>
        <span className={`text-[8px] font-black uppercase ${entity.status === 'Open' ? 'text-green-600' : 'text-red-500'}`}>
          {entity.status === 'Open' ? '● খোলা' : '● বন্ধ'}
        </span>
      </div>
      <h3 className="font-black text-gray-900 text-sm md:text-base truncate mb-1">{entity.name}</h3>
      <p className="text-[10px] text-gray-400 font-medium line-clamp-2 leading-relaxed mb-4">{entity.specialty}</p>
      <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center">
        <span className="text-[9px] text-gray-900 font-bold truncate max-w-[120px]">মালিক: {entity.owner}</span>
        <button className="text-[9px] font-black text-blue-800 flex items-center gap-1 group/btn hover:translate-x-1 transition-transform bg-blue-50 px-3 py-1 rounded-xl">
          বিস্তারিত <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </div>
);

export default App;

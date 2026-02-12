
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import LiveTicker from './components/LiveTicker';
import ResultSummary from './components/ResultSummary';
import EmployeeShowcase from './components/EmployeeShowcase';
import NewsSection from './components/NewsSection';
import ComplaintBox from './components/ComplaintBox';
import AdminPanel from './components/AdminPanel';
import GeminiAssistant from './components/GeminiAssistant';
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

  // Global App States - Persisted in memory for session
  const [shops, setShops] = useState<MarketEntity[]>(MARKET_ENTITIES);
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [news, setNews] = useState<MarketNews[]>([]);
  const [notices, setNotices] = useState(INITIAL_NOTICES);

  const [adminCreds, setAdminCreds] = useState({ user: '', pass: '' });

  // Load initial AI-generated news
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
      alert('ভুল ইউজার আইডি বা পাসওয়ার্ড! ডেমোর জন্য admin/admin ব্যবহার করুন।');
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
       return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
     });
  }, [shops]);

  return (
    <div className={`min-h-screen flex flex-col font-['Hind_Siliguri'] transition-colors duration-1000 ${isEffectActive ? 'bg-blue-50' : 'bg-[#fcfdfe]'}`}>
      
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-white p-8 md:p-12 rounded-[48px] shadow-2xl w-full max-w-sm border border-gray-100 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-blue-800 rounded-3xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-8 shadow-2xl shadow-blue-800/30">স</div>
            <h2 className="text-2xl font-black text-gray-900 mb-2 text-center tracking-tight">অ্যাডমিন লগইন</h2>
            <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-[0.2em] mb-10 italic">Secure Digital Portal</p>
            <form onSubmit={handleAdminLogin} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">ইউজার আইডি</label>
                <input 
                  type="text" 
                  required 
                  placeholder="admin" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-800/10 font-bold transition-all text-gray-900"
                  value={adminCreds.user}
                  onChange={e => setAdminCreds({...adminCreds, user: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">পাসওয়ার্ড</label>
                <input 
                  type="password" 
                  required 
                  placeholder="admin" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-800/10 font-bold transition-all text-gray-900"
                  value={adminCreds.pass}
                  onChange={e => setAdminCreds({...adminCreds, pass: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-blue-800 text-white font-black py-5 rounded-2xl shadow-2xl shadow-blue-800/30 hover:bg-blue-900 transition-all active:scale-95 transform hover:-translate-y-1">প্যানেলে প্রবেশ করুন</button>
              <button type="button" onClick={() => setShowAdminLogin(false)} className="w-full text-gray-400 text-xs font-black uppercase tracking-widest mt-6 hover:text-gray-600 transition-colors">ফিরে যান</button>
            </form>
          </div>
        </div>
      )}

      {/* Full Admin Panel UI */}
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

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-14 mb-20">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            <ResultSummary onInteract={triggerGlobalEffect} shops={shops} />
            <EmployeeShowcase employees={employees} />
          </div>
          
          {/* Sidebar Area */}
          <div className="space-y-10">
            {/* Premium Search */}
            <div className="bg-white p-10 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/50 rounded-bl-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 relative z-10 tracking-tight italic">খুঁজুন</h3>
              <p className="text-xs text-gray-400 mb-8 relative z-10 font-bold uppercase tracking-widest">Store & Service Directory</p>
              <div className="relative z-10">
                <input 
                  type="text"
                  placeholder="দোকান বা কোচিংয়ের নাম..."
                  className="w-full bg-gray-50/80 border border-gray-100 rounded-3xl px-6 py-5 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-800/10 transition-all font-bold text-lg"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Association Members */}
            <div className="bg-white p-10 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50">
              <div className="flex items-center justify-between mb-10">
                <h3 className="font-black text-xl text-gray-900 flex items-center gap-4 italic">
                  <span className="w-2.5 h-10 bg-orange-600 rounded-full shadow-lg shadow-orange-600/20"></span>
                  সমিতি সদস্য
                </h3>
              </div>
              <div className="space-y-6">
                {members.map((member, index) => (
                  <div key={index} className="flex items-start gap-5 p-5 rounded-3xl hover:bg-orange-50/30 transition-all border border-transparent hover:border-orange-100 group">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0 font-black text-sm shadow-inner group-hover:scale-110 transition-transform duration-500">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm md:text-base font-black text-gray-900 truncate tracking-tight">{member.name}</h4>
                        <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full whitespace-nowrap border border-orange-100 uppercase">{member.position}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest leading-none">{member.info}</p>
                      <div className="flex items-center gap-2 mt-4 text-xs font-black text-blue-800 bg-blue-50/80 w-fit px-4 py-2 rounded-2xl border border-blue-100/50">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        {member.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Directory Sections */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="relative">
              <div className="absolute -top-10 -left-6 w-24 h-24 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tighter mb-3 italic">সাগর সৈকত ডিরেক্টরি</h2>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.3em] ml-1 opacity-60">Complete Market Floor Map</p>
            </div>
            <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-blue-800/20 via-blue-800/5 to-transparent mx-12 mb-5"></div>
          </div>
          
          <div className="space-y-24 md:space-y-36">
            {floorOrder.map(floorName => {
              const entitiesInFloor = groupedByFloor[floorName];
              if (!entitiesInFloor || entitiesInFloor.length === 0) return null;
              return (
                <div key={floorName} className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                  <div className="flex items-center gap-8">
                    <h3 className="text-2xl md:text-4xl font-black text-white bg-blue-800 px-10 md:px-14 py-4 md:py-5 rounded-tr-[56px] rounded-bl-[56px] shadow-2xl shadow-blue-800/30 transform -rotate-1 italic scale-105 border-4 border-white">
                      {floorName}
                    </h3>
                    <div className="flex-1 space-y-2">
                      <div className="h-1.5 w-full bg-blue-800/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-800 w-32 shadow-[0_0_15px_rgba(30,58,138,0.5)]"></div>
                      </div>
                      <p className="text-[11px] text-blue-800 font-black tracking-[0.2em] uppercase opacity-40">{entitiesInFloor.length} Active Stores / Services</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {entitiesInFloor.map(entity => <EntityCard key={entity.id} entity={entity} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <NewsSection initialNews={news} onNewsUpdate={setNews} />
      </main>

      {/* Premium Footer */}
      <footer className="bg-[#050810] text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-800/10 rounded-full blur-[140px] -translate-y-1/2 -z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-800/5 rounded-full blur-[140px] translate-y-1/2 -z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-800 rounded-[32px] mx-auto mb-10 flex items-center justify-center font-black text-3xl md:text-4xl shadow-[0_0_60px_rgba(30,58,138,0.4)] transform rotate-12 hover:rotate-0 transition-transform duration-700 cursor-pointer">স</div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter italic">সাগর সৈকত মার্কেট</h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-sm md:max-w-2xl mx-auto leading-relaxed font-medium mb-16 opacity-80">
            সর্বাধুনিক সুযোগ-সুবিধা সম্বলিত আপনার প্রিয় কেনাকাটা ও শিক্ষা কেন্দ্র। ডিজিটাল বাংলাদেশের অঙ্গীকারে আমরা সবসময় আপনার পাশে আছি।
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-20 border-y border-white/5 py-8">
             {['হোম', 'ডিরেক্টরি', 'ব্লগ', 'শপ লগইন', 'অ্যাডমিন', 'সহায়তা'].map(link => (
               <a key={link} href="#" className="text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-blue-500 transition-colors duration-300">{link}</a>
             ))}
          </div>

          <div className="pt-12">
             <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-[10px] md:text-xs text-gray-500 font-black uppercase tracking-[0.25em]">
               <span className="flex items-center gap-3">
                 <svg className="w-5 h-5 text-blue-800" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                 © ২০২৪ সাগর সৈকত মার্কেট। ডিজিটাল সংস্করণ।
               </span>
               <span className="hidden md:block w-2 h-2 bg-white/5 rounded-full"></span>
               <span className="flex items-center gap-3 group cursor-default">
                  ডিজাইন ও ডেভেলপমেন্ট: 
                  <span className="text-blue-700 group-hover:text-blue-400 transition-colors duration-300">সাগর সৈকত টেকনোলজি সেন্টার</span>
               </span>
             </div>
          </div>
        </div>
      </footer>

      <ComplaintBox shops={shops} />
      <GeminiAssistant />
    </div>
  );
};

const EntityCard: React.FC<{ entity: MarketEntity }> = ({ entity }) => (
  <div className="bg-white p-8 rounded-[48px] border border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 group relative overflow-hidden flex flex-col md:flex-row gap-6 md:items-center">
    {/* Category Strip */}
    <div className={`absolute top-0 left-0 w-2.5 h-full transition-all duration-500 ${
      entity.category === 'Coaching' ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 
      entity.category === 'Service' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-blue-800 shadow-[0_0_15px_rgba(30,58,138,0.3)]'
    }`}></div>

    {/* Image container */}
    <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100 shadow-inner group-hover:scale-105 transition-transform duration-700">
       <img src={entity.imageUrl} alt={entity.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
    </div>

    {/* Info container */}
    <div className="flex-1 min-w-0 flex flex-col justify-center">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
          entity.category === 'Coaching' ? 'bg-orange-50/50 text-orange-700 border-orange-100' : 
          entity.category === 'Service' ? 'bg-green-50/50 text-green-700 border-green-100' : 'bg-blue-50/50 text-blue-800 border-blue-100'
        }`}>
          {entity.category === 'Coaching' ? 'কোচিং সেন্টার' : entity.category === 'Service' ? 'সেবা প্রদানকারী' : 'বানিজ্যিক দোকান'}
        </span>
        <span className={`text-[9px] font-black uppercase ${entity.status === 'Open' ? 'text-green-600' : 'text-red-500'} flex items-center gap-1.5`}>
          <span className={`w-1.5 h-1.5 rounded-full ${entity.status === 'Open' ? 'bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.5)]' : 'bg-red-500'} animate-pulse`}></span>
          {entity.status === 'Open' ? 'খোলা' : 'বন্ধ'}
        </span>
      </div>
      <h3 className="font-black text-gray-950 text-base md:text-lg truncate group-hover:text-blue-800 transition-colors duration-300 leading-tight mb-1 tracking-tight italic">{entity.name}</h3>
      <p className="text-xs text-gray-400 font-bold line-clamp-2 leading-relaxed mb-4 group-hover:text-gray-500 transition-colors">{entity.specialty || 'তথ্য আপডেট করা হচ্ছে...'}</p>
      
      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[8px] text-gray-300 font-black uppercase tracking-widest mb-0.5">মালিকানা</span>
          <span className="text-xs text-gray-900 font-black truncate max-w-[130px] italic">{entity.owner}</span>
        </div>
        <button className="text-[10px] font-black text-blue-800 flex items-center gap-2 group/btn hover:translate-x-1 transition-transform bg-blue-50/50 px-4 py-2 rounded-2xl border border-blue-100/30">
          বিস্তারিত <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </div>
);

export default App;

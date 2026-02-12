
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import LiveTicker from './components/LiveTicker';
import ResultSummary from './components/ResultSummary';
import EmployeeShowcase from './components/EmployeeShowcase';
import NewsSection from './components/NewsSection';
import ComplaintBox from './components/ComplaintBox';
import AdminPanel from './components/AdminPanel';
import { MARKET_ENTITIES } from './constants';
import { MarketEntity, MarketNews } from './types';

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

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCreds.user === 'admin' && adminCreds.pass === 'admin') {
      setIsAdminLoggedIn(true);
      setShowAdminLogin(false);
      setShowAdminPanel(true);
    } else {
      alert('ইউজার আইডি বা পাসওয়ার্ড সঠিক নয়!');
    }
  };

  const triggerGlobalEffect = () => {
    setIsEffectActive(true);
    setTimeout(() => setIsEffectActive(false), 800);
  };

  const filteredEntities = shops.filter(entity => 
    entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const floorOrder = Array.from(new Set(shops.map(s => s.floor))).sort((a, b) => {
     const order = ['নিচতলা', '২য় তলা', '৩য় তলা', '৪র্থ তলা', '৫ম তলা', '৬ষ্ঠ তলা'];
     return order.indexOf(a) - order.indexOf(b);
  });

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 transition-colors duration-1000 ${isEffectActive ? 'bg-blue-100' : 'bg-gray-50'}`}>
      
      {/* Admin Login Overlay */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-gray-100 animate-in zoom-in duration-300">
            <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">অ্যাডমিন লগইন</h2>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input 
                type="text" 
                required 
                placeholder="ইউজার আইডি (admin)" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-800"
                value={adminCreds.user}
                onChange={e => setAdminCreds({...adminCreds, user: e.target.value})}
              />
              <input 
                type="password" 
                required 
                placeholder="পাসওয়ার্ড (admin)" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-800"
                value={adminCreds.pass}
                onChange={e => setAdminCreds({...adminCreds, pass: e.target.value})}
              />
              <button type="submit" className="w-full bg-blue-800 text-white font-black py-3 rounded-xl shadow-lg hover:bg-blue-900 transition-all active:scale-95">লগইন করুন</button>
              <button type="button" onClick={() => setShowAdminLogin(false)} className="w-full text-gray-400 text-sm font-bold">বাতিল করুন</button>
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

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          <div className="lg:col-span-2 order-1">
            <ResultSummary onInteract={triggerGlobalEffect} shops={shops} />
            <EmployeeShowcase employees={employees} />
          </div>
          
          <div className="space-y-6 order-2">
            <div className="bg-gradient-to-br from-blue-800 to-indigo-900 p-5 md:p-6 rounded-2xl text-white shadow-lg relative overflow-hidden group">
              <h3 className="text-lg md:text-xl font-bold mb-2 relative z-10">প্রতিষ্ঠান খুঁজুন</h3>
              <p className="text-[10px] md:text-xs text-blue-100 mb-4 relative z-10 opacity-80">নাম বা সেবার ধরণ লিখে সার্চ করুন</p>
              <div className="relative z-10">
                <input 
                  type="text"
                  placeholder="উদা: মেডিকো বা ফটোকপি..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm md:text-base text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all focus:bg-white/20"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
                মার্কেট সমিতির সদস্যবৃন্দ
              </h3>
              <div className="space-y-3">
                {members.map((member, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100">
                    <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0 font-bold text-xs">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs md:text-sm font-bold text-gray-900 truncate">{member.name}</h4>
                        <span className="text-[8px] md:text-[9px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded ml-2 whitespace-nowrap">{member.position}</span>
                      </div>
                      <p className="text-[9px] md:text-10px text-gray-400 mt-0.5">{member.info}</p>
                      <div className="flex items-center gap-1.5 mt-2 text-[10px] md:text-[11px] font-bold text-blue-800">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        {member.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 border-l-4 md:border-l-8 border-blue-800 pl-3 md:pl-4 mb-8 tracking-tight">সাগর সৈকত ডিরেক্টরি</h2>
          <div className="space-y-12 md:space-y-16">
            {floorOrder.map(floorName => {
              const entitiesInFloor = groupedByFloor[floorName];
              if (!entitiesInFloor || entitiesInFloor.length === 0) return null;
              return (
                <div key={floorName} className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-4 md:gap-6">
                    <h3 className="text-lg md:text-2xl font-black text-white bg-blue-800 px-5 md:px-8 py-1.5 md:py-2 rounded-tr-2xl md:rounded-tr-3xl rounded-bl-2xl md:rounded-bl-3xl shadow-lg transform -rotate-1 italic">
                      {floorName}
                    </h3>
                    <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-800 to-transparent rounded-full opacity-30"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {entitiesInFloor.map(entity => <EntityCard key={entity.id} entity={entity} />)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <NewsSection initialNews={news} onNewsUpdate={setNews} />
      </main>

      <footer className="bg-gray-900 text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 via-indigo-500 to-blue-800"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-800 rounded-xl md:rounded-2xl mx-auto mb-4 md:mb-6 flex items-center justify-center font-black text-xl md:text-2xl shadow-2xl transform rotate-12">স</div>
          <h2 className="text-xl md:text-3xl font-black mb-3 md:mb-4 tracking-tighter">সাগর সৈকত মার্কেট</h2>
          <p className="text-gray-500 text-[10px] md:text-sm max-w-xs md:max-w-md mx-auto leading-relaxed">সর্বাধুনিক সুযোগ-সুবিধা সম্বলিত আপনার প্রিয় কেনাকাটা ও শিক্ষা কেন্দ্র।</p>
          <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-[8px] md:text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            <span>© ২০২৪ সাগর সৈকত মার্কেট। ডিজিটাল ডিরেক্টরি।</span>
            <span className="hidden md:block">|</span>
            <a href="#" className="text-blue-700 hover:text-blue-500 transition-colors">ডিজাইন ও ডেভেলপমেন্ট: সাগর সৈকত আইটি টিম</a>
          </div>
        </div>
      </footer>

      <ComplaintBox shops={shops} />
    </div>
  );
};

const EntityCard: React.FC<{ entity: MarketEntity }> = ({ entity }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden flex gap-3 md:gap-4">
    <div className={`absolute top-0 left-0 w-1 md:w-1.5 h-full transition-all duration-500 ${
      entity.category === 'Coaching' ? 'bg-orange-500' : 
      entity.category === 'Service' ? 'bg-green-500' : 'bg-blue-600'
    }`}></div>
    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
       <img src={entity.imageUrl} alt={entity.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start mb-0.5 md:mb-1">
        <span className={`text-[7px] md:text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter ${
          entity.category === 'Coaching' ? 'bg-orange-100 text-orange-700' : 
          entity.category === 'Service' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {entity.category === 'Coaching' ? 'কোচিং' : entity.category === 'Service' ? 'সেবা' : 'দোকান'}
        </span>
        <span className={`text-[7px] font-black uppercase ${entity.status === 'Open' ? 'text-green-600' : 'text-red-600'}`}>
          {entity.status === 'Open' ? '● এখন খোলা' : '● এখন বন্ধ'}
        </span>
      </div>
      <h3 className="font-bold text-gray-900 text-xs md:text-sm truncate group-hover:text-blue-800 transition-colors leading-tight mb-0.5 md:mb-1">{entity.name}</h3>
      <p className="text-[9px] md:text-[10px] text-gray-400 line-clamp-2 leading-snug">{entity.specialty}</p>
      <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-50 flex justify-between items-center">
        <span className="text-[8px] md:text-[9px] text-gray-400 italic truncate max-w-[100px]">মালিক: {entity.owner}</span>
        <button className="text-[9px] md:text-[10px] font-black text-blue-800 flex items-center gap-1 group/btn hover:translate-x-1 transition-transform">
          প্রোফাইল <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </div>
);

export default App;

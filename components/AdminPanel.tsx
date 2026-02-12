
import React, { useState } from 'react';
import { MarketEntity, MarketNews } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  shops: MarketEntity[];
  setShops: React.Dispatch<React.SetStateAction<MarketEntity[]>>;
  members: any[];
  setMembers: React.Dispatch<React.SetStateAction<any[]>>;
  employees: any[];
  setEmployees: React.Dispatch<React.SetStateAction<any[]>>;
  news: MarketNews[];
  setNews: React.Dispatch<React.SetStateAction<MarketNews[]>>;
  notices: string[];
  setNotices: React.Dispatch<React.SetStateAction<string[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onClose, shops, setShops, members, setMembers, employees, setEmployees, news, setNews, notices, setNotices 
}) => {
  const [activeTab, setActiveTab] = useState<'shops' | 'news' | 'notices' | 'members' | 'employees'>('shops');
  const [editingShop, setEditingShop] = useState<Partial<MarketEntity> | null>(null);
  const [editingNews, setEditingNews] = useState<Partial<MarketNews> | null>(null);

  const toggleShopStatus = (id: string) => {
    setShops(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Open' ? 'Closed' : 'Open' } : s));
  };

  const handleAddNews = () => {
    const newEntry: MarketNews = {
      id: Date.now().toString(),
      title: 'নতুন খবরের শিরোনাম',
      summary: 'এখানে বিস্তারিত লিখুন...',
      date: new Date().toLocaleDateString('bn-BD'),
      imageUrl: 'https://picsum.photos/seed/news/800/400',
      category: 'মার্কেট আপডেট',
      sourceName: 'অ্যাডমিন প্যানেল'
    };
    setNews([newEntry, ...news]);
    setEditingNews(newEntry);
  };

  const saveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      setNews(prev => prev.map(n => n.id === editingNews.id ? editingNews as MarketNews : n));
      setEditingNews(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gray-900/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20">
        
        {/* Admin Header */}
        <div className="bg-blue-800 p-6 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black">A</div>
            <div>
              <h2 className="text-xl font-black">অ্যাডমিন কন্ট্রোল প্যানেল</h2>
              <p className="text-xs opacity-70">সাগর সৈকত মার্কেট ডিজিটাল সিস্টেম</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Admin Tabs */}
        <div className="flex bg-gray-50 border-b border-gray-100 p-2 gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'shops', label: 'দোকান ও ডিরেক্টরি', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16' },
            { id: 'news', label: 'নিউজ/ব্লগ', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2' },
            { id: 'notices', label: 'নোটিশ বোর্ড', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
            { id: 'members', label: 'সমিতি সদস্য', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { id: 'employees', label: 'সেরা কর্মী', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-blue-800 text-white shadow-md' : 'text-gray-500 hover:bg-gray-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} /></svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          
          {/* Shops Management */}
          {activeTab === 'shops' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-gray-800">ডিরেক্টরি ও দোকান কন্ট্রোল</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-green-700">নতুন দোকান যোগ করুন</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shops.map(shop => (
                  <div key={shop.id} className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between group hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                        <img src={shop.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{shop.name}</h4>
                        <p className="text-[10px] text-gray-400">{shop.floor} | {shop.owner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end">
                        <span className={`text-[8px] font-black uppercase mb-1 ${shop.status === 'Open' ? 'text-green-600' : 'text-red-600'}`}>
                          {shop.status === 'Open' ? 'অনলাইন' : 'অফলাইন'}
                        </span>
                        <button 
                          onClick={() => toggleShopStatus(shop.id)}
                          className={`w-10 h-5 rounded-full relative transition-colors ${shop.status === 'Open' ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${shop.status === 'Open' ? 'translate-x-5.5' : 'translate-x-0.5'}`}></div>
                        </button>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-blue-600"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News Management (Blog Editor) */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-gray-800">মার্কেট নিউজ ও ব্লগ এডিটর</h3>
                <button onClick={handleAddNews} className="bg-blue-800 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm">নতুন নিউজ লিখুন</button>
              </div>

              {editingNews && (
                <div className="p-6 bg-gray-50 rounded-3xl border border-blue-100 animate-in fade-in slide-in-from-top-4">
                  <form onSubmit={saveNews} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase">শিরোনাম</label>
                        <input 
                          type="text" 
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                          value={editingNews.title}
                          onChange={e => setEditingNews({...editingNews, title: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase">ক্যাটাগরি</label>
                        <input 
                          type="text" 
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                          value={editingNews.category}
                          onChange={e => setEditingNews({...editingNews, category: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    {/* Rich Text Controls Placeholder */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase">মূল খবর</label>
                      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2">
                           <button type="button" className="p-1.5 hover:bg-gray-200 rounded font-bold">B</button>
                           <button type="button" className="p-1.5 hover:bg-gray-200 rounded italic italic">I</button>
                           <button type="button" className="p-1.5 hover:bg-gray-200 rounded underline">U</button>
                           <div className="w-px h-6 bg-gray-300 mx-1"></div>
                           <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs">H1</button>
                           <button type="button" className="p-1.5 hover:bg-gray-200 rounded text-xs">H2</button>
                        </div>
                        <textarea 
                          rows={8}
                          className="w-full p-4 text-sm outline-none resize-none"
                          value={editingNews.summary}
                          onChange={e => setEditingNews({...editingNews, summary: e.target.value})}
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button type="button" onClick={() => setEditingNews(null)} className="px-6 py-2 rounded-xl text-sm font-bold text-gray-500">বাতিল</button>
                      <button type="submit" className="px-6 py-2 rounded-xl bg-blue-800 text-white text-sm font-bold shadow-lg">সংরক্ষণ করুন</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map(n => (
                  <div key={n.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gray-100 relative">
                      <img src={n.imageUrl} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-1">
                         <button onClick={() => setEditingNews(n)} className="p-1.5 bg-white/90 rounded-lg text-blue-600 shadow-sm"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                         <button onClick={() => setNews(prev => prev.filter(item => item.id !== n.id))} className="p-1.5 bg-white/90 rounded-lg text-red-600 shadow-sm"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1">{n.title}</h4>
                      <p className="text-[10px] text-gray-400 italic mb-2">{n.date}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">{n.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Members Management */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-black text-gray-800">মার্কেট সমিতি সদস্য তালিকা</h3>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm">নতুন সদস্য যোগ করুন</button>
              </div>
              <div className="space-y-3">
                {members.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">{idx+1}</div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                        <p className="text-[10px] text-orange-600 font-black uppercase tracking-widest">{member.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-blue-800">{member.phone}</p>
                        <p className="text-[10px] text-gray-400">{member.info}</p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-blue-600"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Employee of the month */}
          {activeTab === 'employees' && (
            <div className="space-y-6">
              <h3 className="font-black text-gray-800">সেরা কর্মী (Employee of the Month) কন্ট্রোল</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {employees.map((emp, idx) => (
                  <div key={idx} className="p-5 border border-gray-100 rounded-3xl flex gap-5 group hover:border-amber-200 transition-colors">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                      <img src={emp.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase">{emp.badge}</span>
                      <h4 className="font-black text-gray-900 text-base">{emp.name}</h4>
                      <p className="text-xs text-blue-800 font-bold">{emp.shop}</p>
                      <p className="text-[10px] text-gray-500 line-clamp-2">{emp.skill}</p>
                      <div className="pt-2 flex justify-end">
                        <button className="text-[10px] font-black text-blue-600 underline">তথ্য পরিবর্তন করুন</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notices Management */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              <h3 className="font-black text-gray-800">লাইভ নোটিশ বোর্ড (Ticker)</h3>
              <div className="space-y-4">
                {notices.map((notice, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-800 rounded font-bold text-xs">{idx+1}</span>
                    <input 
                      type="text" 
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium"
                      value={notice}
                      onChange={(e) => {
                        const newNotices = [...notices];
                        newNotices[idx] = e.target.value;
                        setNotices(newNotices);
                      }}
                    />
                    <button onClick={() => setNotices(prev => prev.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                ))}
                <button 
                  onClick={() => setNotices([...notices, 'নতুন নোটিশ এখানে লিখুন...'])}
                  className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-bold hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-all"
                >
                  + নতুন নোটিশ যোগ করুন
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Admin Footer Info */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center shrink-0">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Admin System v1.0 • Sagar Saikat Digital Directory</p>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-1.5 text-xs font-black text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm">সেভ ছাড়াই বের হোন</button>
            <button onClick={onClose} className="px-4 py-1.5 text-xs font-black text-white bg-blue-800 rounded-lg shadow-lg">সব সংরক্ষণ করুন</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

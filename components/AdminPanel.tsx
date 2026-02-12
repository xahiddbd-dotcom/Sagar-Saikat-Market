
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
  const [editingNews, setEditingNews] = useState<Partial<MarketNews> | null>(null);
  const [showAddShopModal, setShowAddShopModal] = useState(false);

  const toggleShopStatus = (id: string) => {
    setShops(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Open' ? 'Closed' : 'Open' } : s));
  };

  const handleAddNews = () => {
    const newEntry: MarketNews = {
      id: Date.now().toString(),
      title: 'নতুন নিউজ শিরোনাম',
      summary: 'নিউজ বা ব্লগের বিস্তারিত কন্টেন্ট এখানে লিখুন...',
      date: new Date().toLocaleDateString('bn-BD'),
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      category: 'মার্কেট আপডেট',
      sourceName: 'অ্যাডমিন'
    };
    setNews([newEntry, ...news]);
    setEditingNews(newEntry);
  };

  const handleAddShop = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newShop: MarketEntity = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      owner: formData.get('owner') as string,
      floor: formData.get('floor') as string,
      floorNumber: 0,
      category: formData.get('category') as any,
      specialty: formData.get('specialty') as string,
      contact: formData.get('contact') as string,
      status: 'Open',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80'
    };
    setShops([...shops, newShop]);
    setShowAddShopModal(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gray-900/95 backdrop-blur-2xl flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-7xl h-full md:h-[92vh] md:rounded-[56px] shadow-2xl overflow-hidden flex flex-col border border-white/20">
        
        {/* Admin Header */}
        <div className="bg-blue-800 p-6 md:p-8 flex justify-between items-center text-white shrink-0 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center font-black text-3xl shadow-inner border border-white/10">স</div>
            <div>
              <h2 className="text-xl md:text-2xl font-black italic tracking-tight">সাগর সৈকত অ্যাডমিন পোর্টাল</h2>
              <p className="text-[10px] md:text-xs opacity-60 font-black uppercase tracking-[0.3em] mt-1">Centralized Digital Management Core v2.5</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all relative z-10 group">
            <svg className="w-8 h-8 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          {/* Enhanced Sidebar Navigation */}
          <div className="w-full md:w-80 bg-[#f9fafc] border-r border-gray-100 p-6 md:p-8 space-y-4 shrink-0 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-2">
            {[
              { id: 'shops', label: 'ডিরেক্টরি ও দোকান', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16' },
              { id: 'news', label: 'নিউজ ও ব্লগ এডিটর', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1' },
              { id: 'notices', label: 'লাইভ নোটিশ বোর্ড', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592' },
              { id: 'members', label: 'সমিতি সদস্য ম্যানেজমেন্ট', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857' },
              { id: 'employees', label: 'সেরা কর্মী কন্ট্রোল', icon: 'M5 3v4M3 5h4M6 17v4' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-5 px-6 py-5 rounded-3xl text-sm font-black transition-all w-full text-left whitespace-nowrap transform ${
                  activeTab === tab.id ? 'bg-blue-800 text-white shadow-2xl scale-[1.02] -translate-y-1' : 'text-gray-400 hover:bg-white hover:text-blue-800 hover:shadow-lg'
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} /></svg>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-14 bg-white relative">
            
            {/* Shops Management Tab */}
            {activeTab === 'shops' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50/50 p-10 rounded-[40px] border border-gray-100 gap-6">
                  <div>
                    <h3 className="text-2xl font-black text-gray-950 italic mb-1">দোকান ও ফ্লোর কন্ট্রোল</h3>
                    <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em]">Manage Online Status & Floor Mapping</p>
                  </div>
                  <button onClick={() => setShowAddShopModal(true)} className="bg-blue-800 text-white px-10 py-5 rounded-3xl text-xs font-black shadow-2xl shadow-blue-800/30 hover:bg-blue-900 transition-all flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                    নতুন শপ যুক্ত করুন
                  </button>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {shops.map(shop => (
                    <div key={shop.id} className="p-6 bg-white border border-gray-100 rounded-[32px] flex items-center justify-between group hover:border-blue-500 transition-all duration-500 hover:shadow-xl">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shrink-0 group-hover:scale-110 transition-transform">
                          <img src={shop.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-black text-gray-950 text-lg mb-1">{shop.name}</h4>
                          <div className="flex items-center gap-2">
                             <span className="text-[10px] font-black bg-blue-50 text-blue-800 px-3 py-1 rounded-full uppercase tracking-tighter italic">{shop.floor}</span>
                             <span className="text-[10px] font-bold text-gray-300">মালিক: {shop.owner}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex flex-col items-end">
                          <span className={`text-[10px] font-black uppercase mb-1.5 tracking-tighter ${shop.status === 'Open' ? 'text-green-600' : 'text-red-500'}`}>
                            {shop.status === 'Open' ? 'লাইভ: খোলা' : 'লাইভ: বন্ধ'}
                          </span>
                          <button 
                            onClick={() => toggleShopStatus(shop.id)}
                            className={`w-14 h-7 rounded-full relative transition-all duration-500 ${shop.status === 'Open' ? 'bg-green-500 shadow-lg shadow-green-500/30' : 'bg-gray-300'}`}
                          >
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-500 ${shop.status === 'Open' ? 'translate-x-8' : 'translate-x-1'}`}></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advanced News / Blog Editor Tab */}
            {activeTab === 'news' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="flex flex-col md:flex-row justify-between items-center bg-blue-50/50 p-10 rounded-[40px] border border-blue-100 gap-6">
                  <div>
                    <h3 className="text-2xl font-black text-blue-900 italic mb-1">নিউজ ও ব্লগ এডিটর</h3>
                    <p className="text-[11px] text-blue-700 font-black uppercase tracking-[0.2em]">Publish Market Updates & Daily Bulletins</p>
                  </div>
                  <button onClick={handleAddNews} className="bg-blue-800 text-white px-10 py-5 rounded-3xl text-xs font-black shadow-2xl shadow-blue-800/30 hover:bg-blue-900 transition-all">নতুন ব্লগ তৈরি করুন</button>
                </div>

                {editingNews && (
                  <div className="p-10 bg-[#f9fafc] rounded-[48px] border border-gray-100 shadow-sm animate-in zoom-in duration-500">
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-gray-400 uppercase ml-4">খবরের শিরোনাম</label>
                          <input 
                            type="text" 
                            className="w-full bg-white border border-gray-100 rounded-3xl px-8 py-5 text-lg font-black outline-none focus:ring-8 focus:ring-blue-800/5 transition-all text-gray-900 shadow-sm"
                            value={editingNews.title}
                            onChange={e => setEditingNews({...editingNews, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-gray-400 uppercase ml-4">ক্যাটাগরি</label>
                          <input 
                            type="text" 
                            className="w-full bg-white border border-gray-100 rounded-3xl px-8 py-5 text-lg font-black outline-none focus:ring-8 focus:ring-blue-800/5 transition-all text-gray-900 shadow-sm"
                            value={editingNews.category}
                            onChange={e => setEditingNews({...editingNews, category: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[11px] font-black text-gray-400 uppercase ml-4">মূল কন্টেন্ট (রিচ টেক্সট স্টাইল)</label>
                         <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm">
                            <div className="bg-gray-50/50 p-4 border-b border-gray-100 flex flex-wrap gap-4">
                               <div className="flex bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm">
                                 <button type="button" className="w-10 h-10 font-black hover:bg-gray-50 rounded-xl transition-colors">B</button>
                                 <button type="button" className="w-10 h-10 italic hover:bg-gray-50 rounded-xl transition-colors">I</button>
                                 <button type="button" className="w-10 h-10 underline hover:bg-gray-50 rounded-xl transition-colors">U</button>
                               </div>
                               <div className="flex bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm">
                                 <button type="button" className="px-5 text-[10px] font-black hover:bg-gray-50 rounded-xl uppercase">Normal</button>
                                 <button type="button" className="px-5 text-[10px] font-black hover:bg-gray-50 rounded-xl uppercase bg-blue-50 text-blue-800">Headline</button>
                               </div>
                            </div>
                            <textarea 
                              rows={12}
                              className="w-full p-10 text-lg text-gray-800 outline-none resize-none font-medium leading-relaxed"
                              value={editingNews.summary}
                              onChange={e => setEditingNews({...editingNews, summary: e.target.value})}
                            ></textarea>
                         </div>
                      </div>
                      <div className="flex justify-end gap-6 pt-4">
                        <button onClick={() => setEditingNews(null)} className="px-10 py-4 text-sm font-black text-gray-400 hover:text-gray-600">বাতিল</button>
                        <button 
                          onClick={() => {
                            setNews(prev => prev.map(n => n.id === editingNews.id ? editingNews as MarketNews : n));
                            setEditingNews(null);
                          }}
                          className="px-12 py-5 bg-blue-800 text-white rounded-[24px] text-sm font-black shadow-2xl shadow-blue-800/30 transform hover:-translate-y-1 transition-all"
                        >পাবলিশ করুন</button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {news.map(n => (
                    <div key={n.id} className="bg-white border border-gray-100 rounded-[48px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 group flex flex-col h-full">
                      <div className="h-48 bg-gray-100 relative overflow-hidden shrink-0">
                        <img src={n.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-6 right-6 flex gap-3">
                           <button onClick={() => setEditingNews(n)} className="w-11 h-11 bg-white/90 rounded-2xl text-blue-600 flex items-center justify-center shadow-xl transform hover:scale-110 transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536" /></svg></button>
                           <button onClick={() => setNews(prev => prev.filter(item => item.id !== n.id))} className="w-11 h-11 bg-white/90 rounded-2xl text-red-600 flex items-center justify-center shadow-xl transform hover:scale-110 transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142" /></svg></button>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-1">
                        <span className="text-[10px] font-black text-blue-800 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block w-fit italic">{n.category}</span>
                        <h4 className="font-black text-gray-950 text-lg line-clamp-2 mb-3 leading-tight italic">{n.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-6">{n.summary}</p>
                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between text-[10px] font-black text-gray-300 uppercase italic">
                           <span>{n.date}</span>
                           <span>Market Post</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Ticker / Notices Control Tab */}
            {activeTab === 'notices' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
                 <div className="bg-amber-50/50 border-l-[12px] border-amber-500 p-10 rounded-[48px] shadow-sm">
                    <h3 className="text-2xl font-black text-amber-900 mb-2 italic">লাইভ নোটিশ বোর্ড কন্ট্রোল</h3>
                    <p className="text-[11px] text-amber-700 font-black uppercase tracking-[0.2em]">Manage Scrolling Ticker Content (Real-time)</p>
                 </div>
                 <div className="space-y-5">
                    {notices.map((notice, idx) => (
                      <div key={idx} className="flex items-center gap-6 bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                        <span className="w-12 h-12 flex items-center justify-center bg-blue-800 text-white rounded-2xl font-black text-sm shadow-xl group-hover:scale-110 transition-transform">{idx+1}</span>
                        <input 
                          type="text" 
                          className="flex-1 bg-transparent border-none focus:ring-0 text-xl font-black text-gray-950 outline-none italic"
                          value={notice}
                          onChange={(e) => {
                            const newNotices = [...notices];
                            newNotices[idx] = e.target.value;
                            setNotices(newNotices);
                          }}
                        />
                        <button onClick={() => setNotices(prev => prev.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600 p-3 bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" /></svg></button>
                      </div>
                    ))}
                    <button onClick={() => setNotices([...notices, 'নতুন নোটিশ এখানে লিখুন...'])} className="w-full py-10 border-4 border-dashed border-gray-100 rounded-[48px] text-gray-200 text-2xl font-black hover:bg-gray-50 hover:text-blue-200 transition-all hover:border-blue-200 group">
                      <span className="group-hover:scale-105 inline-block transition-transform">+ নতুন নোটিশ যোগ করুন</span>
                    </button>
                 </div>
              </div>
            )}
            
            {/* Members Management Tab */}
            {activeTab === 'members' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-8">
                  <h3 className="text-3xl font-black text-gray-950 italic">মার্কেট সমিতি সদস্য</h3>
                  <button className="bg-orange-600 text-white px-8 py-4 rounded-2xl text-xs font-black shadow-2xl shadow-orange-600/20 hover:bg-orange-700 transition-all">+ নতুন সদস্য</button>
                </div>
                <div className="space-y-5">
                  {members.map((member, idx) => (
                    <div key={idx} className="flex items-center justify-between p-7 bg-white border border-gray-100 rounded-[32px] group hover:border-orange-500 transition-all hover:shadow-2xl">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center font-black text-orange-600 shadow-inner italic">{idx+1}</div>
                        <div>
                          <h4 className="font-black text-gray-950 text-xl tracking-tight italic">{member.name}</h4>
                          <span className="text-[10px] font-black text-orange-600 uppercase bg-orange-50 px-4 py-1.5 rounded-full tracking-[0.2em]">{member.position}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-10">
                         <div className="text-right">
                           <p className="text-base font-black text-blue-900 leading-none mb-1">{member.phone}</p>
                           <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest">{member.info}</p>
                         </div>
                         <button className="p-4 bg-gray-50 rounded-[20px] hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"><svg className="w-6 h-6 text-gray-300 group-hover:text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Professional Add Shop Modal */}
        {showAddShopModal && (
          <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-[64px] shadow-2xl overflow-hidden animate-in zoom-in duration-500 border border-white/20">
               <div className="p-10 bg-blue-800 text-white font-black text-3xl flex justify-between items-center relative overflow-hidden italic">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                  নতুন শপ প্রোফাইল
                  <button onClick={() => setShowAddShopModal(false)} className="text-white/30 hover:text-white transition-colors relative z-10 hover:rotate-90 transition-transform"><svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
               </div>
               <form onSubmit={handleAddShop} className="p-12 space-y-8 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-400 uppercase ml-2 tracking-widest">দোকানের নাম</label>
                      <input name="name" required className="w-full bg-gray-50 border-none rounded-3xl px-6 py-5 outline-none focus:ring-8 focus:ring-blue-800/5 font-black text-gray-900 shadow-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-gray-400 uppercase ml-2 tracking-widest">মালিকের নাম</label>
                      <input name="owner" required className="w-full bg-gray-50 border-none rounded-3xl px-6 py-5 outline-none focus:ring-8 focus:ring-blue-800/5 font-black text-gray-900 shadow-sm" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400 uppercase ml-2 tracking-widest">ফ্লোর নির্বাচন করুন</label>
                    <select name="floor" required className="w-full bg-gray-50 border-none rounded-3xl px-6 py-5 outline-none focus:ring-8 focus:ring-blue-800/5 font-black text-gray-900 shadow-sm appearance-none">
                       {['নিচতলা', '২য় তলা', '৩য় তলা', '৪র্থ তলা', '৫ম তলা', '৬ষ্ঠ তলা'].map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400 uppercase ml-2 tracking-widest">দোকান ক্যাটাগরি</label>
                    <select name="category" required className="w-full bg-gray-50 border-none rounded-3xl px-6 py-5 outline-none focus:ring-8 focus:ring-blue-800/5 font-black text-gray-900 shadow-sm appearance-none">
                       <option value="Shop">বানিজ্যিক দোকান</option>
                       <option value="Coaching">কোচিং সেন্টার</option>
                       <option value="Service">সেবা প্রদানকারী</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-gray-400 uppercase ml-2 tracking-widest">বিস্তারিত বিবরণ</label>
                    <input name="specialty" className="w-full bg-gray-50 border-none rounded-3xl px-6 py-5 outline-none focus:ring-8 focus:ring-blue-800/5 font-black text-gray-900 shadow-sm" />
                  </div>
                  <button type="submit" className="w-full bg-blue-800 text-white font-black py-6 rounded-[28px] shadow-2xl shadow-blue-800/30 transform hover:-translate-y-2 transition-all active:scale-95 text-lg italic tracking-tight">ডিরেক্টরিতে যুক্ত করুন</button>
               </form>
            </div>
          </div>
        )}
        
        {/* Modern Admin Footer */}
        <div className="p-8 bg-[#f9fafc] border-t border-gray-100 flex flex-col md:flex-row justify-between items-center shrink-0 gap-6">
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
             <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] italic">System Core Status: Fully Operational & Optimized</p>
          </div>
          <div className="flex gap-6">
            <button onClick={onClose} className="px-10 py-4 text-xs font-black text-gray-400 bg-white border border-gray-100 rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-widest">বাতিল</button>
            <button onClick={onClose} className="px-14 py-4 text-xs font-black text-white bg-blue-800 rounded-2xl shadow-2xl shadow-blue-800/20 hover:bg-blue-900 transition-all uppercase tracking-[0.2em] transform hover:-translate-y-1">সব পরিবর্তন সেভ করুন</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;


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
      summary: 'নিউজ কন্টেন্ট এখানে লিখুন...',
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
    <div className="fixed inset-0 z-[200] bg-gray-900/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-6">
      <div className="bg-white w-full max-w-7xl h-full md:h-[90vh] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Admin Header */}
        <div className="bg-blue-800 p-6 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-black text-2xl">A</div>
            <div>
              <h2 className="text-xl font-black">সাগর সৈকত মার্কেট অ্যাডমিন ড্যাশবোর্ড</h2>
              <p className="text-xs opacity-60 font-bold uppercase tracking-widest">System Control Unit</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-72 bg-gray-50 border-r border-gray-100 p-6 space-y-3 shrink-0 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-2">
            {[
              { id: 'shops', label: 'দোকান ও ডিরেক্টরি', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16' },
              { id: 'news', label: 'নিউজ ও ব্লগিং', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1' },
              { id: 'notices', label: 'নোটিশ বোর্ড', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592' },
              { id: 'members', label: 'সমিতি সদস্য', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857' },
              { id: 'employees', label: 'সেরা কর্মী', icon: 'M5 3v4M3 5h4M6 17v4' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all w-full text-left whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-blue-800 text-white shadow-xl' : 'text-gray-500 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} /></svg>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-white">
            
            {activeTab === 'shops' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center bg-gray-50 p-8 rounded-3xl border border-gray-100">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1">ডিরেক্টরি কন্ট্রোল</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Manage floors and shop status</p>
                  </div>
                  <button onClick={() => setShowAddShopModal(true)} className="bg-blue-800 text-white px-8 py-4 rounded-2xl text-xs font-black shadow-lg hover:bg-blue-900 transition-all">+ নতুন দোকান যোগ করুন</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {shops.map(shop => (
                    <div key={shop.id} className="p-6 bg-white border border-gray-100 rounded-3xl flex items-center justify-between group hover:border-blue-500 transition-all duration-300">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                          <img src={shop.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-black text-gray-900 text-lg">{shop.name}</h4>
                          <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase">{shop.floor}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <span className={`text-[10px] font-black uppercase ${shop.status === 'Open' ? 'text-green-600' : 'text-red-600'}`}>
                          {shop.status === 'Open' ? 'অনলাইন' : 'অফলাইন'}
                        </span>
                        <button 
                          onClick={() => toggleShopStatus(shop.id)}
                          className={`w-12 h-6 rounded-full relative transition-all duration-300 ${shop.status === 'Open' ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${shop.status === 'Open' ? 'translate-x-7' : 'translate-x-1'}`}></div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-10">
                <div className="flex justify-between items-center bg-blue-50 p-8 rounded-3xl border border-blue-100">
                  <div>
                    <h3 className="text-2xl font-black text-blue-900">মার্কেট নিউজ পোর্টাল (ব্লগ)</h3>
                    <p className="text-sm text-blue-700 font-bold uppercase tracking-widest">Create and edit market updates with rich text</p>
                  </div>
                  <button onClick={handleAddNews} className="bg-blue-800 text-white px-8 py-4 rounded-2xl text-xs font-black shadow-xl">নতুন নিউজ তৈরি করুন</button>
                </div>

                {editingNews && (
                  <div className="p-10 bg-gray-50 rounded-[40px] border border-gray-200 animate-in fade-in duration-500">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <input 
                          type="text" 
                          placeholder="নিউজ শিরোনাম"
                          className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-lg font-black outline-none focus:ring-4 focus:ring-blue-800/10 transition-all"
                          value={editingNews.title}
                          onChange={e => setEditingNews({...editingNews, title: e.target.value})}
                        />
                        <input 
                          type="text" 
                          placeholder="ক্যাটাগরি"
                          className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-lg font-black outline-none focus:ring-4 focus:ring-blue-800/10 transition-all"
                          value={editingNews.category}
                          onChange={e => setEditingNews({...editingNews, category: e.target.value})}
                        />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-[32px] overflow-hidden">
                        <div className="bg-gray-100/50 p-3 border-b border-gray-200 flex gap-4">
                           <div className="flex gap-2 bg-white rounded-xl p-1 border border-gray-200">
                             <button className="w-9 h-9 font-black hover:bg-gray-100 rounded-lg">B</button>
                             <button className="w-9 h-9 italic hover:bg-gray-100 rounded-lg">I</button>
                             <button className="w-9 h-9 underline hover:bg-gray-100 rounded-lg">U</button>
                           </div>
                           <div className="flex gap-2 bg-white rounded-xl p-1 border border-gray-200">
                             <button className="px-3 text-xs font-black hover:bg-gray-100 rounded-lg">Small</button>
                             <button className="px-3 text-xs font-black hover:bg-gray-100 rounded-lg bg-gray-100">Normal</button>
                             <button className="px-3 text-xs font-black hover:bg-gray-100 rounded-lg">Large</button>
                           </div>
                        </div>
                        <textarea 
                          rows={10}
                          placeholder="নিউজ কন্টেন্ট এখানে লিখুন..."
                          className="w-full p-8 text-lg text-gray-700 outline-none resize-none font-medium leading-relaxed"
                          value={editingNews.summary}
                          onChange={e => setEditingNews({...editingNews, summary: e.target.value})}
                        ></textarea>
                      </div>
                      <div className="flex justify-end gap-4">
                        <button onClick={() => setEditingNews(null)} className="px-8 py-3 text-sm font-black text-gray-400">বাতিল</button>
                        <button 
                          onClick={() => {
                            setNews(prev => prev.map(n => n.id === editingNews.id ? editingNews as MarketNews : n));
                            setEditingNews(null);
                          }}
                          className="px-10 py-4 bg-blue-800 text-white rounded-2xl text-sm font-black shadow-xl"
                        >নিউজ পাবলিশ করুন</button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {news.map(n => (
                    <div key={n.id} className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                      <div className="h-44 bg-gray-100 relative">
                        <img src={n.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute top-4 right-4 flex gap-2">
                           <button onClick={() => setEditingNews(n)} className="w-10 h-10 bg-white/90 rounded-xl text-blue-600 flex items-center justify-center shadow-lg transform hover:scale-110 transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536" /></svg></button>
                           <button onClick={() => setNews(prev => prev.filter(item => item.id !== n.id))} className="w-10 h-10 bg-white/90 rounded-xl text-red-600 flex items-center justify-center shadow-lg transform hover:scale-110 transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142" /></svg></button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-black text-gray-900 text-lg line-clamp-2 mb-2">{n.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{n.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other sections with similar improved layout... */}
            {activeTab === 'notices' && (
              <div className="space-y-6">
                 <div className="bg-amber-50 border-l-8 border-amber-500 p-8 rounded-3xl mb-8">
                    <h3 className="text-xl font-black text-amber-900 mb-1">লাইভ নোটিশ বোর্ড কন্ট্রোল</h3>
                    <p className="text-xs text-amber-700 font-bold uppercase tracking-widest">Ticker scrolling on top of the website</p>
                 </div>
                 <div className="space-y-4">
                    {notices.map((notice, idx) => (
                      <div key={idx} className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <span className="w-10 h-10 flex items-center justify-center bg-blue-800 text-white rounded-xl font-black text-sm">{idx+1}</span>
                        <input 
                          type="text" 
                          className="flex-1 bg-transparent border-none focus:ring-0 text-lg font-bold text-gray-800 outline-none"
                          value={notice}
                          onChange={(e) => {
                            const newNotices = [...notices];
                            newNotices[idx] = e.target.value;
                            setNotices(newNotices);
                          }}
                        />
                        <button onClick={() => setNotices(prev => prev.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600 p-2"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" /></svg></button>
                      </div>
                    ))}
                    <button onClick={() => setNotices([...notices, 'নতুন নোটিশ এখানে লিখুন...'])} className="w-full py-8 border-4 border-dashed border-gray-100 rounded-[32px] text-gray-300 text-xl font-black hover:bg-gray-50 transition-all">+ নতুন নোটিশ যোগ করুন</button>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Shop Modal */}
        {showAddShopModal && (
          <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
               <div className="p-8 bg-blue-800 text-white font-black text-2xl flex justify-between items-center">
                  নতুন শপ অ্যাড করুন
                  <button onClick={() => setShowAddShopModal(false)} className="text-white/50 hover:text-white"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
               </div>
               <form onSubmit={handleAddShop} className="p-10 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <input name="name" placeholder="দোকানের নাম" required className="bg-gray-50 border-none rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-800/10 font-bold" />
                    <input name="owner" placeholder="মালিকের নাম" required className="bg-gray-50 border-none rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-800/10 font-bold" />
                  </div>
                  <select name="floor" required className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-800/10 font-bold">
                     <option value="নিচতলা">নিচতলা</option>
                     <option value="২য় তলা">২য় তলা</option>
                     <option value="৩য় তলা">৩য় তলা</option>
                     <option value="৪র্থ তলা">৪র্থ তলা</option>
                     <option value="৫ম তলা">৫ম তলা</option>
                     <option value="৬ষ্ঠ তলা">৬ষ্ঠ তলা</option>
                  </select>
                  <input name="specialty" placeholder="বিবরণ" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-800/10 font-bold" />
                  <input name="contact" placeholder="মোবাইল" className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-800/10 font-bold" />
                  <button type="submit" className="w-full bg-blue-800 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-800/20 transform hover:-translate-y-1 transition-all">ডিরেক্টরিতে যুক্ত করুন</button>
               </form>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center shrink-0 gap-4">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] italic">Admin System v2.0 • Secured Core Environment</p>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-8 py-3 text-xs font-black text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-100 transition-all">বাতিল</button>
            <button onClick={onClose} className="px-12 py-3 text-xs font-black text-white bg-blue-800 rounded-xl shadow-xl hover:bg-blue-900 transition-all">সব পরিবর্তন সেভ করুন</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

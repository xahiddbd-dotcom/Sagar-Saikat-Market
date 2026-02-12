
import React, { useState } from 'react';
import { MarketEntity } from '../types';

interface ComplaintBoxProps {
  shops: MarketEntity[];
}

const ComplaintBox: React.FC<ComplaintBoxProps> = ({ shops }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ shopId: '', customerName: '', customerPhone: '', complaint: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({ shopId: '', customerName: '', customerPhone: '', complaint: '' });
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 flex flex-col border border-red-100 animate-in slide-in-from-bottom-5 duration-300 max-h-[600px] overflow-hidden">
          <div className="p-4 bg-red-700 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg><span className="font-bold">ডিজিটাল অভিযোগ বক্স</span></div>
            <button onClick={() => { setIsOpen(false); setIsSubmitted(false); }} className="p-1 rounded transition-colors hover:bg-black/10"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-gray-700 mb-1">দোকান নির্বাচন করুন *</label>
                  <select required className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500" value={formData.shopId} onChange={(e) => setFormData({...formData, shopId: e.target.value})}>
                    <option value="">দোকান সিলেক্ট করুন...</option>
                    {shops.map(shop => <option key={shop.id} value={shop.id}>{shop.name} ({shop.floor})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 mb-1">আপনার নাম</label>
                  <input type="text" placeholder="আপনার নাম লিখুন" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500" value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 mb-1">মোবাইল নম্বর *</label>
                  <input type="tel" required placeholder="০১৭xxxxxxxx" className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500" value={formData.customerPhone} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 mb-1">অভিযোগের বিস্তারিত *</label>
                  <textarea required rows={4} placeholder="কি সমস্যা হয়েছে বিস্তারিত লিখুন..." className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500 resize-none" value={formData.complaint} onChange={(e) => setFormData({...formData, complaint: e.target.value})} />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-red-800 transition-all active:scale-95 disabled:opacity-50">{loading ? 'প্রক্রিয়াধীন...' : 'অভিযোগ জমা দিন'}</button>
              </form>
            ) : (
              <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
                <h3 className="text-xl font-black text-gray-900 mb-4">অভিযোগ সফলভাবে গৃহীত!</h3>
                <p className="text-xs text-gray-500 italic">"আমরা দ্রুত ব্যবস্থা গ্রহণ করব এবং আপনাকে ফোন কলের মাধ্যমে আপডেট জানানো হবে।"</p>
                <button onClick={() => { setIsOpen(false); setIsSubmitted(false); }} className="mt-8 text-blue-800 font-bold text-sm underline underline-offset-4">বন্ধ করুন</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="group relative flex items-center justify-center">
          <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all animate-bounce">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default ComplaintBox;

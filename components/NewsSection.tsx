
import React from 'react';
import { MarketNews } from '../types';

interface NewsSectionProps {
  initialNews: MarketNews[];
  onNewsUpdate: React.Dispatch<React.SetStateAction<MarketNews[]>>;
}

const NewsSection: React.FC<NewsSectionProps> = ({ initialNews, onNewsUpdate }) => {
  return (
    <section className="py-20" id="news-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2 italic border-l-8 border-blue-800 pl-6">মার্কেট আপডেট ও সংবাদ (ব্লগ)</h2>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em] ml-6">Daily Market Bulletin & Blogging</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
           <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
           <span className="text-[10px] font-black text-blue-800 uppercase tracking-widest">লাইভ নিউজ ফিড</span>
        </div>
      </div>

      {initialNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {initialNews.map((news) => (
            <article key={news.id} className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-gray-100 group flex flex-col h-full">
              <div className="relative h-60 overflow-hidden shrink-0">
                <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className="absolute bottom-6 left-6 bg-blue-800 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-xl">{news.category || 'মার্কেট সংবাদ'}</span>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-[10px] text-gray-400 mb-4 flex items-center gap-2 font-bold uppercase tracking-widest">
                  <svg className="w-4 h-4 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {news.date}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight group-hover:text-blue-800 transition-colors line-clamp-2">{news.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-4 leading-relaxed font-medium mb-8">{news.summary}</p>
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <button className="text-[10px] font-black text-blue-800 uppercase tracking-widest flex items-center gap-2 group/btn">
                    পুরো খবরটি পড়ুন 
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                  <span className="text-[8px] font-black text-gray-300 uppercase italic">Admin Post</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-100">
           <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" /></svg>
           </div>
           <p className="text-gray-400 font-black uppercase tracking-widest text-sm">বর্তমানে কোনো নিউজ আপডেট নেই</p>
        </div>
      )}
    </section>
  );
};

export default NewsSection;

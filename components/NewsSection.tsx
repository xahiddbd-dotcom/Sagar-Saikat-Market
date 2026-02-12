
import React, { useState, useEffect } from 'react';
import { fetchMarketUpdates } from '../services/geminiService';
import { MarketNews } from '../types';

interface NewsSectionProps {
  initialNews: MarketNews[];
  onNewsUpdate: React.Dispatch<React.SetStateAction<MarketNews[]>>;
}

const NewsSection: React.FC<NewsSectionProps> = ({ initialNews, onNewsUpdate }) => {
  const [loading, setLoading] = useState(initialNews.length === 0);

  const loadNews = async () => {
    setLoading(true);
    const latestNews = await fetchMarketUpdates();
    if (latestNews.length > 0) {
      onNewsUpdate(latestNews);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (initialNews.length === 0) {
      loadNews();
    }
  }, []);

  return (
    <section className="py-12" id="news-section">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-800 pl-4">মার্কেট আপডেট ও সংবাদ (ব্লগ)</h2>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> লাইভ আপডেট
          </span>
        </div>
        <button onClick={loadNews} disabled={loading} className="flex items-center gap-2 text-blue-800 hover:text-blue-900 font-semibold text-sm bg-blue-50 px-4 py-2 rounded-lg transition-colors disabled:opacity-50">
          {loading ? 'লোড হচ্ছে...' : 'রিফ্রেশ করুন'}
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-gray-100">
              <div className="bg-gray-200 h-40 w-full rounded-t-xl"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : initialNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialNews.map((news) => (
            <article key={news.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 group">
              <div className="relative h-48 overflow-hidden">
                <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-4 left-4 bg-blue-800 text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">{news.category || 'মার্কেট সংবাদ'}</span>
              </div>
              <div className="p-6">
                <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {news.date}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-800 transition-colors line-clamp-2 min-h-[3.5rem]">{news.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 min-h-[4.5rem]">{news.summary}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-800 hover:text-blue-900 flex items-center gap-1 group/link">বিস্তারিত পড়ুন <svg className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">কোনো আপডেট পাওয়া যায়নি।</p>
        </div>
      )}
    </section>
  );
};

export default NewsSection;

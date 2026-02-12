
import React from 'react';

interface NavbarProps {
  onAdminClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-800 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg transform rotate-3">
              স
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm md:text-xl font-bold text-gray-900 leading-tight">সাগর সৈকত মার্কেট</h1>
              <p className="text-[8px] md:text-xs text-blue-700 font-semibold uppercase tracking-wider">Sagar Saikat Market</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden lg:flex space-x-6 mr-6">
              <a href="#" className="text-blue-800 border-b-2 border-blue-800 text-xs font-bold uppercase tracking-widest px-1">হোম</a>
              <a href="#" className="text-gray-500 hover:text-blue-800 text-xs font-bold uppercase tracking-widest px-1 transition-colors">ডিরেক্টরি</a>
              <button onClick={onAdminClick} className="text-gray-500 hover:text-blue-800 text-xs font-bold uppercase tracking-widest px-1 transition-colors">অ্যাডমিন</button>
            </div>
            <button className="bg-blue-800 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-[10px] md:text-sm font-bold hover:bg-blue-900 transition-all shadow-sm active:scale-95">
              লগইন
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

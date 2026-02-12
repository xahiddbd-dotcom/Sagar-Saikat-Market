
import React from 'react';

interface LiveTickerProps {
  notices: string[];
}

const LiveTicker: React.FC<LiveTickerProps> = ({ notices }) => {
  return (
    <div className="bg-blue-900 text-white py-2 overflow-hidden flex whitespace-nowrap border-b border-blue-800">
      <div className="px-4 bg-orange-600 font-bold flex items-center relative z-10 shrink-0">
        নোটিশ:
      </div>
      <div className="flex animate-marquee items-center gap-10 pl-4">
        {notices.length > 0 ? notices.map((notice, idx) => (
          <React.Fragment key={idx}>
            <span>{notice}</span>
            <span className="text-blue-400">•</span>
          </React.Fragment>
        )) : (
          <span>বর্তমানে কোনো নোটিশ নেই।</span>
        )}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LiveTicker;

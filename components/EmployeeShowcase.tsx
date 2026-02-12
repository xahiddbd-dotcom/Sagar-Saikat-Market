
import React from 'react';

interface EmployeeShowcaseProps {
  employees: any[];
}

const EmployeeShowcase: React.FC<EmployeeShowcaseProps> = ({ employees }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-1 bg-blue-800 rounded-full"></span>
        <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">সেরা কর্মী (Employee of the Month)</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employees.map((emp, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex overflow-hidden group h-[120px] md:h-[140px]"
          >
            <div className="w-1/3 h-full relative overflow-hidden shrink-0">
              <img src={emp.image} alt={emp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
            </div>
            <div className="flex-1 p-4 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-1">
                <span className="bg-amber-100 text-amber-700 text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded-full uppercase">{emp.badge}</span>
              </div>
              <h4 className="font-black text-gray-900 text-sm md:text-base mb-0.5">{emp.name}</h4>
              <p className="text-blue-800 font-bold text-[10px] md:text-xs mb-2">{emp.shop}</p>
              <div className="flex items-center gap-2 mt-auto">
                <div className="w-5 h-5 bg-blue-50 rounded flex items-center justify-center text-blue-600 shrink-0">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <p className="text-[9px] md:text-[11px] text-gray-500 font-medium leading-tight">{emp.skill}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeShowcase;

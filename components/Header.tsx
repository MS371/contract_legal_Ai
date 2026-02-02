
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="md:hidden flex items-center gap-2">
        <i className="fas fa-shield-halved text-indigo-600 text-xl"></i>
        <span className="font-bold text-lg">LegalGuard</span>
      </div>
      
      <div className="hidden md:flex relative w-96">
        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input 
          type="text" 
          placeholder="Search for templates or past audits..." 
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <i className="fas fa-bell"></i>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">SME Owner</p>
            <p className="text-xs text-slate-500">Free Tier</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            SO
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

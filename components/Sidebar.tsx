
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'fa-chart-pie' },
    { path: '/analyze', label: 'New Analysis', icon: 'fa-magnifying-glass-chart' },
    { path: '/templates', label: 'Legal Templates', icon: 'fa-file-lines' },
    { path: '/audit', label: 'Audit History', icon: 'fa-clock-rotate-left' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full hidden md:flex">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-shield-halved text-xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">LegalGuard AI</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 mt-auto border-t border-slate-800">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Usage</p>
          <div className="flex justify-between text-sm mb-1">
            <span>Free Credits</span>
            <span>8 / 10</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

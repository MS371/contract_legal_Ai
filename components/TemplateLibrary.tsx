
import React, { useState } from 'react';
import { CONTRACT_TEMPLATES } from '../constants';

const TemplateLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(CONTRACT_TEMPLATES.map(t => t.category))];

  const filteredTemplates = selectedCategory === 'All' 
    ? CONTRACT_TEMPLATES 
    : CONTRACT_TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Contract Template Library</h1>
        <p className="text-slate-500">Standardized, SME-friendly documents ready for use.</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
              <i className="fas fa-file-signature text-slate-400 group-hover:text-indigo-600 transition-colors"></i>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{template.title}</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">{template.description}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                {template.category}
              </span>
              <button className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-1">
                Use Template
                <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="relative z-10 flex-1">
          <h3 className="text-2xl font-bold mb-2">Need a custom contract?</h3>
          <p className="text-indigo-200">Our AI can draft a custom agreement based on your specific requirements and local Indian state laws.</p>
          <button className="mt-6 bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg">
            Start Drafting
          </button>
        </div>
        <div className="relative z-10 hidden md:block">
          <i className="fas fa-pen-nib text-9xl opacity-20 transform -rotate-12"></i>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default TemplateLibrary;

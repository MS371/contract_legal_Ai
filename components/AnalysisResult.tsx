
import React, { useState } from 'react';
import { ContractAnalysis, RiskLevel } from '../types';

interface AnalysisResultProps {
  data: ContractAnalysis | null;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  const [filter, setFilter] = useState<RiskLevel | 'All'>('All');

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 py-20">
        <i className="fas fa-file-circle-question text-6xl mb-4 opacity-20"></i>
        <h3 className="text-xl font-bold">No active analysis found.</h3>
        <p>Please upload a contract on the Analyze page.</p>
      </div>
    );
  }

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.HIGH: return 'text-rose-600 bg-rose-50 border-rose-200';
      case RiskLevel.MEDIUM: return 'text-amber-600 bg-amber-50 border-amber-200';
      case RiskLevel.LOW: return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    }
  };

  const getRiskBorder = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.HIGH: return 'border-l-4 border-l-rose-500';
      case RiskLevel.MEDIUM: return 'border-l-4 border-l-amber-500';
      case RiskLevel.LOW: return 'border-l-4 border-l-emerald-500';
    }
  };

  const filteredClauses = filter === 'All' 
    ? data.clauses 
    : data.clauses.filter(c => c.riskLevel === filter);

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 md:flex items-center justify-between gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                {data.contractType}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 text-sm font-medium">Jurisdiction: {data.jurisdiction}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">Contract Risk Scorecard</h1>
            <p className="text-slate-600 leading-relaxed max-w-2xl">{data.summary}</p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Parties</p>
                <p className="text-sm font-bold text-slate-700">{data.parties.join(' & ')}</p>
              </div>
              {data.financialAmount && (
                <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Financial Value</p>
                  <p className="text-sm font-bold text-slate-700">{data.financialAmount}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 md:mt-0 flex flex-col items-center">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                <circle 
                  cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * data.compositeRiskScore) / 100}
                  className={`${data.compositeRiskScore > 70 ? 'text-rose-500' : data.compositeRiskScore > 40 ? 'text-amber-500' : 'text-emerald-500'} transition-all duration-1000 ease-out`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900">{data.compositeRiskScore}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Risk Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Clause Analysis</h3>
            <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
              {['All', RiskLevel.HIGH, RiskLevel.MEDIUM, RiskLevel.LOW].map((l) => (
                <button 
                  key={l}
                  onClick={() => setFilter(l as any)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    filter === l ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredClauses.map((clause) => (
              <div key={clause.id} className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${getRiskBorder(clause.riskLevel)}`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                      {clause.category}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${getRiskColor(clause.riskLevel)}`}>
                      {clause.riskLevel} Risk
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Original Text</h4>
                      <p className="text-sm text-slate-600 font-mono line-clamp-4 italic">"{clause.originalText}"</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Plain Language Explanation</h4>
                      <p className="text-sm text-slate-900 font-medium leading-relaxed">{clause.explanation}</p>
                    </div>
                  </div>
                  {clause.isUnfavorable && (
                    <div className="mt-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                      <div className="flex gap-3">
                        <i className="fas fa-lightbulb text-indigo-500 mt-1"></i>
                        <div>
                          <p className="text-xs font-bold text-indigo-900 uppercase mb-1">Suggested Alternative</p>
                          <p className="text-sm text-indigo-800">{clause.suggestion}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-rose-50 rounded-3xl p-6 border border-rose-100">
            <h3 className="text-rose-900 font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-triangle-exclamation"></i>
              Renegotiation Checklist
            </h3>
            <ul className="space-y-3">
              {data.suggestedRenegotiationPoints.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm text-rose-800 font-medium">
                  <span className="w-5 h-5 flex-shrink-0 bg-rose-200 text-rose-700 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {i+1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-clipboard-check text-emerald-500"></i>
              Missing Terms (Indian Norms)
            </h3>
            <div className="space-y-3">
              {data.missingCrucialTerms.map((term, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 font-medium">
                  <i className="fas fa-plus-circle text-slate-300"></i>
                  {term}
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => window.print()}
            className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg"
          >
            <i className="fas fa-file-pdf"></i>
            Export PDF Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;

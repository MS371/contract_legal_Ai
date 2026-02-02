
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeContract, translateContractToEnglish } from '../geminiService';
import { ContractAnalysis } from '../types';

interface ContractAnalyzerProps {
  onAnalysisComplete: (data: ContractAnalysis, name: string) => void;
}

const ContractAnalyzer: React.FC<ContractAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [text, setText] = useState('');
  const [contractName, setContractName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHindi, setIsHindi] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setContractName(file.name.replace(/\.[^/.]+$/, ""));
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  const startAnalysis = async () => {
    if (!text || !contractName) {
      setError("Please provide both a contract name and some text content.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      let analysisText = text;
      if (isHindi) {
        analysisText = await translateContractToEnglish(text);
      }
      
      const result = await analyzeContract(analysisText);
      onAnalysisComplete(result, contractName);
      navigate('/analysis-result');
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Analyze Your Contract</h2>
            <p className="text-indigo-100">Upload your document or paste the text below for a comprehensive risk assessment.</p>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-20 text-8xl transform rotate-12">
            <i className="fas fa-file-invoice"></i>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 block">Contract Title</label>
              <input 
                type="text"
                placeholder="e.g. Vendor Agreement - Acme Corp"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 block">Source Language</label>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button 
                  onClick={() => setIsHindi(false)}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all ${!isHindi ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setIsHindi(true)}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all ${isHindi ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
                >
                  Hindi
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">Contract Content</label>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5"
              >
                <i className="fas fa-upload"></i>
                Upload TXT/DOC
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept=".txt,.doc,.docx"
              />
            </div>
            <textarea 
              rows={12}
              placeholder="Paste the contract text here for immediate AI processing..."
              className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-mono text-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-700">
              <i className="fas fa-circle-exclamation mt-0.5"></i>
              <div>
                <p className="font-bold text-sm">Analysis Error</p>
                <p className="text-xs">{error}</p>
              </div>
            </div>
          )}

          <button 
            disabled={isAnalyzing || !text || !contractName}
            onClick={startAnalysis}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              isAnalyzing || !text || !contractName 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200'
            }`}
          >
            {isAnalyzing ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Processing with Gemini AI...
              </>
            ) : (
              <>
                <i className="fas fa-bolt-lightning"></i>
                Analyze Risks Now
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        {[
          { icon: 'fa-lock', title: 'Confidential', desc: 'Secure local analysis' },
          { icon: 'fa-scale-balanced', title: 'Indian Laws', desc: 'Compliant with Indian legal framework' },
          { icon: 'fa-language', title: 'Multilingual', desc: 'Hindi & English support' },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mb-3">
              <i className={`fas ${item.icon} text-slate-600`}></i>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractAnalyzer;

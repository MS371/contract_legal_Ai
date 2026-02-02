
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ContractAnalyzer from './components/ContractAnalyzer';
import TemplateLibrary from './components/TemplateLibrary';
import AuditTrail from './components/AuditTrail';
import AnalysisResult from './components/AnalysisResult';
import { ContractAnalysis, AuditLog } from './types';

const AppContent: React.FC = () => {
  const [activeAnalysis, setActiveAnalysis] = useState<ContractAnalysis | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const location = useLocation();

  const addAuditLog = (contractName: string, action: string) => {
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleString(),
      contractName,
      action
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard auditLogs={auditLogs} />} />
            <Route path="/analyze" element={
              <ContractAnalyzer 
                onAnalysisComplete={(data, name) => {
                  setActiveAnalysis(data);
                  addAuditLog(name, 'Analysis Completed');
                }} 
              />
            } />
            <Route path="/analysis-result" element={
              <AnalysisResult data={activeAnalysis} />
            } />
            <Route path="/templates" element={<TemplateLibrary />} />
            <Route path="/audit" element={<AuditTrail logs={auditLogs} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

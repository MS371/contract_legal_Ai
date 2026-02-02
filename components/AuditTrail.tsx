
import React from 'react';
import { AuditLog } from '../types';

interface AuditTrailProps {
  logs: AuditLog[];
}

const AuditTrail: React.FC<AuditTrailProps> = ({ logs }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Audit History & Trail</h1>
        <p className="text-slate-500">A permanent log of all contract interactions for compliance and legal review.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <i className="fas fa-shield-check"></i>
            </div>
            <h3 className="font-bold text-slate-900">System Logs</h3>
          </div>
          <button className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2">
            <i className="fas fa-download"></i>
            Export Full Log
          </button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {logs.length > 0 ? (
            logs.map((log) => (
              <div key={log.id} className="p-6 hover:bg-slate-50/50 transition-colors flex items-center gap-6">
                <div className="hidden sm:block text-slate-400 text-sm font-medium w-40">
                  {log.timestamp}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 mb-0.5">{log.contractName}</p>
                  <p className="text-xs text-slate-500">{log.action}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Details">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete Log">
                    <i className="fas fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-slate-400">
              <i className="fas fa-history text-5xl mb-4 opacity-10"></i>
              <p>No activity has been recorded yet.</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-slate-900 rounded-3xl text-white flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center flex-shrink-0 text-2xl shadow-xl">
          <i className="fas fa-fingerprint"></i>
        </div>
        <div>
          <h4 className="font-bold text-lg">Blockchain Integrity Verification</h4>
          <p className="text-slate-400 text-sm">Every audit log entry is uniquely hashed and stored locally to prevent tampering. This creates a secure chain of evidence for your legal team.</p>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;

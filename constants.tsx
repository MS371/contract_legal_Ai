
import React from 'react';
import { ContractTemplate } from './types';

export const CONTRACT_TEMPLATES: ContractTemplate[] = [
  {
    id: 't1',
    title: 'Standard Employment Agreement (India)',
    category: 'Employment',
    description: 'Basic employment contract for Indian SMEs including probation, notice periods, and IP clauses.',
    content: `This Employment Agreement is made on [Date] between [Company Name] and [Employee Name]...`
  },
  {
    id: 't2',
    title: 'Vendor Service Contract',
    category: 'Services',
    description: 'Agreement for procurement of services, focusing on deliverables, payments, and termination.',
    content: `This Service Agreement is entered into by [Client] and [Service Provider]...`
  },
  {
    id: 't3',
    title: 'Commercial Lease Agreement',
    category: 'Lease',
    description: 'Lease document for office spaces, covering security deposit and maintenance terms.',
    content: `This Lease Agreement is made between [Lessor] and [Lessee] for the premises located at...`
  }
];

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <i className="fas fa-chart-line"></i> },
  { id: 'analyze', label: 'Analyze Contract', icon: <i className="fas fa-file-contract"></i> },
  { id: 'templates', label: 'Templates', icon: <i className="fas fa-book"></i> },
  { id: 'audit', label: 'Audit Trail', icon: <i className="fas fa-history"></i> },
];

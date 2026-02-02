
export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Clause {
  id: string;
  originalText: string;
  explanation: string;
  riskLevel: RiskLevel;
  category: string;
  suggestion?: string;
  isUnfavorable: boolean;
}

export interface ContractAnalysis {
  contractType: string;
  parties: string[];
  jurisdiction: string;
  financialAmount?: string;
  effectiveDate?: string;
  terminationDate?: string;
  compositeRiskScore: number; // 0-100
  summary: string;
  clauses: Clause[];
  missingCrucialTerms: string[];
  suggestedRenegotiationPoints: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  contractName: string;
  action: string;
}

export interface ContractTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

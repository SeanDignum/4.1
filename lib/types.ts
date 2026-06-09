export type ViewMode = "hr" | "executive";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type DateRange = "today" | "7d" | "30d" | "custom";

export interface Team {
  id: string;
  name: string;
  department: string;
  headCount: number;
  healthIndex: number;
  riskScore: number;
  riskLevel: RiskLevel;
  riskType: string;
  trend: number;
  productivityImpact: number;
  financialImpact: number;
  absenteeismRate: number;
  stressLevel: number;
  activityLevel: number;
  aiAdoption: number;
}

export interface RiskAlert {
  id: string;
  title: string;
  description: string;
  severity: RiskLevel;
  teamId: string;
  teamName: string;
  productivityImpact: number;
  costImpact: number;
  trend: "rising" | "stable" | "declining";
}

export interface Recommendation {
  id: string;
  title: string;
  problem: string;
  impact: {
    productivity: number;
    cost: number;
  };
  action: string;
  status: "pending" | "applied" | "dismissed";
  teamId?: string;
  teamName?: string;
  priority: "high" | "medium" | "low";
}

export interface HealthMetrics {
  overall: number;
  chronic: number;
  stress: number;
  activity: number;
  trend: number;
}

export interface AbsenteeismMetrics {
  totalDaysLost: number;
  shortTerm: number;
  longTerm: number;
  trend: number;
  topReasons: { reason: string; count: number }[];
}

export interface ProductivityMetrics {
  productivityLoss: number;
  highImpactTeams: { name: string; loss: number }[];
}

export interface AIAdoptionMetrics {
  activeUsers: number;
  totalUsers: number;
  adoptionRate: number;
  dauWau: number;
  trend: number;
  topTopics: { topic: string; count: number }[];
}

export interface FinancialMetrics {
  totalCostImpact: number;
  productivityLossCost: number;
  absenteeismCost: number;
  roi: number;
  preventedLosses: number;
  productivityImprovement: number;
  claimsReduction?: number;
  highCostAvoidance?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "risk" | "system" | "info";
  read: boolean;
  timestamp: Date;
}

export interface User {
  name: string;
  email: string;
  role: "hr" | "executive" | "cfo" | "admin";
  company: string;
  avatar?: string;
}

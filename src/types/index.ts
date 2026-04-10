// Domain types for AutoWork – AI-powered business process automation platform

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused";
  lastRun: string;
  successRate: number;
  category: string;
  integrations: string[];
}

export interface Integration {
  name: string;
  description: string;
  category: string;
  status: "connected" | "available";
  icon: string;
  actions: string[];
  popularity: number;
}

export interface SecurityPermission {
  agent: string;
  user: string;
  role: string;
  permissions: string[];
  status: "active" | "pending";
  lastAccess: string;
}

export interface SecurityActivity {
  action: string;
  user: string;
  agent: string;
  timestamp: string;
  risk: "low" | "medium" | "high";
}

export interface SecuritySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  critical: boolean;
}

export interface WorkflowBlock {
  type: "trigger" | "condition" | "action";
  title: string;
  description: string;
  color: string;
}

export interface AgentTemplate {
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  integrations: string[];
}

export interface StatCard {
  title: string;
  value: string;
  change: string;
  iconName: string;
  color: string;
}

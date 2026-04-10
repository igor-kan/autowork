import { useState, useCallback } from "react";
import type { Agent } from "@/types";

const DEFAULT_AGENTS: Agent[] = [
  {
    id: "agent-1",
    name: "Lead Processor",
    description:
      "Automatically processes new sales leads from Salesforce and notifies team in Slack",
    status: "active",
    lastRun: "2 minutes ago",
    successRate: 98,
    category: "Sales",
    integrations: ["Salesforce", "Slack", "HubSpot"],
  },
  {
    id: "agent-2",
    name: "NDA Analyzer",
    description:
      "Reviews incoming NDAs and highlights risky clauses for legal team",
    status: "active",
    lastRun: "1 hour ago",
    successRate: 95,
    category: "Legal",
    integrations: ["Gmail", "Notion", "DocuSign"],
  },
  {
    id: "agent-3",
    name: "Expense Monitor",
    description:
      "Monitors transactions over $1000 and sends alerts to finance team",
    status: "paused",
    lastRun: "3 hours ago",
    successRate: 100,
    category: "Finance",
    integrations: ["QuickBooks", "Slack"],
  },
  {
    id: "agent-4",
    name: "Customer Feedback Router",
    description:
      "Categorizes customer complaints and creates Jira tickets automatically",
    status: "active",
    lastRun: "30 minutes ago",
    successRate: 92,
    category: "Product",
    integrations: ["Jira", "Zendesk", "Slack"],
  },
];

export interface UseAgentsResult {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, "id" | "lastRun" | "successRate">) => Agent;
  toggleAgent: (id: string) => void;
  deleteAgent: (id: string) => void;
}

export function useAgents(): UseAgentsResult {
  const [agents, setAgents] = useState<Agent[]>(DEFAULT_AGENTS);

  const addAgent = useCallback(
    (data: Omit<Agent, "id" | "lastRun" | "successRate">): Agent => {
      const newAgent: Agent = {
        ...data,
        id: `agent-${Date.now()}`,
        lastRun: "Never",
        successRate: 0,
      };
      setAgents((prev) => [newAgent, ...prev]);
      return newAgent;
    },
    []
  );

  const toggleAgent = useCallback((id: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "active" ? "paused" : "active" }
          : a
      )
    );
  }, []);

  const deleteAgent = useCallback((id: string) => {
    setAgents((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return { agents, addAgent, toggleAgent, deleteAgent };
}

import { useState, useCallback } from "react";
import type { Integration } from "@/types";

const DEFAULT_INTEGRATIONS: Integration[] = [
  {
    name: "Slack",
    description:
      "Send messages, create channels, and manage team communication",
    category: "Communication",
    status: "connected",
    icon: "💬",
    actions: ["Send Message", "Create Channel", "Get User Info"],
    popularity: 95,
  },
  {
    name: "Salesforce",
    description: "Manage leads, opportunities, and customer relationships",
    category: "CRM",
    status: "connected",
    icon: "☁️",
    actions: ["Create Lead", "Update Opportunity", "Get Contact"],
    popularity: 88,
  },
  {
    name: "Gmail",
    description: "Send emails, read messages, and manage your inbox",
    category: "Email",
    status: "connected",
    icon: "✉️",
    actions: ["Send Email", "Read Messages", "Create Filter"],
    popularity: 92,
  },
  {
    name: "Notion",
    description: "Create pages, update databases, and manage content",
    category: "Documentation",
    status: "available",
    icon: "📝",
    actions: ["Create Page", "Update Database", "Search Content"],
    popularity: 85,
  },
  {
    name: "Jira",
    description: "Create tickets, update issues, and track project progress",
    category: "Project Management",
    status: "available",
    icon: "🎯",
    actions: ["Create Issue", "Update Status", "Add Comment"],
    popularity: 78,
  },
  {
    name: "HubSpot",
    description: "Manage contacts, deals, and marketing campaigns",
    category: "CRM",
    status: "available",
    icon: "🚀",
    actions: ["Create Contact", "Update Deal", "Send Email"],
    popularity: 82,
  },
  {
    name: "Google Drive",
    description: "Upload files, create folders, and share documents",
    category: "File Storage",
    status: "connected",
    icon: "📁",
    actions: ["Upload File", "Create Folder", "Share Document"],
    popularity: 90,
  },
  {
    name: "Airtable",
    description: "Create records, update tables, and manage databases",
    category: "Database",
    status: "available",
    icon: "📊",
    actions: ["Create Record", "Update Table", "Get Data"],
    popularity: 75,
  },
];

export interface UseIntegrationsResult {
  integrations: Integration[];
  toggleConnection: (name: string) => void;
  connectedCount: number;
}

export function useIntegrations(): UseIntegrationsResult {
  const [integrations, setIntegrations] =
    useState<Integration[]>(DEFAULT_INTEGRATIONS);

  const toggleConnection = useCallback((name: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.name === name
          ? {
              ...i,
              status: i.status === "connected" ? "available" : "connected",
            }
          : i
      )
    );
  }, []);

  const connectedCount = integrations.filter(
    (i) => i.status === "connected"
  ).length;

  return { integrations, toggleConnection, connectedCount };
}

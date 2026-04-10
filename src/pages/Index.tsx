import { useState } from "react";
import { Bot, Shield, BarChart3, Settings, Search, Bell, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentDashboard } from "@/components/AgentDashboard";
import { AgentBuilder } from "@/components/AgentBuilder";
import { IntegrationHub } from "@/components/IntegrationHub";
import { SecurityPanel } from "@/components/SecurityPanel";
import { useAgents } from "@/hooks/useAgents";
import { useIntegrations } from "@/hooks/useIntegrations";

type Tab = "dashboard" | "builder" | "integrations" | "security";

const NAV_TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", Icon: BarChart3 },
  { id: "builder", label: "Agent Builder", Icon: Bot },
  { id: "integrations", label: "Integrations", Icon: Zap },
  { id: "security", label: "Security", Icon: Shield },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const agentHook = useAgents();
  const integrationsHook = useIntegrations();

  // When an agent is created in builder, jump to dashboard to see it
  const handleAgentCreated = () => setActiveTab("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">
                  Loopless
                </span>
              </div>

              <nav aria-label="Main navigation">
                <ul className="flex space-x-2" role="tablist">
                  {NAV_TABS.map(({ id, label }) => (
                    <li key={id} role="presentation">
                      <button
                        role="tab"
                        aria-selected={activeTab === id}
                        aria-current={activeTab === id ? "page" : undefined}
                        onClick={() => setActiveTab(id)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === id
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setActiveTab("dashboard")}
                  className="pl-10 w-64 bg-slate-50 border-slate-200"
                  aria-label="Search agents"
                />
              </div>
              <Button variant="outline" size="sm" aria-label="Notifications">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" aria-label="Settings">
                <Settings className="w-4 h-4" />
              </Button>
              <div
                className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full"
                aria-label="User avatar"
                role="img"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "dashboard" && (
          <AgentDashboard
            agentHook={agentHook}
            searchQuery={searchQuery}
            onCreateAgent={() => setActiveTab("builder")}
          />
        )}
        {activeTab === "builder" && (
          <AgentBuilder
            agentHook={agentHook}
            onAgentCreated={handleAgentCreated}
          />
        )}
        {activeTab === "integrations" && (
          <IntegrationHub integrationsHook={integrationsHook} />
        )}
        {activeTab === "security" && <SecurityPanel />}
      </main>
    </div>
  );
};

export default Index;

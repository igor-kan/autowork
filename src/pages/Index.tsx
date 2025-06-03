
import { useState } from "react";
import { Plus, Bot, Zap, Shield, BarChart3, Settings, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentDashboard } from "@/components/AgentDashboard";
import { AgentBuilder } from "@/components/AgentBuilder";
import { IntegrationHub } from "@/components/IntegrationHub";
import { SecurityPanel } from "@/components/SecurityPanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
                <span className="text-xl font-bold text-slate-900">Loopless</span>
              </div>
              
              <nav className="flex space-x-6">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "dashboard"
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("builder")}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "builder"
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Agent Builder
                </button>
                <button
                  onClick={() => setActiveTab("integrations")}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "integrations"
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Integrations
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "security"
                      ? "bg-blue-100 text-blue-700"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Security
                </button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search agents..."
                  className="pl-10 w-64 bg-slate-50 border-slate-200"
                />
              </div>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "dashboard" && <AgentDashboard />}
        {activeTab === "builder" && <AgentBuilder />}
        {activeTab === "integrations" && <IntegrationHub />}
        {activeTab === "security" && <SecurityPanel />}
      </main>
    </div>
  );
};

export default Index;


import { useState } from "react";
import { Plus, Play, Pause, MoreHorizontal, TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AgentDashboard = () => {
  const [agents] = useState([
    {
      id: 1,
      name: "Lead Processor",
      description: "Automatically processes new sales leads from Salesforce and notifies team in Slack",
      status: "active",
      lastRun: "2 minutes ago",
      successRate: 98,
      category: "Sales",
      integrations: ["Salesforce", "Slack", "HubSpot"]
    },
    {
      id: 2,
      name: "NDA Analyzer",
      description: "Reviews incoming NDAs and highlights risky clauses for legal team",
      status: "active",
      lastRun: "1 hour ago",
      successRate: 95,
      category: "Legal",
      integrations: ["Gmail", "Notion", "DocuSign"]
    },
    {
      id: 3,
      name: "Expense Monitor",
      description: "Monitors transactions over $1000 and sends alerts to finance team",
      status: "paused",
      lastRun: "3 hours ago",
      successRate: 100,
      category: "Finance",
      integrations: ["QuickBooks", "Slack"]
    },
    {
      id: 4,
      name: "Customer Feedback Router",
      description: "Categorizes customer complaints and creates Jira tickets automatically",
      status: "active",
      lastRun: "30 minutes ago",
      successRate: 92,
      category: "Product",
      integrations: ["Jira", "Zendesk", "Slack"]
    }
  ]);

  const stats = [
    {
      title: "Active Agents",
      value: "12",
      change: "+2 this week",
      icon: TrendingUp,
      color: "text-emerald-600"
    },
    {
      title: "Total Runs Today",
      value: "247",
      change: "+18% from yesterday",
      icon: Play,
      color: "text-blue-600"
    },
    {
      title: "Success Rate",
      value: "96.2%",
      change: "+1.2% this month",
      icon: CheckCircle,
      color: "text-emerald-600"
    },
    {
      title: "Avg Response Time",
      value: "1.8s",
      change: "-0.3s improvement",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">
          Build your work AI.{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            In minutes, not months.
          </span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Create AI-powered workflows that automate your repetitive tasks and connect to all your internal tools.
        </p>
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Plus className="w-5 h-5 mr-2" />
          Create Your First Agent
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Your Agents</h2>
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            New Agent
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="border-slate-200 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <Badge 
                        variant={agent.status === "active" ? "default" : "secondary"}
                        className={agent.status === "active" ? "bg-emerald-100 text-emerald-700" : ""}
                      >
                        {agent.status}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {agent.category}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">{agent.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {agent.integrations.map((integration) => (
                    <Badge key={integration} variant="outline" className="text-xs">
                      {integration}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Last run: {agent.lastRun}</span>
                  <span className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{agent.successRate}% success</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4 mr-1" />
                    Run Now
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  {agent.status === "active" ? (
                    <Button size="sm" variant="outline">
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-1" />
                      Resume
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

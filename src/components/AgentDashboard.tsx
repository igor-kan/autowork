import { useState } from "react";
import {
  Plus,
  Play,
  Pause,
  MoreHorizontal,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { UseAgentsResult } from "@/hooks/useAgents";

interface AgentDashboardProps {
  agentHook: UseAgentsResult;
  searchQuery?: string;
  onCreateAgent?: () => void;
}

export const AgentDashboard = ({
  agentHook,
  searchQuery = "",
  onCreateAgent,
}: AgentDashboardProps) => {
  const { agents, toggleAgent, deleteAgent } = agentHook;

  const filteredAgents = agents.filter((agent) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      agent.name.toLowerCase().includes(q) ||
      agent.category.toLowerCase().includes(q) ||
      agent.description.toLowerCase().includes(q)
    );
  });

  const activeCount = agents.filter((a) => a.status === "active").length;

  const stats = [
    {
      id: "active-agents",
      title: "Active Agents",
      value: String(activeCount),
      change: `${activeCount} of ${agents.length} total`,
      Icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      id: "total-runs",
      title: "Total Runs Today",
      value: "247",
      change: "+18% from yesterday",
      Icon: Play,
      color: "text-blue-600",
    },
    {
      id: "success-rate",
      title: "Success Rate",
      value: "96.2%",
      change: "+1.2% this month",
      Icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      id: "avg-response",
      title: "Avg Response Time",
      value: "1.8s",
      change: "-0.3s improvement",
      Icon: Clock,
      color: "text-orange-600",
    },
  ];

  const handleToggle = (agent: { id: string; name: string; status: string }) => {
    toggleAgent(agent.id);
    const nextStatus = agent.status === "active" ? "paused" : "active";
    toast.success(
      `Agent "${agent.name}" ${nextStatus === "active" ? "resumed" : "paused"}.`
    );
  };

  const handleDelete = (id: string, name: string) => {
    deleteAgent(id);
    toast.success(`Agent "${name}" deleted.`);
  };

  const handleRunNow = (name: string) => {
    toast.info(`Running agent "${name}"…`);
  };

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
          Create AI-powered workflows that automate your repetitive tasks and
          connect to all your internal tools.
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          onClick={onCreateAgent}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Your First Agent
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.id} className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500">{stat.change}</p>
                </div>
                <stat.Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Your Agents
            {searchQuery && (
              <span className="ml-2 text-base font-normal text-slate-500">
                – {filteredAgents.length} result
                {filteredAgents.length !== 1 ? "s" : ""} for "{searchQuery}"
              </span>
            )}
          </h2>
          <Button variant="outline" onClick={onCreateAgent}>
            <Plus className="w-4 h-4 mr-2" />
            New Agent
          </Button>
        </div>

        {filteredAgents.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            <p className="text-lg font-medium">No agents found</p>
            {searchQuery ? (
              <p className="text-sm">Try a different search term.</p>
            ) : (
              <p className="text-sm">Create your first agent to get started.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAgents.map((agent) => (
              <Card
                key={agent.id}
                className="border-slate-200 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <Badge
                          variant={
                            agent.status === "active" ? "default" : "secondary"
                          }
                          className={
                            agent.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : ""
                          }
                        >
                          {agent.status}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {agent.category}
                      </Badge>
                    </div>
                    {/* Delete via AlertDialog */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label={`Delete ${agent.name}`}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Agent</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{agent.name}"? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleDelete(agent.id, agent.name)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {agent.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {agent.integrations.map((integration) => (
                      <Badge
                        key={integration}
                        variant="outline"
                        className="text-xs"
                      >
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
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRunNow(agent.name)}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Run Now
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    {agent.status === "active" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggle(agent)}
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggle(agent)}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

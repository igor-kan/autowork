
import { useState } from "react";
import { Plus, Zap, ArrowRight, Settings, MessageSquare, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const AgentBuilder = () => {
  const [buildMode, setBuildMode] = useState<"natural" | "visual">("natural");
  const [agentPrompt, setAgentPrompt] = useState("");

  const workflowBlocks = [
    {
      type: "trigger",
      title: "New Email",
      description: "When a new email arrives in Gmail",
      color: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
      type: "condition",
      title: "Contains Keywords",
      description: "If email contains 'urgent' or 'asap'",
      color: "bg-orange-100 text-orange-700 border-orange-200"
    },
    {
      type: "action",
      title: "Send Slack Message",
      description: "Notify #urgent-alerts channel",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200"
    }
  ];

  const templates = [
    {
      title: "Sales Lead Processor",
      description: "Process new leads from CRM and notify sales team",
      category: "Sales",
      estimatedTime: "2 min"
    },
    {
      title: "Document Summarizer",
      description: "Summarize long documents and extract key points",
      category: "Productivity",
      estimatedTime: "1 min"
    },
    {
      title: "Meeting Scheduler",
      description: "Automatically schedule meetings based on availability",
      category: "Calendar",
      estimatedTime: "3 min"
    },
    {
      title: "Expense Tracker",
      description: "Track and categorize expenses from receipts",
      category: "Finance",
      estimatedTime: "2 min"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Agent Builder</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Create intelligent agents using natural language or visual workflows
        </p>
      </div>

      {/* Build Mode Toggle */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setBuildMode("natural")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              buildMode === "natural"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-4 h-4 mr-2 inline" />
            Natural Language
          </button>
          <button
            onClick={() => setBuildMode("visual")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              buildMode === "visual"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Settings className="w-4 h-4 mr-2 inline" />
            Visual Builder
          </button>
        </div>
      </div>

      {buildMode === "natural" ? (
        /* Natural Language Builder */
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <span>Describe Your Agent</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Agent Name
                </label>
                <Input placeholder="e.g., Lead Notification Bot" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What should this agent do?
                </label>
                <Textarea
                  placeholder="When a new lead appears in Salesforce, summarize their company's website and notify me in Slack with the summary..."
                  value={agentPrompt}
                  onChange={(e) => setAgentPrompt(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-slate-500">
                  Our AI will convert your description into a workflow
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Agent
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Templates */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">Or start with a template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template, index) => (
                <Card key={index} className="border-slate-200 hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-slate-900">{template.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          Setup time: {template.estimatedTime}
                        </span>
                        <Button size="sm" variant="outline">
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Visual Workflow Builder */
        <div className="max-w-6xl mx-auto space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle>Drag & Drop Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Workflow Canvas */}
              <div className="bg-slate-50 rounded-lg p-8 min-h-[400px]">
                <div className="flex items-center justify-center space-x-4">
                  {workflowBlocks.map((block, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Card className={`border-2 ${block.color} w-64 hover:shadow-md transition-all cursor-move`}>
                        <CardContent className="p-4">
                          <div className="text-center space-y-2">
                            <h4 className="font-medium">{block.title}</h4>
                            <p className="text-xs opacity-80">{block.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                      {index < workflowBlocks.length - 1 && (
                        <ArrowRight className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Block Palette */}
              <div className="mt-6 space-y-4">
                <h4 className="font-medium text-slate-900">Available Blocks</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: "Email Trigger", type: "trigger" },
                    { name: "Calendar Event", type: "trigger" },
                    { name: "File Upload", type: "trigger" },
                    { name: "Webhook", type: "trigger" },
                    { name: "Text Contains", type: "condition" },
                    { name: "Time Range", type: "condition" },
                    { name: "Send Email", type: "action" },
                    { name: "Create Task", type: "action" }
                  ].map((block) => (
                    <div
                      key={block.name}
                      className="p-3 bg-white border border-slate-200 rounded-lg text-center hover:shadow-sm transition-all cursor-grab text-sm"
                    >
                      {block.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Agent
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

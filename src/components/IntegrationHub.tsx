
import { useState } from "react";
import { Check, Plus, Settings, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const IntegrationHub = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const integrations = [
    {
      name: "Slack",
      description: "Send messages, create channels, and manage team communication",
      category: "Communication",
      status: "connected",
      icon: "💬",
      actions: ["Send Message", "Create Channel", "Get User Info"],
      popularity: 95
    },
    {
      name: "Salesforce",
      description: "Manage leads, opportunities, and customer relationships",
      category: "CRM",
      status: "connected",
      icon: "☁️",
      actions: ["Create Lead", "Update Opportunity", "Get Contact"],
      popularity: 88
    },
    {
      name: "Gmail",
      description: "Send emails, read messages, and manage your inbox",
      category: "Email",
      status: "connected",
      icon: "✉️",
      actions: ["Send Email", "Read Messages", "Create Filter"],
      popularity: 92
    },
    {
      name: "Notion",
      description: "Create pages, update databases, and manage content",
      category: "Documentation",
      status: "available",
      icon: "📝",
      actions: ["Create Page", "Update Database", "Search Content"],
      popularity: 85
    },
    {
      name: "Jira",
      description: "Create tickets, update issues, and track project progress",
      category: "Project Management",
      status: "available",
      icon: "🎯",
      actions: ["Create Issue", "Update Status", "Add Comment"],
      popularity: 78
    },
    {
      name: "HubSpot",
      description: "Manage contacts, deals, and marketing campaigns",
      category: "CRM",
      status: "available",
      icon: "🚀",
      actions: ["Create Contact", "Update Deal", "Send Email"],
      popularity: 82
    },
    {
      name: "Google Drive",
      description: "Upload files, create folders, and share documents",
      category: "File Storage",
      status: "connected",
      icon: "📁",
      actions: ["Upload File", "Create Folder", "Share Document"],
      popularity: 90
    },
    {
      name: "Airtable",
      description: "Create records, update tables, and manage databases",
      category: "Database",
      status: "available",
      icon: "📊",
      actions: ["Create Record", "Update Table", "Get Data"],
      popularity: 75
    }
  ];

  const categories = ["All", "Communication", "CRM", "Email", "Documentation", "Project Management", "File Storage", "Database"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Integration Hub</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Connect your agents to the tools you use every day
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search integrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-blue-600" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-emerald-600">{integrations.filter(i => i.status === "connected").length}</div>
            <div className="text-sm text-slate-600">Connected</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{integrations.length}</div>
            <div className="text-sm text-slate-600">Total Available</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-slate-600">Monitoring</div>
          </CardContent>
        </Card>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration, index) => (
          <Card key={index} className="border-slate-200 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                {integration.status === "connected" ? (
                  <Check className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-slate-600 text-sm leading-relaxed">{integration.description}</p>
              
              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-700">Available Actions:</div>
                <div className="flex flex-wrap gap-1">
                  {integration.actions.slice(0, 3).map((action, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                  {integration.actions.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{integration.actions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>{integration.popularity}% adoption</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>Secure</span>
                </span>
              </div>

              <div className="pt-2">
                {integration.status === "connected" ? (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                    <Button size="sm" variant="outline">
                      Test
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Plus className="w-4 h-4 mr-1" />
                    Connect
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

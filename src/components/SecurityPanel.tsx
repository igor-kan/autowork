
import { useState } from "react";
import { Shield, Users, Key, AlertTriangle, CheckCircle, Lock, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export const SecurityPanel = () => {
  const [auditLogsEnabled, setAuditLogsEnabled] = useState(true);
  const [piiRedactionEnabled, setPiiRedactionEnabled] = useState(true);

  const permissions = [
    {
      agent: "Lead Processor",
      user: "Sarah Chen",
      role: "Sales Manager",
      permissions: ["Read Salesforce", "Write Slack", "Read HubSpot"],
      status: "active",
      lastAccess: "2 hours ago"
    },
    {
      agent: "NDA Analyzer",
      user: "Mike Johnson",
      role: "Legal Counsel",
      permissions: ["Read Gmail", "Write Notion", "Read DocuSign"],
      status: "active",
      lastAccess: "1 day ago"
    },
    {
      agent: "Expense Monitor",
      user: "Finance Team",
      role: "Team",
      permissions: ["Read QuickBooks", "Write Slack"],
      status: "pending",
      lastAccess: "Never"
    }
  ];

  const securitySettings = [
    {
      title: "Data Encryption",
      description: "All data is encrypted at rest and in transit",
      status: "enabled",
      critical: true
    },
    {
      title: "PII Redaction",
      description: "Automatically redact sensitive information before sending to LLMs",
      status: "enabled",
      critical: true
    },
    {
      title: "Audit Logging",
      description: "Log all agent actions and data access",
      status: "enabled",
      critical: false
    },
    {
      title: "Token Limits",
      description: "Enforce maximum token usage per agent",
      status: "enabled",
      critical: false
    }
  ];

  const recentActivity = [
    {
      action: "Agent Created",
      user: "Sarah Chen",
      agent: "Lead Processor",
      timestamp: "2 hours ago",
      risk: "low"
    },
    {
      action: "Permission Modified",
      user: "Admin",
      agent: "NDA Analyzer",
      timestamp: "1 day ago",
      risk: "medium"
    },
    {
      action: "Data Access",
      user: "Mike Johnson",
      agent: "Document Scanner",
      timestamp: "2 days ago",
      risk: "low"
    },
    {
      action: "Failed Authentication",
      user: "Unknown",
      agent: "N/A",
      timestamp: "3 days ago",
      risk: "high"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Security & Permissions</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Manage access controls, audit logs, and security settings for your agents
        </p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <Shield className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-600">100%</div>
            <div className="text-sm text-slate-600">Security Score</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-slate-600">Active Users</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <Key className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">8</div>
            <div className="text-sm text-slate-600">API Keys</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center">
            <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">247</div>
            <div className="text-sm text-slate-600">Audit Entries</div>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Security Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {securitySettings.map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-4">
                {setting.status === "enabled" ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-slate-900">{setting.title}</h4>
                    {setting.critical && (
                      <Badge variant="destructive" className="text-xs">
                        Critical
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{setting.description}</p>
                </div>
              </div>
              <Switch 
                checked={setting.status === "enabled"} 
                disabled={setting.critical}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Permissions Management */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>Agent Permissions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {permissions.map((permission, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-slate-900">{permission.agent}</h4>
                    <Badge 
                      variant={permission.status === "active" ? "default" : "secondary"}
                      className={permission.status === "active" ? "bg-emerald-100 text-emerald-700" : ""}
                    >
                      {permission.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-600">
                    <span className="font-medium">{permission.user}</span> • {permission.role}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {permission.permissions.map((perm, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-slate-500">
                    Last access: {permission.lastAccess}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Recent Security Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-l-4 border-slate-200 pl-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.risk === "high" ? "bg-red-500" :
                    activity.risk === "medium" ? "bg-orange-500" :
                    "bg-emerald-500"
                  }`}></div>
                  <div>
                    <div className="font-medium text-slate-900">{activity.action}</div>
                    <div className="text-sm text-slate-600">
                      {activity.user} • {activity.agent !== "N/A" ? activity.agent : "System"}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-500">{activity.timestamp}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

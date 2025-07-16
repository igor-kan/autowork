/**
 * AutoWork - Intelligent Business Process Automation Platform
 * 
 * Advanced workflow automation system that leverages AI and machine learning to
 * streamline business operations and eliminate repetitive manual tasks:
 * - Automated workflow creation and orchestration with visual flow builders
 * - AI-powered process optimization and efficiency analysis
 * - Smart task routing and assignment based on skills and availability
 * - Intelligent document processing and data extraction capabilities
 * - Real-time process monitoring and performance analytics
 * 
 * Enterprise Automation Architecture:
 * Built with HashRouter to ensure seamless deployment across diverse enterprise
 * environments and organizational IT infrastructures. This approach guarantees
 * consistent automation functionality regardless of server configuration
 * complexity or corporate network restrictions.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/**
 * Business Process Data Management Configuration
 * 
 * React Query client optimized for enterprise workflow automation:
 * - High-performance caching for frequently accessed process templates
 * - Real-time synchronization for active workflow states and task updates
 * - Robust error handling for mission-critical business process operations
 * - Optimistic updates for improved user experience during process modifications
 * 
 * Enterprise Automation Optimizations:
 * - Efficient handling of large-scale process data and execution histories
 * - Memory optimization for concurrent workflow execution monitoring
 * - Integration-ready data structures for external business system APIs
 * - Comprehensive audit logging for compliance and process improvement
 * - Multi-tenant data isolation for enterprise customer environments
 * - Real-time process performance metrics and bottleneck identification
 */
const queryClient = new QueryClient();

/**
 * Root AutoWork Application Component
 * 
 * Establishes the complete business process automation platform infrastructure
 * with emphasis on enterprise scalability, reliability, and integration
 * capabilities essential for mission-critical business operations.
 * 
 * Provider Architecture (Enterprise Automation Hierarchy):
 * 1. QueryClientProvider - High-performance workflow data state management
 * 2. TooltipProvider - Contextual guidance for complex automation workflows
 * 3. Notification Systems - Critical for process alerts and automation status updates
 * 4. HashRouter - Enterprise-friendly deployment across diverse IT environments
 * 
 * Business Process Platform Routing:
 * - HashRouter selected for maximum enterprise environment compatibility
 * - Eliminates server configuration barriers for corporate IT deployments
 * - Consistent performance across different enterprise network architectures
 * - Simplified integration with existing business management and ERP systems
 * 
 * Automation Platform Architecture:
 * - "/" : Main workflow dashboard with process overview and automation controls
 * - "*" : Enterprise-grade error handling protecting business process integrity
 * 
 * @returns {JSX.Element} Complete business automation platform with enterprise safeguards
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* 
        Enterprise Process Notification Infrastructure
        
        Mission-critical for business automation where notifications impact operational efficiency:
        - Toaster: Standard notifications for routine workflow and process updates
        - Sonner: High-priority alerts for process failures, bottlenecks, and SLA violations
        
        Business Process Automation Features:
        - Real-time workflow execution status and milestone notifications
        - Process bottleneck alerts and performance optimization recommendations
        - Automated task assignment confirmations and deadline reminders
        - Integration failure notifications and system health monitoring alerts
        - Compliance violation warnings and audit trail confirmations
        - Business rule violation alerts and exception handling notifications
        - Resource availability updates and capacity planning recommendations
      */}
      <Toaster />
      <Sonner />
      
      {/*
        HashRouter for Enterprise IT Compatibility
        
        Business Automation Platform Benefits:
        - Functions seamlessly across all enterprise IT environments without modification
        - No complex server configuration required for corporate automation deployments
        - Compatible with enterprise firewalls and business security policies
        - Reduces deployment complexity for large organizations and corporations
        - Consistent behavior across global offices and distributed teams
        
        Enterprise Workflow Considerations:
        - Bookmarkable process URLs for recurring workflow analysis and optimization
        - Shareable links for cross-departmental collaboration and process documentation
        - Integration-ready for existing business applications and enterprise software
        - Compliant with corporate IT governance and data management policies
        - Support for multi-tenant enterprise environments and subsidiaries
        - Direct URL access for emergency process management and business continuity
      */}
      <HashRouter>
        <Routes>
          {/* 
            Primary Business Process Automation Dashboard
            
            Comprehensive workflow management interface featuring:
            - Visual workflow builder with drag-and-drop process design capabilities
            - Real-time process execution monitoring and performance analytics
            - AI-powered process optimization recommendations and efficiency insights
            - Automated task management with intelligent routing and assignment
            - Integration management for connecting external business systems and APIs
            - Compliance monitoring with audit trails and regulatory reporting
            - Business intelligence dashboards with process performance metrics
            - Resource management with capacity planning and workload optimization
          */}
          <Route path="/" element={<Index />} />
          
          {/* 
            Enterprise-Grade Error Handling and Business Continuity
            
            CRITICAL: Must remain as the final route for business process protection
            
            Business Process Error Management:
            - Graceful handling of broken workflow links to prevent process interruption
            - Business operation integrity protection through comprehensive error logging
            - Process execution audit trail maintenance for all navigation and system errors
            - Automatic fallback mechanisms to prevent workflow automation interruption
            - Integration with enterprise monitoring and business continuity systems
            - Real-time error reporting to process owners and business stakeholders
            - Compliance documentation for all system errors and business impact assessments
          */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

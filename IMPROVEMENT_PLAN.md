# AutoWork – Improvement Plan

## Context
AutoWork is an AI-powered business process automation platform ("Loopless") built with React + Vite + shadcn/ui. It has four feature panels: AgentDashboard, AgentBuilder, IntegrationHub, and SecurityPanel. Currently all state is local/static (no persistence, no real interactivity). The codebase compiles but is essentially a high-fidelity mockup.

---

## Prioritised Improvements

### 1. [DONE] Add TypeScript types / interfaces for domain objects
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**Files**: `src/types/index.ts` (new), all components  
**Problem**: `agents`, `integrations`, `permissions` are all typed as plain `any[]` via `useState`. Array index keys used throughout.  
**Fix**: Create a `src/types/index.ts` exporting `Agent`, `Integration`, `Permission`, `SecurityActivity`, `WorkflowBlock`, `Template` interfaces. Use them across components.

### 2. [DONE] Extract agent state to a shared context / custom hook
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**Files**: `src/hooks/useAgents.ts` (new), `AgentDashboard.tsx`, `AgentBuilder.tsx`  
**Problem**: Agent list is hardcoded inside `AgentDashboard` component; it can never be modified by other panels (e.g., a newly created agent in AgentBuilder doesn't appear in Dashboard).  
**Fix**: Create `useAgents` hook backed by `useState` (or `useContext`) that holds the canonical list with CRUD operations (`addAgent`, `toggleAgent`, `deleteAgent`). Both `AgentDashboard` and `AgentBuilder` import this hook.

### 3. [DONE] Implement real agent toggle (pause/resume) and delete actions
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**Files**: `src/components/AgentDashboard.tsx`  
**Problem**: "Pause", "Resume", and "Run Now" buttons are no-ops — no state changes occur.  
**Fix**: Wire Pause/Resume to `toggleAgent` from `useAgents`. Add a delete confirmation via `AlertDialog`. Show visual status change immediately (optimistic update).

### 4. [DONE] Agent Builder: wire "Generate Agent" / "Use Template" to create real agents
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**Files**: `src/components/AgentBuilder.tsx`  
**Problem**: Form submission does nothing; "Use Template" and "Generate Agent" buttons have no handlers.  
**Fix**: On submit/template use, call `addAgent` from `useAgents` with constructed data. Show a success toast and switch the active tab back to "dashboard".

### 5. [DONE] IntegrationHub: connect/disconnect toggles with persisted state
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**Files**: `src/components/IntegrationHub.tsx`  
**Problem**: Integrations status is hardcoded; "Connect" buttons do nothing. Stats counter for "Connected" count reads from static array.  
**Fix**: Move integrations list into `useIntegrations` hook with `toggleConnection`. "Connect" calls the hook and flips `status`; stats card re-derives count from live state.

### 6. Security panel: make audit log & PII redaction toggles actually update securitySettings state
> **Recommended Model:** Haiku 4.5 | **Effort:** Medium

**Files**: `src/components/SecurityPanel.tsx` (lines 10–11, 148–175)  
**Problem**: `auditLogsEnabled` / `piiRedactionEnabled` state is declared but never wired to the `securitySettings` array or the `Switch` components. Non-critical settings also have immutable `Switch` controls.  
**Fix**: Derive `securitySettings` array from the two state vars; pass `onCheckedChange` to non-critical Switches.

### 7. Add keyboard-accessible navigation (aria roles, aria-current)
> **Recommended Model:** Haiku 4.5 | **Effort:** Low

**Files**: `src/pages/Index.tsx` (lines 28–69)  
**Problem**: Navigation uses plain `<button>` elements without ARIA roles. No `aria-current="page"` on active tab.  
**Fix**: Wrap nav in `<nav aria-label="Main">`. Add `aria-current={activeTab === … ? "page" : undefined}` to each button. Consider `role="tablist"` / `role="tab"` pattern.

### 8. Replace array-index keys with stable IDs
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**Files**: `AgentDashboard.tsx` (stats grid), `IntegrationHub.tsx`, `SecurityPanel.tsx`, `AgentBuilder.tsx`  
**Problem**: `key={index}` on map() calls causes React reconciliation issues if list order changes.  
**Fix**: Use `integration.name`, `agent.id`, or a generated `crypto.randomUUID()` for stable keys.

### 9. Add search filtering to AgentDashboard
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**Files**: `src/components/AgentDashboard.tsx`  
**Problem**: The global search in the header (`Index.tsx`) has no handler; dashboard lists all agents with no filter.  
**Fix**: Accept a `searchQuery` prop (or read from a context) and filter `agents` list by name/category/description.

### 10. Add a `useLocalStorage` hook to persist agent and integration state across reloads
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**Files**: `src/hooks/useLocalStorage.ts` (new), `useAgents.ts`, `useIntegrations.ts`  
**Problem**: Every page reload resets all state to hardcoded defaults.  
**Fix**: Create a generic `useLocalStorage<T>(key, initial)` hook that syncs state to `localStorage`. Use it inside `useAgents` and `useIntegrations`.

### 11. Extract nav tab definitions into a constant (DRY)
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**Files**: `src/pages/Index.tsx` (lines 28–69)  
**Problem**: Each nav tab duplicates the same className logic 4 times.  
**Fix**: Define `NAV_TABS = [{id, label}]` constant and map over it.

### 12. Add loading skeleton to AgentDashboard stats cards
> **Recommended Model:** Sonnet 4.6 | **Effort:** Medium

**Files**: `src/components/AgentDashboard.tsx`  
**Problem**: No loading state; page jumps from empty to full content.  
**Fix**: Accept an `isLoading` prop and render `<Skeleton>` placeholders in place of stat card values.

---

## Implementation Notes
- Items 1–5 are implemented in this session (see code changes).
- The project uses React 18, `@tanstack/react-query`, shadcn/ui, Tailwind CSS, and React Router (HashRouter).
- No backend — all state is client-side.

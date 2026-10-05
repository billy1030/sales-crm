# Technical Considerations, Production Roadmap & Future Improvements

## 1. Current State vs Production Gap Analysis

| Aspect | Current Implementation | Production Target |
| :--- | :--- | :--- |
| **Database** | Docker PostgreSQL on `localhost:5433` | Managed Cloud PostgreSQL (Supabase / AWS RDS / Neon) |
| **Authentication** | Hardcoded mock user context (`Jensen Ackles`) | NextAuth / Auth.js / Supabase Auth with OAuth & 2FA |
| **Mutations** | Server Actions + LocalStorage hybrid | Fully transactional Server Actions with optimistic UI rollbacks |
| **Multi-Tenancy** | Single workspace | Org-level workspace isolation (`org_id` on all tables) |
| **Audit Logs** | Client activity timeline | Immutable database CDC (Change Data Capture) or audit ledger |

---

## 2. Technical Considerations & Recommendations

### A. Next.js 16 Server Actions Architecture
- **Current status**: [`lib/actions.ts`](file:///c:/ai/sales-crm/lib/actions.ts) provides `getCRMInitialData`, `createDealAction`, `updateDealStageAction`, and `createContactAction`.
- **Recommendation**:
  - Implement form validations using **Zod** schemas inside all Server Actions before running Prisma queries.
  - Return typed result envelopes:
    ```typescript
    type ActionResult<T> =
      | { success: true; data: T }
      | { success: false; error: string };
    ```

### B. Concurrent Writes & Realtime Updates
- **Problem**: When multiple sales reps update the same Deal stage or priority simultaneously, local Zustand state will diverge.
- **Solution Paths**:
  1. **Option A (Polling / SWR)**: Periodic revalidation of `getCRMInitialData` every 30-60 seconds.
  2. **Option B (Server-Sent Events / WebSockets)**: Integrate Supabase Realtime or custom SSE stream to dispatch updates to connected clients.

### C. Role-Based Access Control (RBAC)
- **Proposed Roles**:
  - `admin` (Head of Sales / RevOps): Full access to team quotas, forecasts, billing, and invites.
  - `ae` (Account Executive): Access to all accounts, write access limited to owned deals and contacts.
  - `sdr` (Sales Development Rep): Write access restricted to outbound contacts and early-stage leads.
  - `viewer` (Executive stakeholder): Read-only view on reports and forecast metrics.

### D. Data Import / Export Pipelines
- **Batch CSV Ingestion**:
  - Provide a stream-based CSV parser (`papaparse` or `@fast-csv/parse`) inside an API route to handle 10,000+ row customer imports without blocking the event loop.
- **Data Export**:
  - Direct PostgreSQL JSON-to-CSV streaming for compliance and reporting exports.

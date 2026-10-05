# Sales CRM Technical Architecture & System Design

## 1. System Overview
This project is an enterprise-grade Sales CRM built on modern web technologies. It combines high-performance client interactions with persistent relational database storage.

- **Frontend**: Next.js 16 (App Router + Turbopack) + React 19 + Tailwind CSS 4
- **State Management**: Zustand (with selective LocalStorage persistence middleware)
- **Backend / API**: Next.js 16 Server Actions
- **Database**: PostgreSQL 16 (Dockerized container)
- **ORM / Schema Management**: Prisma 6 (Client & CLI Engine)
- **Visual DB Tooling**: Prisma Studio

---

## 2. Infrastructure & Containerization

### Docker PostgreSQL Setup
To prevent conflicts with existing local PostgreSQL installations on port `5432`, this project isolates its database instance on port `5433`:

- **Host Port**: `5433`
- **Container Port**: `5432`
- **Container Name**: `sales-crm-postgres`
- **Volume**: `sales_crm_postgres_data` (Named volume for data persistence across restarts)
- **Configuration**: Defined in [`docker-compose.yml`](file:///c:/ai/sales-crm/docker-compose.yml)

```yaml
services:
  sales-crm-db:
    image: postgres:16-alpine
    container_name: sales-crm-postgres
    restart: unless-stopped
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
      POSTGRES_DB: sales_crm
    volumes:
      - sales_crm_postgres_data:/var/lib/postgresql/data
```

---

## 3. Database Schema Design (Prisma ORM)

The relational schema is configured in [`prisma/schema.prisma`](file:///c:/ai/sales-crm/prisma/schema.prisma) across six core business domains:

1. **`Company`**:
   - Accounts repository with metadata, ARR pipeline value, win probability, activity frequency, and trend metrics.
2. **`Deal`**:
   - Commercial opportunities associated with companies. Tracks pipeline stage (`Lead`, `Qualified`, `Demo / Meeting`, `Proposal`, `Negotiation`, `Won`, `Lost`), value, and probability.
3. **`Contact`**:
   - Decision-makers and executives across enterprise accounts, including contact channels and lifecycle status (`Active`, `Customer`, `Lead`, `Churned`).
4. **`Activity`**:
   - Interaction ledger supporting polymorphic activity types: calls, meetings, emails, notes, and won deals.
5. **`EmailSequence`**:
   - Automated multi-step sales cadences with engagement KPIs (open rates, reply rates, enrolled contacts).
6. **`TeamMember`**:
   - Representative profiles categorized by sales pod (`Strategic AEs`, `Mid Market`, `SDR Team`), tracking individual quota targets, bookings, deal volume, and win rates.

---

## 4. Data Flow & State Hydration

```
┌─────────────────────────┐
│ Docker PostgreSQL :5433 │
└────────────┬────────────┘
             │ Prisma ORM
             ▼
┌─────────────────────────┐
│ Next.js Server Actions  │ (lib/actions.ts: getCRMInitialData)
└────────────┬────────────┘
             │ Server-to-Client Initial Hydration
             ▼
┌─────────────────────────┐
│  Zustand Store + Cache  │ (stores/companies-store.ts: persist)
└────────────┬────────────┘
             │ Reactive Subscriptions
             ▼
┌─────────────────────────┐
│ CRM View Components     │ (Deals, Companies, Contacts, Activities, Forecast)
└─────────────────────────┘
```

1. **Hydration Strategy**:
   - When the client mounts (`app/page.tsx`), `getCRMInitialData()` queries PostgreSQL via Prisma.
   - If PostgreSQL is online, Zustand is hydrated with relational data, and the live connection badge (`PostgreSQL 5433 Connected`) is displayed.
   - If offline, Zustand gracefully falls back to the client's `localStorage` snapshot.
2. **Mutation Strategy**:
   - Client updates can operate with optimistic local state updates while dispatching Server Actions (`createDealAction`, `updateDealStageAction`, `createContactAction`, etc.) for persistence.

---

## 5. UI/UX & Design System Architecture

- **Tailwind CSS v4 Configuration**:
  - Leverages `@theme inline` and custom CSS properties for full design token decoupling.
  - Implements static Cubic-Bezier easing curves (`--ease-power1-out` through `--ease-power4-out`) for fluid micro-interactions.
- **Accessibility & Keyboard Navigation**:
  - Full keyboard shortcuts (`Cmd + K` Command Palette).
  - ARIA-compliant resizable sidebar (`components/_common/sidebar/sidebar-resizer.tsx`) utilizing `useSyncExternalStore` and direct CSS variable DOM manipulation for maximum layout performance.

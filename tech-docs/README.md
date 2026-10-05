# Technical Documentation Index

Welcome to the **Sales CRM** Technical Documentation repository. This directory documents the system architecture, database design, local operation runbooks, and future production roadmap.

---

## 📚 Document Index

1. [**01. Architecture & System Overview**](./01-architecture.md)
   - High-level system topology
   - Next.js 16 + React 19 + Tailwind CSS 4 stack
   - Docker PostgreSQL (Port 5433) isolation
   - Zustand hydration and caching flow

2. [**02. Database Model & Schema Specifications**](./02-database-and-schema.md)
   - Prisma schema definitions & Entity-Relationship diagram
   - 6 core domains: Companies, Deals, Contacts, Activities, Sequences, Team
   - PostgreSQL array types & seeding workflow

3. [**03. Operations & Development Runbook**](./03-runbook-and-operations.md)
   - Environment variables setup
   - Docker container commands
   - Prisma Studio visual GUI usage instructions
   - Verification and build troubleshooting

4. [**04. Technical Considerations & Roadmap**](./04-considerations-and-roadmap.md)
   - Production gap analysis
   - Server Actions validation patterns
   - Concurrency & real-time synchronization strategy
   - Role-Based Access Control (RBAC) plan

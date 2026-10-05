# Local Operations, Runbook & Development Guide

## 1. Prerequisites
- **Node.js**: v20+ or v24+
- **Docker Desktop**: Running locally
- **Package Manager**: npm

---

## 2. Environment Configuration

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5433/sales_crm?schema=public"
```

A template file is available at [`.env.example`](file:///c:/ai/sales-crm/.env.example).

---

## 3. Starting the System

### Step 1: Start Docker PostgreSQL
```bash
docker compose up -d
```
Verify the container status:
```bash
docker ps --filter "name=sales-crm-postgres"
```
The database will be accessible on `localhost:5433`.

### Step 2: Push Prisma Schema (if not yet migrated)
```bash
npx prisma db push
```

### Step 3: Seed Database with Initial Data
```bash
npx tsx prisma/seed.ts
```

### Step 4: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 4. Visual Database Management (Prisma Studio)

To inspect and edit PostgreSQL tables via the web interface:

```bash
# Make sure you are in the project root directory
cd c:\ai\sales-crm
npx prisma studio --port 5556
```
Open [http://localhost:5556](http://localhost:5556).

> **Note**: Avoid running `npx prisma studio` from `C:\Users\<user>` as it will attempt to download the alpha/v8 release globally without finding local project schemas. Always execute inside the workspace directory.

---

## 5. Verification & Testing Commands

| Command | Purpose |
| :--- | :--- |
| `npm run build` | Turbopack production build and strict TypeScript validation |
| `docker compose ps` | Check database container health and port bindings |
| `npx prisma studio --port 5556` | Open relational database GUI |
| `npx tsx prisma/seed.ts` | Re-seed database with clean demo datasets |
| `git status` / `git push` | Remote repository synchronization |

# User Guide: End-to-End Sales Workflow Test Case

This guide provides a comprehensive walkthrough of the end-to-end (E2E) sales business cycle implemented in this Sales CRM, based on the automated verification suite [`scripts/test-e2e-workflow.ts`](file:///c:/ai/sales-crm/scripts/test-e2e-workflow.ts).

It covers both **how to run the automated test** and **how to manually reproduce every step in the web UI**.

---

## 🎯 Test Scenario Overview

- **Account / Prospect**: `Tesla Inc` (Strategic / Enterprise account)
- **Opportunity**: `Tesla Full Fleet Telemetry Integration`
- **Deal Value**: `$500,000`
- **Key Decision Maker**: `Elon Musk` (Technoking & CEO)
- **Core Activity**: Executive Contract Review & Signoff Meeting
- **Expected Outcome**: Stage moves from `Lead` ➔ `Qualified` ➔ `Negotiation` ➔ `Won`, dynamically updating team quotas, forecast projections, and activity timelines.

---

## ⚙️ Method 1: Running the Automated Test

You can execute the entire test workflow headlessly via terminal. It tests database transactions, relational entity creation, and forecast metrics directly against the Docker PostgreSQL instance on port `5433`.

```bash
# Ensure Docker PostgreSQL is running
docker compose up -d

# Execute the E2E workflow script
npx tsx scripts/test-e2e-workflow.ts
```

### Expected Output:
```text
🚀 Starting Full End-to-End CRM Functional & Database Test...

🔹 Step 1: Testing Company Creation...
✅ Company Created: Tesla Inc (ID: test-tesla)

🔹 Step 2: Testing Deal Creation & Lifecycle (Lead -> Qualified -> Negotiation -> Won)...
✅ Deal Created: "Tesla Full Fleet Telemetry Integration" with Value: $500,000 in stage "Qualified"
✅ Deal Stage Updated -> Negotiation (Probability: 85%)
✅ Deal Successfully Closed-Won -> Won (Revenue Secured: $500,000)

🔹 Step 3: Testing Executive Contact Creation...
✅ Contact Created: Elon Musk (Technoking & CEO) - Status: Customer

🔹 Step 4: Testing Sales Activity & Meeting Logger...
✅ Activity Logged: [MEETING] "Q4 Final Contract Signoff with Elon" (Badge: $500,000)

🔹 Step 5: Testing Email Sequence Cadence Creation...
✅ Sequence Created: "Tesla Post-Onboarding Success Cadence" (Status: Active, Open Rate: 88%)

🔹 Step 6: Testing Financial Forecast Metrics Calculation...
📊 Total Active Deals in DB: 11
💰 Total Pipeline: $4,665k
📈 Weighted Pipeline: $2,944.25k
🏆 Closed Won Revenue: $710k

🔹 Step 7: Verifying Database Integrity...
✅ All records verified across PostgreSQL database!

========================================================
🎉 FULL END-TO-END WORKFLOW TEST: 100% PASSED!
========================================================
```

---

## 🖥️ Method 2: Manual Step-by-Step UI Guide

Follow these steps directly inside the web browser at [http://localhost:3000](http://localhost:3000) to see every component update in real time:

### Step 1: Create the Account in Companies
1. In the left sidebar, click **Companies**.
2. Click **+ Add Company** in the top toolbar.
3. Fill in the modal:
   - **Company Name**: `Tesla Inc`
   - **Segment / Tags**: Select `Enterprise` and `Strategic`
   - **Owner**: Select `Jensen Ackles`
4. Click **Create Company**.
5. **UI Verification**:
   - `Tesla Inc` appears at the top of the table.
   - Clicking on the row opens the **Detail Drawer** showing ARR metrics and engagement history.

---

### Step 2: Open Commercial Opportunity in Deals Board
1. In the left sidebar, click **Deals Board** (Kanban view).
2. Click **+ Add Deal** in the top right.
3. Enter opportunity specifications:
   - **Deal Title**: `Tesla Full Fleet Telemetry Integration`
   - **Company Name**: `Tesla Inc`
   - **Deal Value ($)**: `500000`
   - **Priority**: `High`
   - **Initial Stage**: `Qualified`
4. Click **Create Deal**.
5. **UI Verification**:
   - The card appears inside the `Qualified` column with a `$500,000` tag and `High` priority pill.
   - The header's **Total Pipeline Value** increases by `$500k`.

---

### Step 3: Register Decision Maker in Contacts
1. In the left sidebar, click **Contacts**.
2. Click **+ Add Contact** in the top right.
3. Enter executive details:
   - **Full Name**: `Elon Musk`
   - **Job Title**: `Technoking & CEO`
   - **Company**: `Tesla Inc`
   - **Email**: `elon@tesla.com`
   - **Phone**: `+1 (512) 555-0199`
4. Click **Save Contact**.
5. **UI Verification**:
   - Elon Musk's contact card appears with the `Customer` / `Active` badge.
   - Typing `Tesla` or `Elon` in the search bar instantly filters to this card.

---

### Step 4: Log Customer Meeting & Milestone in Activities
1. In the left sidebar, click **Activities**.
2. Click **+ Log Activity** in the top right.
3. Record meeting notes:
   - **Activity Type**: Select `📅 Meeting / Sync`
   - **Title / Summary**: `Q4 Final Contract Signoff with Elon`
   - **Company / Account**: `Tesla Inc`
   - **Details**: `Finalized SLA and indemnity terms. Signed 1-year telemetry software agreement.`
4. Click **Save Activity**.
5. **UI Verification**:
   - The new meeting item appears at the top of the timeline.
   - Switching the filter tab to `Meetings` isolates this event.

---

### Step 5: Close-Won Deal & Inspect Global Forecast
1. Return to **Deals Board** via the left sidebar.
2. Locate the **Tesla** card under `Qualified`:
   - Click the **Stage** dropdown on the card and switch it to **`Won`**.
   - The card immediately animates into the **Won** column.
3. Navigate to **Forecast** in the left sidebar:
   - **Closed Won (Q4)** increases from `$210k` to **`$710k`**.
   - The **Quota Attainment** progress bar jumps forward automatically.
4. Navigate to **Team** in the left sidebar:
   - Jensen Ackles's **Quota Pacing** and **Win Rate** update to reflect the secured booking.

---

## 🔍 Database Inspection (Prisma Studio)

To inspect the underlying PostgreSQL records created by this workflow:
1. Open [http://localhost:5556](http://localhost:5556).
2. Select the **Company**, **Deal**, **Contact**, or **Activity** model to view the raw database rows.

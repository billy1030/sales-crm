# Database Model & Entity-Relationship Considerations

## 1. Schema Specifications

All models are defined in [`prisma/schema.prisma`](file:///c:/ai/sales-crm/prisma/schema.prisma).

```mermaid
erDiagram
    Company ||--o{ Deal : "has opportunities"
    Company ||--o{ Contact : "has stakeholders"
    Company ||--o{ Activity : "logs interactions"
    TeamMember ||--o{ Deal : "owns"
    TeamMember ||--o{ Contact : "manages"

    Company {
        string id PK
        string name
        string[] tags
        string owner
        int openDeals
        int pipelineValue
        int winProbability
        int[] trend
        string lastInteraction
        int activityDays
        string logo
    }

    Deal {
        string id PK
        string title
        string companyId FK
        string companyName
        int value
        string stage
        string owner
        int probability
        string expectedCloseDate
        string priority
        string[] tags
    }

    Contact {
        string id PK
        string name
        string email
        string phone
        string title
        string companyId FK
        string companyName
        string owner
        string avatar
        string lastContacted
        string status
    }

    Activity {
        string id PK
        string type
        string title
        string description
        string companyId FK
        string companyName
        string userName
        string userAvatar
        DateTime timestamp
        string badge
    }

    EmailSequence {
        string id PK
        string name
        string status
        int totalEnrolled
        int openRate
        int replyRate
        int stepsCount
        string targetSegment
        string creator
    }

    TeamMember {
        string id PK
        string name
        string role
        string team
        string avatar
        string email UK
        int pipelineTarget
        int pipelineAchieved
        int dealsCount
        int winRate
    }
```

---

## 2. Technical Decisions & Trade-offs

### A. Flexible Foreign Keys vs Strict Constraints
- **Consideration**: During initial prototyping, initial seed datasets may reference companies with arbitrary slug formats.
- **Decision**: Keep foreign references (`companyId`) indexed and linked logically, while avoiding cascade blocking on mock seed imports. When moving into strict production constraints, foreign key constraints (`@relation(fields: [companyId], references: [id])`) can be enforced with database migration guards.

### B. Array Types in PostgreSQL
- **Decision**: Used native PostgreSQL array types (`String[]`, `Int[]`) for:
  - `tags` (Company and Deal tags)
  - `trend` (Sparkline trend arrays for ARR velocity)
- **Benefit**: Eliminates the overhead of separate join tables for simple, fixed-cardinality tag arrays while preserving native SQL queryability.

### C. Seeding Strategy
- **File**: [`prisma/seed.ts`](file:///c:/ai/sales-crm/prisma/seed.ts)
- **Execution**: `npx tsx prisma/seed.ts`
- **Behavior**:
  - Drops existing data safely to avoid unique constraint collisions.
  - Inserts companies, deals, contacts, activities, sequences, and team members in sequential batches.
  - Generates realistic enterprise CRM data (Microsoft, Apple, Google, NVIDIA, etc.).

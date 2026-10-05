import { PrismaClient } from "@prisma/client";
import { COMPANIES } from "../data/companies";
import { INITIAL_DEALS } from "../data/deals";
import { INITIAL_CONTACTS } from "../data/contacts";
import { INITIAL_ACTIVITIES } from "../data/activities";
import { INITIAL_SEQUENCES } from "../data/sequences";
import { INITIAL_TEAM } from "../data/team";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Database Seed to PostgreSQL (Port 5433)...");

  // Clear existing
  await prisma.activity.deleteMany({});
  await prisma.deal.deleteMany({});
  await prisma.contact.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.emailSequence.deleteMany({});
  await prisma.teamMember.deleteMany({});

  // 1. Seed Companies
  console.log(`Inserting ${COMPANIES.length} companies...`);
  for (const c of COMPANIES) {
    await prisma.company.create({
      data: {
        id: c.id,
        name: c.name,
        tags: c.tags,
        owner: c.owner,
        openDeals: c.openDeals,
        pipelineValue: c.pipelineValue,
        winProbability: c.winProbability,
        trend: c.trend,
        lastInteraction: JSON.stringify(c.lastInteraction),
        activityDays: c.activityDays,
        logo: c.logo || null,
      },
    });
  }

  // 2. Seed Deals
  console.log(`Inserting ${INITIAL_DEALS.length} deals...`);
  for (const d of INITIAL_DEALS) {
    await prisma.deal.create({
      data: {
        id: d.id,
        title: d.title,
        companyId: d.companyId,
        companyName: d.companyName,
        value: d.value,
        stage: d.stage,
        owner: d.owner,
        probability: d.probability,
        expectedCloseDate: d.expectedCloseDate,
        priority: d.priority,
        tags: d.tags,
      },
    });
  }

  // 3. Seed Contacts
  console.log(`Inserting ${INITIAL_CONTACTS.length} contacts...`);
  for (const con of INITIAL_CONTACTS) {
    await prisma.contact.create({
      data: {
        id: con.id,
        name: con.name,
        email: con.email,
        phone: con.phone,
        title: con.title,
        companyId: con.companyId,
        companyName: con.companyName,
        owner: con.owner,
        avatar: con.avatar,
        lastContacted: con.lastContacted,
        status: con.status,
      },
    });
  }

  // 4. Seed Activities
  console.log(`Inserting ${INITIAL_ACTIVITIES.length} activities...`);
  for (const a of INITIAL_ACTIVITIES) {
    await prisma.activity.create({
      data: {
        id: a.id,
        type: a.type,
        title: a.title,
        description: a.description,
        companyId: a.companyId,
        companyName: a.companyName,
        userName: a.userName,
        userAvatar: a.userAvatar,
        timestamp: new Date(a.timestamp),
        badge: a.badge || null,
      },
    });
  }

  // 5. Seed Sequences
  console.log(`Inserting ${INITIAL_SEQUENCES.length} sequences...`);
  for (const s of INITIAL_SEQUENCES) {
    await prisma.emailSequence.create({
      data: {
        id: s.id,
        name: s.name,
        status: s.status,
        totalEnrolled: s.totalEnrolled,
        openRate: s.openRate,
        replyRate: s.replyRate,
        stepsCount: s.stepsCount,
        targetSegment: s.targetSegment,
        creator: s.creator,
      },
    });
  }

  // 6. Seed Team
  console.log(`Inserting ${INITIAL_TEAM.length} team members...`);
  for (const t of INITIAL_TEAM) {
    await prisma.teamMember.create({
      data: {
        id: t.id,
        name: t.name,
        role: t.role,
        team: t.team,
        avatar: t.avatar,
        email: t.email,
        pipelineTarget: t.pipelineTarget,
        pipelineAchieved: t.pipelineAchieved,
        dealsCount: t.dealsCount,
        winRate: t.winRate,
      },
    });
  }

  console.log("✅ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

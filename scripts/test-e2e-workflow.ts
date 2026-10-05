import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runFullE2ETest() {
  console.log("🚀 Starting Full End-to-End CRM Functional & Database Test...\n");

  const testCompanyId = "test-tesla";
  const testCompanyName = "Tesla Inc";

  // Step 1: Test Company Creation
  console.log("🔹 Step 1: Testing Company Creation...");
  const company = await prisma.company.upsert({
    where: { id: testCompanyId },
    update: {},
    create: {
      id: testCompanyId,
      name: testCompanyName,
      tags: ["Enterprise", "Strategic"],
      owner: "Jensen Ackles",
      openDeals: 1,
      pipelineValue: 500000,
      winProbability: 75,
      trend: [5, 6, 8, 10, 12, 15, 20],
      activityDays: 1,
      lastInteraction: JSON.stringify({ date: "2026-10-05", label: "Initial Discovery" }),
    },
  });
  console.log(`✅ Company Created: ${company.name} (ID: ${company.id})`);

  // Step 2: Test Deal Creation & Stage Transitions
  console.log("\n🔹 Step 2: Testing Deal Creation & Lifecycle (Lead -> Qualified -> Negotiation -> Won)...");
  const deal = await prisma.deal.create({
    data: {
      title: "Tesla Full Fleet Telemetry Integration",
      companyId: testCompanyId,
      companyName: testCompanyName,
      value: 500000,
      stage: "Qualified",
      owner: "Jensen Ackles",
      probability: 60,
      priority: "High",
      tags: ["Fleet", "Enterprise"],
    },
  });
  console.log(`✅ Deal Created: "${deal.title}" with Value: $${deal.value.toLocaleString()} in stage "${deal.stage}"`);

  // Move deal to Negotiation
  const updatedDeal = await prisma.deal.update({
    where: { id: deal.id },
    data: { stage: "Negotiation", probability: 85 },
  });
  console.log(`✅ Deal Stage Updated -> ${updatedDeal.stage} (Probability: ${updatedDeal.probability}%)`);

  // Move deal to Won
  const wonDeal = await prisma.deal.update({
    where: { id: deal.id },
    data: { stage: "Won", probability: 100 },
  });
  console.log(`✅ Deal Successfully Closed-Won -> ${wonDeal.stage} (Revenue Secured: $${wonDeal.value.toLocaleString()})`);

  // Step 3: Test Contact Creation
  console.log("\n🔹 Step 3: Testing Executive Contact Creation...");
  const contact = await prisma.contact.create({
    data: {
      name: "Elon Musk",
      email: "elon@tesla.com",
      phone: "+1 (512) 555-0199",
      title: "Technoking & CEO",
      companyId: testCompanyId,
      companyName: testCompanyName,
      owner: "Jensen Ackles",
      status: "Customer",
    },
  });
  console.log(`✅ Contact Created: ${contact.name} (${contact.title}) - Status: ${contact.status}`);

  // Step 4: Test Activity Logging
  console.log("\n🔹 Step 4: Testing Sales Activity & Meeting Logger...");
  const activity = await prisma.activity.create({
    data: {
      type: "meeting",
      title: "Q4 Final Contract Signoff with Elon",
      description: "Signed multi-year telemetry analytics contract for 500k ARR.",
      companyId: testCompanyId,
      companyName: testCompanyName,
      userName: "Jensen Ackles",
      badge: "$500,000",
    },
  });
  console.log(`✅ Activity Logged: [${activity.type.toUpperCase()}] "${activity.title}" (Badge: ${activity.badge})`);

  // Step 5: Test Automated Email Sequence
  console.log("\n🔹 Step 5: Testing Email Sequence Cadence Creation...");
  const sequence = await prisma.emailSequence.create({
    data: {
      name: "Tesla Post-Onboarding Success Cadence",
      status: "Active",
      totalEnrolled: 15,
      openRate: 88,
      replyRate: 40,
      stepsCount: 4,
      targetSegment: "Strategic Accounts",
      creator: "Jensen Ackles",
    },
  });
  console.log(`✅ Sequence Created: "${sequence.name}" (Status: ${sequence.status}, Open Rate: ${sequence.openRate}%)`);

  // Step 6: Test Forecast Calculations
  console.log("\n🔹 Step 6: Testing Financial Forecast Metrics Calculation...");
  const allDeals = await prisma.deal.findMany();
  const totalPipeline = allDeals.reduce((sum, d) => sum + d.value, 0);
  const totalWon = allDeals.filter((d) => d.stage === "Won").reduce((sum, d) => sum + d.value, 0);
  const weightedPipeline = allDeals.reduce((sum, d) => sum + (d.value * d.probability) / 100, 0);

  console.log(`📊 Total Active Deals in DB: ${allDeals.length}`);
  console.log(`💰 Total Pipeline: $${(totalPipeline / 1000).toLocaleString()}k`);
  console.log(`📈 Weighted Pipeline: $${(Math.round(weightedPipeline) / 1000).toLocaleString()}k`);
  console.log(`🏆 Closed Won Revenue: $${(totalWon / 1000).toLocaleString()}k`);

  // Step 7: Verify Data Integrity & Cleanliness
  console.log("\n🔹 Step 7: Verifying Database Integrity...");
  const companyCheck = await prisma.company.findUnique({ where: { id: testCompanyId } });
  const dealCheck = await prisma.deal.findUnique({ where: { id: deal.id } });
  const contactCheck = await prisma.contact.findUnique({ where: { id: contact.id } });
  const activityCheck = await prisma.activity.findUnique({ where: { id: activity.id } });

  if (companyCheck && dealCheck && contactCheck && activityCheck) {
    console.log("✅ All records verified across PostgreSQL database!");
  } else {
    throw new Error("Data verification check failed!");
  }

  console.log("\n========================================================");
  console.log("🎉 FULL END-TO-END WORKFLOW TEST: 100% PASSED!");
  console.log("========================================================\n");
}

runFullE2ETest()
  .catch((err) => {
    console.error("❌ Test Failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

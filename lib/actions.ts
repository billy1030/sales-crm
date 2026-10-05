"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCRMInitialData() {
  try {
    const [companies, deals, contacts, activities, sequences, team] =
      await Promise.all([
        prisma.company.findMany({ orderBy: { name: "asc" } }),
        prisma.deal.findMany({ orderBy: { value: "desc" } }),
        prisma.contact.findMany({ orderBy: { name: "asc" } }),
        prisma.activity.findMany({ orderBy: { timestamp: "desc" } }),
        prisma.emailSequence.findMany({ orderBy: { name: "asc" } }),
        prisma.teamMember.findMany({ orderBy: { pipelineAchieved: "desc" } }),
      ]);

    const formattedCompanies = companies.map((c) => ({
      ...c,
      lastInteraction: c.lastInteraction
        ? JSON.parse(c.lastInteraction)
        : { date: "2026-03-01", label: "Touchpoint" },
      logo: c.logo || undefined,
    }));

    const formattedActivities = activities.map((a) => ({
      ...a,
      timestamp: a.timestamp.toISOString(),
      relativeTime: "Recently",
      badge: a.badge || undefined,
      userAvatar: a.userAvatar || "/assets/images/_common/avatars/avatar-1.png",
    }));

    return {
      companies: formattedCompanies,
      deals,
      contacts: contacts.map((con) => ({
        ...con,
        phone: con.phone || "",
        title: con.title || "",
        avatar: con.avatar || "/assets/images/_common/avatars/avatar-1.png",
        lastContacted: con.lastContacted || "Never",
        status: con.status as "Active" | "Customer" | "Lead" | "Churned",
      })),
      activities: formattedActivities,
      sequences: sequences.map((s) => ({
        ...s,
        status: s.status as "Active" | "Draft" | "Paused",
        lastUpdated: "Recently",
      })),
      team: team.map((t) => ({
        ...t,
        team: t.team as "Strategic AEs" | "Mid Market" | "SDR Team",
      })),
    };
  } catch (error) {
    console.error("Failed to query PostgreSQL CRM data:", error);
    return null;
  }
}

export async function createDealAction(formData: {
  title: string;
  companyName: string;
  value: number;
  stage: string;
  priority: string;
  owner?: string;
}) {
  const companyId = formData.companyName.toLowerCase().replace(/\s+/g, "-");

  const deal = await prisma.deal.create({
    data: {
      title: formData.title,
      companyId,
      companyName: formData.companyName,
      value: formData.value,
      stage: formData.stage,
      priority: formData.priority,
      owner: formData.owner || "Jensen Ackles",
      probability: formData.stage === "Won" ? 100 : 50,
      expectedCloseDate: new Date(Date.now() + 30 * 86400000)
        .toISOString()
        .split("T")[0],
    },
  });

  revalidatePath("/");
  return deal;
}

export async function updateDealStageAction(dealId: string, stage: string) {
  const deal = await prisma.deal.update({
    where: { id: dealId },
    data: {
      stage,
      probability: stage === "Won" ? 100 : stage === "Lost" ? 0 : 60,
    },
  });

  revalidatePath("/");
  return deal;
}

export async function createContactAction(data: {
  name: string;
  email: string;
  phone?: string;
  title?: string;
  companyName: string;
}) {
  const companyId = data.companyName.toLowerCase().replace(/\s+/g, "-");

  const contact = await prisma.contact.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone || "+1 (555) 000-0000",
      title: data.title || "Executive",
      companyId,
      companyName: data.companyName,
      owner: "Jensen Ackles",
      status: "Active",
    },
  });

  revalidatePath("/");
  return contact;
}

export async function createActivityAction(data: {
  type: string;
  title: string;
  description: string;
  companyName: string;
}) {
  const companyId = data.companyName.toLowerCase().replace(/\s+/g, "-");

  const act = await prisma.activity.create({
    data: {
      type: data.type,
      title: data.title,
      description: data.description,
      companyId,
      companyName: data.companyName,
      userName: "Jensen Ackles",
      userAvatar: "/assets/images/_common/avatars/avatar-1.png",
    },
  });

  revalidatePath("/");
  return act;
}

export type EmailSequence = {
  id: string;
  name: string;
  status: "Active" | "Draft" | "Paused";
  totalEnrolled: number;
  openRate: number;
  replyRate: number;
  stepsCount: number;
  targetSegment: string;
  creator: string;
  lastUpdated: string;
};

export const INITIAL_SEQUENCES: EmailSequence[] = [
  {
    id: "seq-1",
    name: "Enterprise CIO Cold Outreach 2026",
    status: "Active",
    totalEnrolled: 142,
    openRate: 68,
    replyRate: 24,
    stepsCount: 4,
    targetSegment: "Enterprise / Fortune 500",
    creator: "Jensen Ackles",
    lastUpdated: "Yesterday",
  },
  {
    id: "seq-2",
    name: "Inbound Trial Signups Nurture",
    status: "Active",
    totalEnrolled: 389,
    openRate: 74,
    replyRate: 31,
    stepsCount: 5,
    targetSegment: "Self-serve SaaS",
    creator: "Sarah Nguyen",
    lastUpdated: "3 days ago",
  },
  {
    id: "seq-3",
    name: "AI Copilot Pilot Feedback Loop",
    status: "Active",
    totalEnrolled: 86,
    openRate: 82,
    replyRate: 45,
    stepsCount: 3,
    targetSegment: "Product Pilots",
    creator: "James Taylor",
    lastUpdated: "5 days ago",
  },
  {
    id: "seq-4",
    name: "Q4 Renewal & Expansion Touchpoint",
    status: "Draft",
    totalEnrolled: 0,
    openRate: 0,
    replyRate: 0,
    stepsCount: 3,
    targetSegment: "Existing Customers",
    creator: "Maria Keller",
    lastUpdated: "Just now",
  },
];

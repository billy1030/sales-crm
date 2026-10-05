export type ActivityType = "call" | "email" | "meeting" | "note" | "deal_won";

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  companyName: string;
  companyId: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  relativeTime: string;
  badge?: string;
};

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: "act-1",
    type: "deal_won",
    title: "Closed Won: Netflix CDN Optimization",
    description: "Successfully signed 1-year contract extension worth $210,000 ARR.",
    companyName: "Netflix",
    companyId: "netflix",
    userName: "Mark Darnalds",
    userAvatar: "/assets/images/_common/avatars/avatar-6.png",
    timestamp: "2026-10-05T09:30:00Z",
    relativeTime: "1 hour ago",
    badge: "$210,000",
  },
  {
    id: "act-2",
    type: "meeting",
    title: "Executive Sync with Satya Nadella",
    description: "Discussed multi-cloud security architecture and expansion timeline for Q1 2027.",
    companyName: "Microsoft",
    companyId: "microsoft",
    userName: "Sarah Nguyen",
    userAvatar: "/assets/images/_common/avatars/avatar-1.png",
    timestamp: "2026-10-05T08:15:00Z",
    relativeTime: "2 hours ago",
  },
  {
    id: "act-3",
    type: "email",
    title: "Sent Revised Proposal to Google",
    description: "Included customized SLA and compute cluster discounts for AI Platform team.",
    companyName: "Google",
    companyId: "google",
    userName: "James Taylor",
    userAvatar: "/assets/images/_common/avatars/avatar-2.png",
    timestamp: "2026-10-04T16:45:00Z",
    relativeTime: "Yesterday at 4:45 PM",
  },
  {
    id: "act-4",
    type: "call",
    title: "Discovery Call with Airbnb Infra Lead",
    description: "Identified pain points regarding host reservation latency in high season.",
    companyName: "Airbnb",
    companyId: "airbnb",
    userName: "Lina Wong",
    userAvatar: "/assets/images/_common/avatars/avatar-8.png",
    timestamp: "2026-10-04T14:00:00Z",
    relativeTime: "Yesterday at 2:00 PM",
  },
  {
    id: "act-5",
    type: "note",
    title: "NVIDIA DGX Cluster Contract Review",
    description: "Legal team approved indemnity clauses. Final sign-off scheduled for Friday.",
    companyName: "NVIDIA",
    companyId: "nvidia",
    userName: "Alex Santos",
    userAvatar: "/assets/images/_common/avatars/avatar-7.png",
    timestamp: "2026-10-03T11:20:00Z",
    relativeTime: "2 days ago",
  },
  {
    id: "act-6",
    type: "meeting",
    title: "Product Demo: Spotify Creator Suite",
    description: "Walkthrough of creator analytics portal with Head of Artist Partnerships.",
    companyName: "Spotify",
    companyId: "spotify",
    userName: "Drew Nash",
    userAvatar: "/assets/images/_common/avatars/avatar-10.png",
    timestamp: "2026-10-02T15:00:00Z",
    relativeTime: "3 days ago",
  },
];

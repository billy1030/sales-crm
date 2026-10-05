import { OWNERS } from "./companies";

export type DealStage =
  | "Lead"
  | "Qualified"
  | "Demo / Meeting"
  | "Proposal"
  | "Negotiation"
  | "Won"
  | "Lost";

export type Deal = {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  value: number;
  stage: DealStage;
  owner: string;
  probability: number;
  expectedCloseDate: string;
  priority: "High" | "Medium" | "Low";
  tags: string[];
};

export const DEAL_STAGES: DealStage[] = [
  "Lead",
  "Qualified",
  "Demo / Meeting",
  "Proposal",
  "Negotiation",
  "Won",
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: "deal-1",
    title: "Global Enterprise Cloud Migration",
    companyId: "microsoft",
    companyName: "Microsoft",
    value: 480000,
    stage: "Negotiation",
    owner: "Sarah Nguyen",
    probability: 85,
    expectedCloseDate: "2026-11-15",
    priority: "High",
    tags: ["Enterprise", "Multi-Year"],
  },
  {
    id: "deal-2",
    title: "AI Automation Platform Pilot",
    companyId: "google",
    companyName: "Google",
    value: 290000,
    stage: "Proposal",
    owner: "James Taylor",
    probability: 70,
    expectedCloseDate: "2026-11-30",
    priority: "High",
    tags: ["Pilot", "AI Core"],
  },
  {
    id: "deal-3",
    title: "Prime Video Analytics Integration",
    companyId: "amazon",
    companyName: "Amazon",
    value: 620000,
    stage: "Demo / Meeting",
    owner: "Maria Keller",
    probability: 55,
    expectedCloseDate: "2026-12-10",
    priority: "High",
    tags: ["Strategic", "Media"],
  },
  {
    id: "deal-4",
    title: "iOS Ecosystem Security Suite",
    companyId: "apple",
    companyName: "Apple",
    value: 750000,
    stage: "Qualified",
    owner: "Sarah Nguyen",
    probability: 40,
    expectedCloseDate: "2027-01-20",
    priority: "Medium",
    tags: ["Security", "Enterprise"],
  },
  {
    id: "deal-5",
    title: "Ad Monetization Data Pipeline",
    companyId: "meta",
    companyName: "Meta",
    value: 380000,
    stage: "Lead",
    owner: "Nia Jameson",
    probability: 25,
    expectedCloseDate: "2027-02-15",
    priority: "Medium",
    tags: ["AdTech"],
  },
  {
    id: "deal-6",
    title: "Omniverse Compute Extension",
    companyId: "nvidia",
    companyName: "NVIDIA",
    value: 520000,
    stage: "Negotiation",
    owner: "Alex Santos",
    probability: 90,
    expectedCloseDate: "2026-10-30",
    priority: "High",
    tags: ["GPU Infrastructure", "Expansion"],
  },
  {
    id: "deal-7",
    title: "Netflix Streaming CDN Optimization",
    companyId: "netflix",
    companyName: "Netflix",
    value: 210000,
    stage: "Won",
    owner: "Mark Darnalds",
    probability: 100,
    expectedCloseDate: "2026-10-01",
    priority: "Medium",
    tags: ["Closed Won", "Annual"],
  },
  {
    id: "deal-8",
    title: "Audience Engagement AI Bot",
    companyId: "spotify",
    companyName: "Spotify",
    value: 175000,
    stage: "Proposal",
    owner: "Drew Nash",
    probability: 65,
    expectedCloseDate: "2026-12-05",
    priority: "Low",
    tags: ["Audio AI", "SMB"],
  },
  {
    id: "deal-9",
    title: "Hospitality Host CRM Gateway",
    companyId: "airbnb",
    companyName: "Airbnb",
    value: 310000,
    stage: "Demo / Meeting",
    owner: "Lina Wong",
    probability: 50,
    expectedCloseDate: "2026-11-20",
    priority: "Medium",
    tags: ["Marketplace"],
  },
  {
    id: "deal-10",
    title: "Global Ride-Hailing Telemetry",
    companyId: "uber",
    companyName: "Uber",
    value: 430000,
    stage: "Qualified",
    owner: "Jamie Fox",
    probability: 35,
    expectedCloseDate: "2027-01-10",
    priority: "High",
    tags: ["Fleet", "Real-time"],
  },
];

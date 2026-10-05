export type TeamMember = {
  id: string;
  name: string;
  role: string;
  team: "Strategic AEs" | "Mid Market" | "SDR Team";
  avatar: string;
  email: string;
  pipelineTarget: number;
  pipelineAchieved: number;
  dealsCount: number;
  winRate: number;
};

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "tm-1",
    name: "Jensen Ackles",
    role: "Head of Sales",
    team: "Strategic AEs",
    avatar: "/assets/images/_common/avatars/avatar-1.png",
    email: "jensen@crm.com",
    pipelineTarget: 1500000,
    pipelineAchieved: 1420000,
    dealsCount: 8,
    winRate: 72,
  },
  {
    id: "tm-2",
    name: "Sarah Nguyen",
    role: "Senior Enterprise AE",
    team: "Strategic AEs",
    avatar: "/assets/images/_common/avatars/avatar-2.png",
    email: "sarah.nguyen@crm.com",
    pipelineTarget: 1200000,
    pipelineAchieved: 1230000,
    dealsCount: 6,
    winRate: 68,
  },
  {
    id: "tm-3",
    name: "James Taylor",
    role: "Strategic AE",
    team: "Strategic AEs",
    avatar: "/assets/images/_common/avatars/avatar-3.png",
    email: "james.taylor@crm.com",
    pipelineTarget: 1000000,
    pipelineAchieved: 890000,
    dealsCount: 5,
    winRate: 60,
  },
  {
    id: "tm-4",
    name: "Maria Keller",
    role: "Mid Market Lead",
    team: "Mid Market",
    avatar: "/assets/images/_common/avatars/avatar-4.png",
    email: "maria.keller@crm.com",
    pipelineTarget: 800000,
    pipelineAchieved: 920000,
    dealsCount: 12,
    winRate: 58,
  },
  {
    id: "tm-5",
    name: "Alex Santos",
    role: "Mid Market AE",
    team: "Mid Market",
    avatar: "/assets/images/_common/avatars/avatar-5.png",
    email: "alex.santos@crm.com",
    pipelineTarget: 750000,
    pipelineAchieved: 680000,
    dealsCount: 9,
    winRate: 54,
  },
  {
    id: "tm-6",
    name: "Nia Jameson",
    role: "SDR Team Lead",
    team: "SDR Team",
    avatar: "/assets/images/_common/avatars/avatar-6.png",
    email: "nia.jameson@crm.com",
    pipelineTarget: 500000,
    pipelineAchieved: 540000,
    dealsCount: 22,
    winRate: 45,
  },
];

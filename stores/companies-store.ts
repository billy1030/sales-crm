import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { COMPANIES, type Company, type SortKey } from "@/data/companies";
import { NOTIFICATIONS } from "@/data/notifications";
import { INITIAL_DEALS, type Deal, type DealStage } from "@/data/deals";
import { INITIAL_CONTACTS, type Contact } from "@/data/contacts";
import { INITIAL_ACTIVITIES, type Activity } from "@/data/activities";
import { INITIAL_SEQUENCES, type EmailSequence } from "@/data/sequences";
import { INITIAL_TEAM, type TeamMember } from "@/data/team";
import { DEFAULT_FILTERS } from "@/lib/companies";

export type NavTab =
  | "companies"
  | "deals"
  | "forecast"
  | "activities"
  | "contacts"
  | "sequences"
  | "team"
  | "slipping";

type CRMState = {
  // Navigation
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  teamFilter: "Strategic AEs" | "Mid Market" | "SDR Team" | "All";
  setTeamFilter: (filter: "Strategic AEs" | "Mid Market" | "SDR Team" | "All") => void;

  // Companies
  companies: Company[];
  sortBy: SortKey;
  owner: string;
  stage: string;
  activityWindow: number;
  selectedIds: string[];
  detailId: string | null;
  detailOpen: boolean;
  profileName: string | null;
  profileOpen: boolean;
  newCompanyOpen: boolean;
  sidebarOpen: boolean;
  searchOpen: boolean;
  inviteOpen: boolean;
  billingOpen: boolean;
  helpOpen: boolean;
  unreadNotificationIds: string[];

  // Deals Kanban
  deals: Deal[];
  updateDealStage: (dealId: string, newStage: DealStage) => void;
  addDeal: (deal: Omit<Deal, "id">) => void;

  // Contacts
  contacts: Contact[];
  addContact: (contact: Omit<Contact, "id">) => void;

  // Activities
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "relativeTime" | "timestamp">) => void;

  // Sequences
  sequences: EmailSequence[];
  addSequence: (seq: Omit<EmailSequence, "id" | "lastUpdated">) => void;

  // Team
  team: TeamMember[];

  // Modals & Navigation
  setInviteOpen: (open: boolean) => void;
  setBillingOpen: (open: boolean) => void;
  setHelpOpen: (open: boolean) => void;

  // Company Actions
  setSortBy: (sortBy: SortKey) => void;
  setOwner: (owner: string) => void;
  setStage: (stage: string) => void;
  setActivityWindow: (days: number) => void;
  resetFilters: () => void;
  toggleSelected: (id: string) => void;
  setSelected: (ids: string[]) => void;
  openDetail: (id: string) => void;
  closeDetail: () => void;
  openProfile: (name: string) => void;
  closeProfile: () => void;
  setNewCompanyOpen: (open: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addCompany: (company: Company) => void;
  syncWithDatabase: (data: {
    companies?: Company[];
    deals?: Deal[];
    contacts?: Contact[];
    activities?: Activity[];
    sequences?: EmailSequence[];
    team?: TeamMember[];
  }) => void;
};

export const useCompaniesStore = create<CRMState>()(
  persist(
    (set) => ({
      activeTab: "companies",
      setActiveTab: (activeTab) => set({ activeTab }),
      teamFilter: "All",
      setTeamFilter: (teamFilter) => set({ teamFilter }),

      companies: COMPANIES,
      ...DEFAULT_FILTERS,
      selectedIds: ["microsoft"],
      detailId: null,
      detailOpen: false,
      profileName: null,
      profileOpen: false,
      newCompanyOpen: false,
      sidebarOpen: false,
      searchOpen: false,
      inviteOpen: false,
      billingOpen: false,
      helpOpen: false,
      unreadNotificationIds: NOTIFICATIONS.filter((item) => item.unread).map(
        (item) => item.id,
      ),

      // Modals
      setInviteOpen: (inviteOpen) => set({ inviteOpen }),
      setBillingOpen: (billingOpen) => set({ billingOpen }),
      setHelpOpen: (helpOpen) => set({ helpOpen }),

      // Deals
      deals: INITIAL_DEALS,
      updateDealStage: (dealId, newStage) =>
        set((state) => ({
          deals: state.deals.map((d) =>
            d.id === dealId ? { ...d, stage: newStage } : d,
          ),
        })),
      addDeal: (newDeal) =>
        set((state) => ({
          deals: [
            {
              ...newDeal,
              id: `deal-${Date.now()}`,
            },
            ...state.deals,
          ],
        })),

      // Contacts
      contacts: INITIAL_CONTACTS,
      addContact: (newContact) =>
        set((state) => ({
          contacts: [
            {
              ...newContact,
              id: `contact-${Date.now()}`,
            },
            ...state.contacts,
          ],
        })),

      // Activities
      activities: INITIAL_ACTIVITIES,
      addActivity: (newAct) =>
        set((state) => ({
          activities: [
            {
              ...newAct,
              id: `act-${Date.now()}`,
              timestamp: new Date().toISOString(),
              relativeTime: "Just now",
            },
            ...state.activities,
          ],
        })),

      // Sequences
      sequences: INITIAL_SEQUENCES,
      addSequence: (newSeq) =>
        set((state) => ({
          sequences: [
            {
              ...newSeq,
              id: `seq-${Date.now()}`,
              lastUpdated: "Just now",
            },
            ...state.sequences,
          ],
        })),

      // Team
      team: INITIAL_TEAM,

      setSortBy: (sortBy) => set({ sortBy }),
      setOwner: (owner) => set({ owner }),
      setStage: (stage) => set({ stage }),
      setActivityWindow: (activityWindow) => set({ activityWindow }),
      resetFilters: () => set({ ...DEFAULT_FILTERS }),
      toggleSelected: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.includes(id)
            ? state.selectedIds.filter((selected) => selected !== id)
            : [...state.selectedIds, id],
        })),
      setSelected: (selectedIds) => set({ selectedIds }),
      openDetail: (detailId) =>
        set({ detailId, detailOpen: true, profileOpen: false }),
      closeDetail: () => set({ detailOpen: false }),
      openProfile: (profileName) =>
        set({ profileName, profileOpen: true, detailOpen: false }),
      closeProfile: () => set({ profileOpen: false }),
      setNewCompanyOpen: (newCompanyOpen) => set({ newCompanyOpen }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setSearchOpen: (searchOpen) => set({ searchOpen }),
      markNotificationRead: (id) =>
        set((state) => ({
          unreadNotificationIds: state.unreadNotificationIds.filter(
            (unread) => unread !== id,
          ),
        })),
      markAllNotificationsRead: () => set({ unreadNotificationIds: [] }),
      addCompany: (company) =>
        set((state) => ({
          companies: [company, ...state.companies],
          newCompanyOpen: false,
        })),
      syncWithDatabase: (data) =>
        set((state) => ({
          companies: data.companies && data.companies.length > 0 ? data.companies : state.companies,
          deals: data.deals && data.deals.length > 0 ? (data.deals as any) : state.deals,
          contacts: data.contacts && data.contacts.length > 0 ? data.contacts : state.contacts,
          activities: data.activities && data.activities.length > 0 ? data.activities : state.activities,
          sequences: data.sequences && data.sequences.length > 0 ? data.sequences : state.sequences,
          team: data.team && data.team.length > 0 ? data.team : state.team,
        })),
    }),
    {
      name: "sales-crm-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        deals: state.deals,
        contacts: state.contacts,
        activities: state.activities,
        sequences: state.sequences,
        companies: state.companies,
        activeTab: state.activeTab,
      }),
    },
  ),
);

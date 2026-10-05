"use client";

import Button from "@/components/_ui/button";
import { ScrollArea } from "@/components/_ui/scroll-area";
import SidebarNavItem from "./sidebar-nav-item";
import SidebarSection from "./sidebar-section";
import { useCompaniesStore, type NavTab } from "@/stores/companies-store";
import Logo from "@/public/assets/images/_common/logo.svg";
import BuildingIcon from "@/public/assets/images/companies/sidebar/building.svg";
import ClipboardIcon from "@/public/assets/images/companies/sidebar/clipboard.svg";
import BarChartIcon from "@/public/assets/images/companies/sidebar/bar-chart.svg";
import ListIcon from "@/public/assets/images/companies/sidebar/list.svg";
import BookClosedIcon from "@/public/assets/images/companies/sidebar/book-closed.svg";
import MailIcon from "@/public/assets/images/companies/sidebar/mail.svg";
import TargetIcon from "@/public/assets/images/companies/sidebar/target-05.svg";
import TargetAltIcon from "@/public/assets/images/companies/sidebar/target-03.svg";
import UsersIcon from "@/public/assets/images/companies/sidebar/users.svg";
import BarChartAltIcon from "@/public/assets/images/companies/sidebar/bar-chart-10.svg";
import AlertTriangleIcon from "@/public/assets/images/companies/sidebar/alert-triangle.svg";
import DotYellow from "@/public/assets/images/companies/sidebar/dot-yellow.svg";
import DotPink from "@/public/assets/images/companies/sidebar/dot-pink.svg";
import DotPurple from "@/public/assets/images/companies/sidebar/dot-purple.svg";
import UserPlusIcon from "@/public/assets/images/companies/sidebar/user-plus.svg";
import MessageQuestionIcon from "@/public/assets/images/companies/sidebar/message-question.svg";
import WalletIcon from "@/public/assets/images/companies/sidebar/wallet.svg";

const BASE_COMPANY_COUNT = 223;

export default function SidebarContent() {
  const companyCount = useCompaniesStore((state) => state.companies.length);
  const dealsCount = useCompaniesStore((state) => state.deals.length);
  const contactsCount = useCompaniesStore((state) => state.contacts.length);
  const activitiesCount = useCompaniesStore((state) => state.activities.length);
  const sequencesCount = useCompaniesStore((state) => state.sequences.length);
  const activeTab = useCompaniesStore((state) => state.activeTab);
  const setActiveTab = useCompaniesStore((state) => state.setActiveTab);
  const setTeamFilter = useCompaniesStore((state) => state.setTeamFilter);
  const setSidebarOpen = useCompaniesStore((state) => state.setSidebarOpen);
  const setInviteOpen = useCompaniesStore((state) => state.setInviteOpen);
  const setBillingOpen = useCompaniesStore((state) => state.setBillingOpen);
  const setHelpOpen = useCompaniesStore((state) => state.setHelpOpen);

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const handleSelectTeam = (teamName: "Strategic AEs" | "Mid Market" | "SDR Team") => {
    setTeamFilter(teamName);
    setActiveTab("team");
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-sidebar-border bg-sidebar-accent flex shrink-0 items-center gap-2 border-b p-3">
        <Logo aria-hidden className="size-8 shrink-0 overflow-visible" />
        <div className="flex min-w-0 flex-col gap-1">
          <span className="lead-style block truncate font-medium tracking-[-0.01em]">
            Sales CRM
          </span>
          <span className="caption-style text-subtle block truncate">
            Enterprise Pipeline
          </span>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <nav aria-label="Primary">
          <SidebarSection className="border-sidebar-border border-b">
            <SidebarNavItem
              icon={BuildingIcon}
              label="Companies"
              count={BASE_COMPANY_COUNT + companyCount}
              active={activeTab === "companies"}
              onClick={() => handleSelectTab("companies")}
            />
            <SidebarNavItem
              icon={ClipboardIcon}
              label="Deals Board"
              count={dealsCount}
              active={activeTab === "deals"}
              onClick={() => handleSelectTab("deals")}
            />
            <SidebarNavItem
              icon={BarChartIcon}
              label="Forecast"
              count={9}
              active={activeTab === "forecast"}
              onClick={() => handleSelectTab("forecast")}
            />
            <SidebarNavItem
              icon={ListIcon}
              label="Activities"
              count={activitiesCount}
              active={activeTab === "activities"}
              onClick={() => handleSelectTab("activities")}
            />
            <SidebarNavItem
              icon={BookClosedIcon}
              label="Contacts"
              count={contactsCount}
              active={activeTab === "contacts"}
              onClick={() => handleSelectTab("contacts")}
            />
            <SidebarNavItem
              icon={MailIcon}
              label="Email Sequences"
              count={sequencesCount}
              active={activeTab === "sequences"}
              onClick={() => handleSelectTab("sequences")}
            />
          </SidebarSection>

          <SidebarSection
            title="Team"
            className="border-sidebar-border border-b"
          >
            <SidebarNavItem
              icon={TargetIcon}
              label="Strategic AEs"
              active={activeTab === "team"}
              onClick={() => handleSelectTeam("Strategic AEs")}
            />
            <SidebarNavItem
              icon={TargetAltIcon}
              label="Mid Market"
              active={activeTab === "team"}
              onClick={() => handleSelectTeam("Mid Market")}
            />
            <SidebarNavItem
              icon={UsersIcon}
              label="SDR Team"
              active={activeTab === "team"}
              onClick={() => handleSelectTeam("SDR Team")}
            />
          </SidebarSection>

          <SidebarSection
            title="Reporting"
            className="border-sidebar-border border-b"
          >
            <SidebarNavItem
              icon={BarChartAltIcon}
              label="Q1 Forecast"
              active={activeTab === "forecast"}
              onClick={() => handleSelectTab("forecast")}
            />
            <SidebarNavItem
              icon={AlertTriangleIcon}
              label="Slipping Deals"
              active={activeTab === "slipping"}
              onClick={() => handleSelectTab("slipping")}
            />
          </SidebarSection>

          <SidebarSection title="Pipelines">
            <SidebarNavItem
              icon={DotYellow}
              label="North America"
              onClick={() => handleSelectTab("deals")}
            />
            <SidebarNavItem
              icon={DotPink}
              label="EMEA Enterprise"
              onClick={() => handleSelectTab("deals")}
            />
            <SidebarNavItem
              icon={DotPurple}
              label="APAC Expansion"
              onClick={() => handleSelectTab("deals")}
            />
          </SidebarSection>
        </nav>
      </ScrollArea>

      <SidebarSection className="border-sidebar-border shrink-0 border-t border-b">
        <SidebarNavItem
          icon={UserPlusIcon}
          label="Invite teammates"
          tone="quiet"
          onClick={() => setInviteOpen(true)}
        />
        <SidebarNavItem
          icon={MessageQuestionIcon}
          label="Help"
          tone="quiet"
          onClick={() => setHelpOpen(true)}
        />
      </SidebarSection>

      <div className="border-sidebar-border bg-sidebar-accent flex shrink-0 items-center justify-between gap-2 border-b p-4">
        <div className="flex flex-col gap-2">
          <span className="lead-style block font-medium tracking-[-0.01em]">
            14 Days
          </span>
          <span className="caption-style text-subtle block">
            Left on trials
          </span>
        </div>
        <Button
          variant="muted"
          size="md"
          onClick={() => setBillingOpen(true)}
        >
          <WalletIcon aria-hidden className="size-3.5" />
          Add Billings
        </Button>
      </div>
    </div>
  );
}

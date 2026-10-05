"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/_common/sidebar/sidebar";
import Companies from "@/components/companies/companies";
import DealsBoard from "@/components/deals/deals-board";
import ContactsView from "@/components/contacts/contacts-view";
import ActivitiesView from "@/components/activities/activities-view";
import ForecastView from "@/components/forecast/forecast-view";
import SequencesView from "@/components/sequences/sequences-view";
import TeamView from "@/components/team/team-view";
import SlippingDealsView from "@/components/deals/slipping-deals-view";
import CRMModals from "@/components/_common/crm-modals";
import { useCompaniesStore } from "@/stores/companies-store";
import { getCRMInitialData } from "@/lib/actions";

export default function Home() {
  const activeTab = useCompaniesStore((state) => state.activeTab);
  const syncWithDatabase = useCompaniesStore((state) => state.syncWithDatabase);
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    async function loadDataFromPostgres() {
      try {
        const data = await getCRMInitialData();
        if (data) {
          syncWithDatabase(data as any);
          setDbConnected(true);
        }
      } catch (err) {
        console.warn("PostgreSQL sync deferred, falling back to local cache:", err);
      }
    }
    loadDataFromPostgres();
  }, [syncWithDatabase]);

  return (
    <main className="flex h-dvh max-w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 relative">
        {dbConnected && (
          <div className="absolute top-2 right-4 z-50 flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 backdrop-blur-sm pointer-events-none">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            PostgreSQL 5433 Connected
          </div>
        )}
        {activeTab === "companies" && <Companies />}
        {activeTab === "deals" && <DealsBoard />}
        {activeTab === "contacts" && <ContactsView />}
        {activeTab === "activities" && <ActivitiesView />}
        {activeTab === "forecast" && <ForecastView />}
        {activeTab === "sequences" && <SequencesView />}
        {activeTab === "team" && <TeamView />}
        {activeTab === "slipping" && <SlippingDealsView />}
      </div>
      <CRMModals />
    </main>
  );
}

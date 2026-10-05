"use client";

import { useCompaniesStore } from "@/stores/companies-store";
import Button from "@/components/_ui/button";

export default function SlippingDealsView() {
  const deals = useCompaniesStore((state) => state.deals);
  const updateDealStage = useCompaniesStore((state) => state.updateDealStage);
  const setActiveTab = useCompaniesStore((state) => state.setActiveTab);

  // Filter deals that are in early/mid stages with high value that require attention
  const slipping = deals.filter(
    (d) =>
      d.priority === "High" &&
      (d.stage === "Lead" || d.stage === "Qualified" || d.stage === "Demo / Meeting"),
  );

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-foreground flex items-center gap-2">
              <span className="text-amber-400">⚠️</span> At-Risk & Slipping Deals
            </h1>
            <span className="rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 text-xs font-medium">
              {slipping.length} require action
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            High-value opportunities with stalled velocity or delayed close dates.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={() => setActiveTab("deals")}
        >
          View Full Pipeline
        </Button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl space-y-4 mx-auto">
          {slipping.map((deal) => (
            <div
              key={deal.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-amber-500/20 bg-card p-5 shadow-sm hover:border-amber-500/40 transition"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {deal.companyName}
                  </span>
                  <span className="rounded bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                    Stage: {deal.stage}
                  </span>
                </div>
                <h4 className="mt-1 text-sm font-medium text-foreground">
                  {deal.title}
                </h4>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Owner: {deal.owner}</span>
                  <span>Target Close: {deal.expectedCloseDate}</span>
                  <span className="text-amber-400">Low engagement this week</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-base font-bold font-mono text-foreground">
                    ${deal.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {deal.probability}% win prob
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => updateDealStage(deal.id, "Proposal")}
                >
                  Accelerate Deal
                </Button>
              </div>
            </div>
          ))}

          {slipping.length === 0 && (
            <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              🎉 No high-priority deals currently slipping! Pipeline velocity is healthy.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

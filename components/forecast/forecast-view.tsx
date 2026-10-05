"use client";

import { useCompaniesStore } from "@/stores/companies-store";

export default function ForecastView() {
  const deals = useCompaniesStore((state) => state.deals);

  const totalPipeline = deals.reduce((sum, d) => sum + d.value, 0);
  const weightedPipeline = deals.reduce(
    (sum, d) => sum + (d.value * d.probability) / 100,
    0,
  );
  const closedWon = deals
    .filter((d) => d.stage === "Won")
    .reduce((sum, d) => sum + d.value, 0);

  const targetQuota = 3500000;
  const quotaAttainment = Math.round((closedWon / targetQuota) * 100);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto bg-background p-6">
      {/* Header */}
      <div className="mb-6 flex shrink-0 items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Sales Forecast & Quota Attainment
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Q4 Revenue projections, weighted pipeline velocity, and team targets.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground">
            Quarter: Q4 2026
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <span className="text-xs font-medium text-muted-foreground">
            Total Pipeline
          </span>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            ${(totalPipeline / 1000).toLocaleString()}k
          </div>
          <span className="text-[11px] text-primary mt-1 block">
            Across {deals.length} active opportunities
          </span>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <span className="text-xs font-medium text-muted-foreground">
            Weighted Forecast
          </span>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            ${(Math.round(weightedPipeline) / 1000).toLocaleString()}k
          </div>
          <span className="text-[11px] text-green-400 mt-1 block">
            Adjusted by win probabilities
          </span>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <span className="text-xs font-medium text-muted-foreground">
            Closed Won (Q4)
          </span>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            ${(closedWon / 1000).toLocaleString()}k
          </div>
          <span className="text-[11px] text-green-400 mt-1 block">
            Booked revenue
          </span>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <span className="text-xs font-medium text-muted-foreground">
            Quota Attainment
          </span>
          <div className="mt-2 text-2xl font-bold font-mono text-foreground">
            {quotaAttainment}%
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${Math.min(quotaAttainment, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Detailed Pipeline Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stage analysis */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Pipeline by Stage
          </h3>
          <div className="space-y-3">
            {[
              "Lead",
              "Qualified",
              "Demo / Meeting",
              "Proposal",
              "Negotiation",
              "Won",
            ].map((stageName) => {
              const stageDeals = deals.filter((d) => d.stage === stageName);
              const val = stageDeals.reduce((sum, d) => sum + d.value, 0);
              const percent = totalPipeline > 0 ? (val / totalPipeline) * 100 : 0;

              return (
                <div key={stageName} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">
                      {stageName} ({stageDeals.length})
                    </span>
                    <span className="font-mono text-muted-foreground">
                      ${Math.round(val / 1000)}k ({Math.round(percent)}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary/80 rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Expected Closers */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Top High-Confidence Deals
          </h3>
          <div className="space-y-3">
            {deals
              .filter((d) => d.probability >= 50)
              .sort((a, b) => b.value - a.value)
              .slice(0, 5)
              .map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 p-3 bg-background"
                >
                  <div>
                    <h4 className="text-xs font-semibold text-foreground">
                      {d.companyName}
                    </h4>
                    <p className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                      {d.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-semibold text-foreground">
                      ${d.value.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-green-400">
                      {d.probability}% prob
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

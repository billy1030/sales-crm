"use client";

import { useCompaniesStore } from "@/stores/companies-store";

export default function TeamView() {
  const team = useCompaniesStore((state) => state.team);
  const teamFilter = useCompaniesStore((state) => state.teamFilter);
  const setTeamFilter = useCompaniesStore((state) => state.setTeamFilter);

  const filteredTeam = team.filter(
    (member) => teamFilter === "All" || member.team === teamFilter,
  );

  const totalQuota = filteredTeam.reduce((sum, m) => sum + m.pipelineTarget, 0);
  const totalAchieved = filteredTeam.reduce((sum, m) => sum + m.pipelineAchieved, 0);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Sales Team Performance
            </h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {filteredTeam.length} reps
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Quota pacing, active deal counts, and AE/SDR win rates.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs text-muted-foreground">Team Bookings</div>
          <div className="text-base font-bold font-mono text-foreground">
            ${(totalAchieved / 1000).toLocaleString()}k / ${(totalQuota / 1000).toLocaleString()}k
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex shrink-0 items-center gap-2 border-b border-border px-6 py-3 bg-muted/20">
        {(["All", "Strategic AEs", "Mid Market", "SDR Team"] as const).map(
          (t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTeamFilter(t)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                teamFilter === t
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {t}
            </button>
          ),
        )}
      </div>

      {/* Team Cards Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTeam.map((member) => {
            const attainment = Math.round(
              (member.pipelineAchieved / member.pipelineTarget) * 100,
            );

            return (
              <div
                key={member.id}
                className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary font-bold text-sm">
                    {member.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {member.role} • {member.team}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-t border-border/50 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Quota Pacing</span>
                    <span className="font-mono font-medium text-foreground">
                      {attainment}% (${Math.round(member.pipelineAchieved / 1000)}k)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        attainment >= 100 ? "bg-green-500" : "bg-primary"
                      }`}
                      style={{ width: `${Math.min(attainment, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-center border-t border-border/50 pt-3 text-xs">
                  <div className="rounded-md bg-background p-2">
                    <span className="text-muted-foreground block text-[11px]">
                      Open Deals
                    </span>
                    <span className="font-semibold text-foreground font-mono">
                      {member.dealsCount}
                    </span>
                  </div>
                  <div className="rounded-md bg-background p-2">
                    <span className="text-muted-foreground block text-[11px]">
                      Win Rate
                    </span>
                    <span className="font-semibold text-green-400 font-mono">
                      {member.winRate}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

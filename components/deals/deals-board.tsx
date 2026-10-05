"use client";

import { useState } from "react";
import { useCompaniesStore } from "@/stores/companies-store";
import { DEAL_STAGES, type Deal, type DealStage } from "@/data/deals";
import Button from "@/components/_ui/button";
import PlusIcon from "@/public/assets/images/_common/plus.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/_ui/dialog";

export default function DealsBoard() {
  const deals = useCompaniesStore((state) => state.deals);
  const updateDealStage = useCompaniesStore((state) => state.updateDealStage);
  const addDeal = useCompaniesStore((state) => state.addDeal);
  const [newDealOpen, setNewDealOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [value, setValue] = useState("");
  const [stage, setStage] = useState<DealStage>("Qualified");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const totalPipeline = deals.reduce((sum, d) => sum + d.value, 0);

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !companyName) return;

    addDeal({
      title,
      companyId: companyName.toLowerCase().replace(/\s+/g, "-"),
      companyName,
      value: Number(value) || 50000,
      stage,
      owner: "Jensen Ackles",
      probability: stage === "Won" ? 100 : 50,
      expectedCloseDate: new Date(Date.now() + 30 * 86400000)
        .toISOString()
        .split("T")[0],
      priority,
      tags: ["New Deal"],
    });

    setTitle("");
    setCompanyName("");
    setValue("");
    setNewDealOpen(false);
  };

  const getPriorityBadgeClass = (p: Deal["priority"]) => {
    switch (p) {
      case "High":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Deals Pipeline
            </h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {deals.length} active deals
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Total Pipeline Value:{" "}
            <span className="font-semibold text-foreground">
              ${(totalPipeline / 1000).toLocaleString()}k
            </span>
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setNewDealOpen(true)}
          className="gap-1.5"
        >
          <PlusIcon className="size-3.5" />
          Add Deal
        </Button>
      </div>

      {/* Kanban Board Columns */}
      <div className="flex flex-1 gap-4 overflow-x-auto p-6 scrollbar-thin">
        {DEAL_STAGES.map((colStage) => {
          const colDeals = deals.filter((d) => d.stage === colStage);
          const colValue = colDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div
              key={colStage}
              className="flex w-80 shrink-0 flex-col rounded-xl border border-border bg-card/60 p-3"
            >
              {/* Column Header */}
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {colStage}
                  </span>
                  <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
                    {colDeals.length}
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  ${Math.round(colValue / 1000)}k
                </span>
              </div>

              {/* Cards List */}
              <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto pr-1">
                {colDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="group flex flex-col rounded-lg border border-border bg-background p-3.5 shadow-sm transition hover:border-primary/50 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-primary">
                        {deal.companyName}
                      </span>
                      <span
                        className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${getPriorityBadgeClass(
                          deal.priority,
                        )}`}
                      >
                        {deal.priority}
                      </span>
                    </div>

                    <h4 className="mt-1 text-sm font-medium text-foreground line-clamp-2">
                      {deal.title}
                    </h4>

                    <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2 text-xs">
                      <span className="font-semibold font-mono text-foreground">
                        ${deal.value.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {deal.probability}% win prob
                      </span>
                    </div>

                    {/* Move stage selector */}
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-muted-foreground">
                        Stage:
                      </span>
                      <select
                        value={deal.stage}
                        onChange={(e) =>
                          updateDealStage(deal.id, e.target.value as DealStage)
                        }
                        className="rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[11px] text-foreground focus:outline-none"
                      >
                        {DEAL_STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {colDeals.length === 0 && (
                  <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 p-6 text-center text-xs text-muted-foreground">
                    No deals in {colStage}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Deal Dialog */}
      <Dialog open={newDealOpen} onOpenChange={setNewDealOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Opportunity Deal</DialogTitle>
            <DialogDescription>
              Add a new commercial deal to the sales pipeline.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateDeal} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-medium text-foreground">
                Deal Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Enterprise SLA Renewal"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">
                Company Name
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. OpenAI / Snowflake"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground">
                  Deal Value ($)
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="150000"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as "High" | "Medium" | "Low")
                  }
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">
                Initial Stage
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as DealStage)}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                {DEAL_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="muted"
                type="button"
                onClick={() => setNewDealOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create Deal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useCompaniesStore } from "@/stores/companies-store";
import { type ActivityType } from "@/data/activities";
import Button from "@/components/_ui/button";
import PlusIcon from "@/public/assets/images/_common/plus.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/_ui/dialog";

export default function ActivitiesView() {
  const activities = useCompaniesStore((state) => state.activities);
  const addActivity = useCompaniesStore((state) => state.addActivity);

  const [filterType, setFilterType] = useState<string>("all");
  const [newActivityOpen, setNewActivityOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [type, setType] = useState<ActivityType>("meeting");

  const filtered = activities.filter(
    (act) => filterType === "all" || act.type === filterType,
  );

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addActivity({
      type,
      title,
      description,
      companyName: companyName || "Internal",
      companyId: companyName.toLowerCase().replace(/\s+/g, "-"),
      userName: "Jensen Ackles",
      userAvatar: "/assets/images/_common/avatars/avatar-1.png",
    });

    setTitle("");
    setDescription("");
    setCompanyName("");
    setNewActivityOpen(false);
  };

  const getTypeIcon = (t: ActivityType) => {
    switch (t) {
      case "deal_won":
        return "🏆";
      case "meeting":
        return "📅";
      case "email":
        return "✉️";
      case "call":
        return "📞";
      case "note":
        return "📝";
      default:
        return "⚡";
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Sales Activities & Engagement
            </h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {activities.length} logged
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time interactions, meeting notes, discovery calls, and deal milestones.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setNewActivityOpen(true)}
          className="gap-1.5"
        >
          <PlusIcon className="size-3.5" />
          Log Activity
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex shrink-0 items-center gap-2 border-b border-border px-6 py-3 bg-muted/20">
        {[
          { id: "all", label: "All Activities" },
          { id: "meeting", label: "Meetings" },
          { id: "call", label: "Calls" },
          { id: "email", label: "Emails" },
          { id: "note", label: "Notes" },
          { id: "deal_won", label: "Won Deals" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterType(tab.id)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              filterType === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Activities Timeline */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {filtered.map((act) => (
            <div
              key={act.id}
              className="flex gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-border/80"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-lg shadow-inner">
                {getTypeIcon(act.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {act.title}
                    </span>
                    {act.badge && (
                      <span className="rounded bg-green-500/10 px-2 py-0.5 text-xs font-semibold text-green-400 border border-green-500/20">
                        {act.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {act.relativeTime}
                  </span>
                </div>

                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {act.description}
                </p>

                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground/80">
                  <span className="font-medium text-foreground">
                    🏢 {act.companyName}
                  </span>
                  <span>👤 Logged by {act.userName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Activity Dialog */}
      <Dialog open={newActivityOpen} onOpenChange={setNewActivityOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log Sales Activity</DialogTitle>
            <DialogDescription>
              Record an interaction or note with an account.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateActivity} className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-medium text-foreground">
                Activity Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ActivityType)}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              >
                <option value="meeting">📅 Meeting / Sync</option>
                <option value="call">📞 Phone Call</option>
                <option value="email">✉️ Email Exchange</option>
                <option value="note">📝 Internal Note</option>
                <option value="deal_won">🏆 Deal Won</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">
                Title / Summary
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Technical demo with CTO"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">
                Company / Account
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Apple"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">
                Details & Next Steps
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Discussion points, objections, and action items..."
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <Button
                variant="muted"
                type="button"
                onClick={() => setNewActivityOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Activity
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

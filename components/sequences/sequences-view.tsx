"use client";

import { useState } from "react";
import { useCompaniesStore } from "@/stores/companies-store";
import { type EmailSequence } from "@/data/sequences";
import Button from "@/components/_ui/button";
import PlusIcon from "@/public/assets/images/_common/plus.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/_ui/dialog";

export default function SequencesView() {
  const sequences = useCompaniesStore((state) => state.sequences);
  const addSequence = useCompaniesStore((state) => state.addSequence);

  const [newSeqOpen, setNewSeqOpen] = useState(false);
  const [name, setName] = useState("");
  const [targetSegment, setTargetSegment] = useState("");
  const [stepsCount, setStepsCount] = useState("4");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addSequence({
      name,
      status: "Active",
      totalEnrolled: 1,
      openRate: 50,
      replyRate: 15,
      stepsCount: Number(stepsCount) || 3,
      targetSegment: targetSegment || "General Prospects",
      creator: "Jensen Ackles",
    });

    setName("");
    setTargetSegment("");
    setNewSeqOpen(false);
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Automated Email Sequences
            </h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {sequences.length} cadences
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Multichannel drip outreach, follow-ups, and engagement reply metrics.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setNewSeqOpen(true)}
          className="gap-1.5"
        >
          <PlusIcon className="size-3.5" />
          New Sequence
        </Button>
      </div>

      {/* Sequences List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sequences.map((seq) => (
            <div
              key={seq.id}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/50"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    {seq.name}
                  </h3>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-medium border ${
                      seq.status === "Active"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {seq.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Target: {seq.targetSegment} • {seq.stepsCount} touchpoints
                </p>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/50 pt-4 text-center">
                <div className="rounded-lg bg-background p-2">
                  <div className="text-xs text-muted-foreground">Enrolled</div>
                  <div className="mt-1 text-sm font-semibold font-mono text-foreground">
                    {seq.totalEnrolled}
                  </div>
                </div>
                <div className="rounded-lg bg-background p-2">
                  <div className="text-xs text-muted-foreground">Open Rate</div>
                  <div className="mt-1 text-sm font-semibold font-mono text-green-400">
                    {seq.openRate}%
                  </div>
                </div>
                <div className="rounded-lg bg-background p-2">
                  <div className="text-xs text-muted-foreground">Reply Rate</div>
                  <div className="mt-1 text-sm font-semibold font-mono text-primary">
                    {seq.replyRate}%
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>By {seq.creator}</span>
                <span>Updated {seq.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Sequence Dialog */}
      <Dialog open={newSeqOpen} onOpenChange={setNewSeqOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Outbound Sequence</DialogTitle>
            <DialogDescription>
              Design an automated cadence for sales prospects.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-medium text-foreground">
                Sequence Title
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Q1 SaaS Founders Nurture"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">
                Target Audience / ICP
              </label>
              <input
                type="text"
                value={targetSegment}
                onChange={(e) => setTargetSegment(e.target.value)}
                placeholder="e.g. VPs of Sales & RevOps"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">
                Number of Steps
              </label>
              <input
                type="number"
                value={stepsCount}
                onChange={(e) => setStepsCount(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <Button
                variant="muted"
                type="button"
                onClick={() => setNewSeqOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Launch Sequence
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

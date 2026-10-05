"use client";

import { useState } from "react";
import { useCompaniesStore } from "@/stores/companies-store";
import Button from "@/components/_ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/_ui/dialog";

export default function CRMModals() {
  const inviteOpen = useCompaniesStore((state) => state.inviteOpen);
  const setInviteOpen = useCompaniesStore((state) => state.setInviteOpen);

  const billingOpen = useCompaniesStore((state) => state.billingOpen);
  const setBillingOpen = useCompaniesStore((state) => state.setBillingOpen);

  const helpOpen = useCompaniesStore((state) => state.helpOpen);
  const setHelpOpen = useCompaniesStore((state) => state.setHelpOpen);

  // Invite form state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Account Executive");
  const [invitedSuccess, setInvitedSuccess] = useState(false);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInvitedSuccess(true);
    setTimeout(() => {
      setInvitedSuccess(false);
      setInviteEmail("");
      setInviteOpen(false);
    }, 1200);
  };

  return (
    <>
      {/* Invite Modal */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Teammates</DialogTitle>
            <DialogDescription>
              Add sales representatives, RevOps, or SDRs to your CRM workspace.
            </DialogDescription>
          </DialogHeader>

          {invitedSuccess ? (
            <div className="py-6 text-center text-sm font-medium text-green-400">
              ✓ Invitation sent successfully!
            </div>
          ) : (
            <form onSubmit={handleSendInvite} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-medium text-foreground">
                  Teammate Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">
                  CRM Role & Permissions
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="Account Executive">Account Executive (AE)</option>
                  <option value="Sales Development Rep">Sales Development Rep (SDR)</option>
                  <option value="Sales Manager">Sales Manager / RevOps</option>
                  <option value="Read-only Stakeholder">Read-only Stakeholder</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="muted"
                  type="button"
                  onClick={() => setInviteOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Send Invite
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Billings Modal */}
      <Dialog open={billingOpen} onOpenChange={setBillingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Billing & Subscription</DialogTitle>
            <DialogDescription>
              Manage your Sales CRM Enterprise tier plan and seat licensing.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  Enterprise Growth Plan
                </span>
                <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary">
                  Trial Active
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                14 days remaining in your free trial. Unlimited contacts and pipelines.
              </p>
              <div className="mt-3 text-lg font-bold font-mono text-foreground">
                $49 / seat / month
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="muted"
                type="button"
                onClick={() => setBillingOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  alert("Billing checkout initialized!");
                  setBillingOpen(false);
                }}
              >
                Upgrade to Enterprise
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Help Modal */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Help & Support Center</DialogTitle>
            <DialogDescription>
              Documentation, keyboard shortcuts, and sales operational guides.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs">
            <div className="rounded-lg border border-border p-3">
              <span className="font-semibold text-foreground">⌨️ Keyboard Shortcuts</span>
              <p className="mt-1 text-muted-foreground">
                Press <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono">⌘ K</kbd> to open the global command palette anytime.
              </p>
            </div>

            <div className="rounded-lg border border-border p-3">
              <span className="font-semibold text-foreground">📊 Pipeline Stages</span>
              <p className="mt-1 text-muted-foreground">
                Drag deals across Kanban stages or use the stage selector to update forecast probability automatically.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="primary" onClick={() => setHelpOpen(false)}>
                Got it
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

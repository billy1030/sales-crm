"use client";

import { useState } from "react";
import { useCompaniesStore } from "@/stores/companies-store";
import { type Contact } from "@/data/contacts";
import Button from "@/components/_ui/button";
import PlusIcon from "@/public/assets/images/_common/plus.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/_ui/dialog";

export default function ContactsView() {
  const contacts = useCompaniesStore((state) => state.contacts);
  const addContact = useCompaniesStore((state) => state.addContact);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [newContactOpen, setNewContactOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addContact({
      name,
      email,
      phone: phone || "+1 (555) 000-0000",
      title: title || "Executive",
      companyId: companyName.toLowerCase().replace(/\s+/g, "-"),
      companyName: companyName || "Independent",
      owner: "Jensen Ackles",
      avatar: "/assets/images/_common/avatars/avatar-1.png",
      lastContacted: "Just now",
      status: "Active",
    });

    setName("");
    setEmail("");
    setPhone("");
    setTitle("");
    setCompanyName("");
    setNewContactOpen(false);
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Contacts Directory
            </h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {contacts.length} people
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Decision makers, champions, and enterprise stakeholders.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setNewContactOpen(true)}
          className="gap-1.5"
        >
          <PlusIcon className="size-3.5" />
          Add Contact
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-6 py-3 bg-muted/20">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search contacts, company or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <div className="flex items-center gap-1.5">
            {["All", "Customer", "Active", "Lead"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contacts Table / Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm transition hover:border-primary/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {contact.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {contact.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {contact.title}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    contact.status === "Customer"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : contact.status === "Active"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {contact.status}
                </span>
              </div>

              <div className="mt-4 space-y-1.5 border-t border-border/50 pt-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Company</span>
                  <span className="font-medium text-foreground">
                    {contact.companyName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-mono text-primary hover:underline truncate max-w-[180px]"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-mono text-muted-foreground">
                    {contact.phone}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="text-foreground">{contact.owner}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Contact Dialog */}
      <Dialog open={newContactOpen} onOpenChange={setNewContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>
              Record a new executive or team member contact.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateContact} className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-medium text-foreground">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">
                Job Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. VP of Engineering"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">
                Company
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Microsoft"
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <Button
                variant="muted"
                type="button"
                onClick={() => setNewContactOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Contact
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

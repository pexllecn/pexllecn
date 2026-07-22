// Shared demo data for the Atlas CRM, Trak Projects, and Ledger Finance apps.

/* ----------------------------------- CRM ---------------------------------- */

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  initials: string;
  stage: "New" | "Qualified" | "Proposal" | "Won" | "Lost";
  value: number;
  owner: string;
  source: string;
};

export const leads: Lead[] = [
  { id: "L-1042", name: "Olivia Martin", company: "Northwind", email: "olivia@northwind.co", initials: "OM", stage: "Qualified", value: 24000, owner: "Khaled", source: "Referral" },
  { id: "L-1043", name: "Jackson Lee", company: "Initech", email: "jackson@initech.io", initials: "JL", stage: "New", value: 8600, owner: "Sara", source: "Website" },
  { id: "L-1044", name: "Isabella Nguyen", company: "Umbrella", email: "bella@umbrella.com", initials: "IN", stage: "Proposal", value: 41200, owner: "Khaled", source: "Event" },
  { id: "L-1045", name: "William Kim", company: "Hooli", email: "will@hooli.com", initials: "WK", stage: "Won", value: 18800, owner: "Sara", source: "Referral" },
  { id: "L-1046", name: "Sofia Davis", company: "Pied Piper", email: "sofia@piedpiper.com", initials: "SD", stage: "Lost", value: 5400, owner: "Amir", source: "Cold call" },
  { id: "L-1047", name: "Liam Brown", company: "Acme Inc", email: "liam@acme.com", initials: "LB", stage: "Qualified", value: 33500, owner: "Amir", source: "Website" },
  { id: "L-1048", name: "Emma Wilson", company: "Globex", email: "emma@globex.com", initials: "EW", stage: "New", value: 12100, owner: "Khaled", source: "Event" },
  { id: "L-1049", name: "Noah Patel", company: "Soylent", email: "noah@soylent.com", initials: "NP", stage: "Proposal", value: 27750, owner: "Sara", source: "Referral" },
];

export const stageMeta: Record<Lead["stage"], { variant: "info" | "warning" | "success" | "destructive" | "secondary" }> = {
  New: { variant: "secondary" },
  Qualified: { variant: "info" },
  Proposal: { variant: "warning" },
  Won: { variant: "success" },
  Lost: { variant: "destructive" },
};

export type Company = {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  deals: number;
  contacts: { name: string; role: string; initials: string }[];
};

export const companies: Company[] = [
  {
    id: "c1", name: "Northwind", industry: "Logistics", size: "201–500", location: "Dublin, IE", deals: 3,
    contacts: [
      { name: "Olivia Martin", role: "VP Operations", initials: "OM" },
      { name: "Cian Walsh", role: "Procurement", initials: "CW" },
    ],
  },
  {
    id: "c2", name: "Umbrella", industry: "Healthcare", size: "1000+", location: "Berlin, DE", deals: 5,
    contacts: [
      { name: "Isabella Nguyen", role: "CTO", initials: "IN" },
      { name: "Marta König", role: "IT Lead", initials: "MK" },
    ],
  },
  {
    id: "c3", name: "Hooli", industry: "Technology", size: "5000+", location: "San Jose, US", deals: 2,
    contacts: [
      { name: "William Kim", role: "Head of Sales", initials: "WK" },
    ],
  },
  {
    id: "c4", name: "Globex", industry: "Manufacturing", size: "501–1000", location: "Cork, IE", deals: 4,
    contacts: [
      { name: "Emma Wilson", role: "COO", initials: "EW" },
      { name: "Tom Reilly", role: "Plant Manager", initials: "TR" },
    ],
  },
];

export const contactOptions = leads.map((l) => ({ label: `${l.name} · ${l.company}`, value: l.id }));

export type Deal = {
  id: string;
  title: string;
  company: string;
  stage: "Qualified" | "Proposal" | "Negotiation" | "Won";
  value: number;
  probability: number;
  close: string;
};

export const deals: Deal[] = [
  { id: "d1", title: "Fleet management rollout", company: "Northwind", stage: "Proposal", value: 41200, probability: 60, close: "Aug 12" },
  { id: "d2", title: "EHR integration", company: "Umbrella", stage: "Negotiation", value: 88000, probability: 80, close: "Aug 28" },
  { id: "d3", title: "Sales enablement seats", company: "Hooli", stage: "Won", value: 18800, probability: 100, close: "Jul 30" },
  { id: "d4", title: "Predictive maintenance", company: "Globex", stage: "Qualified", value: 33500, probability: 35, close: "Sep 09" },
  { id: "d5", title: "Analytics add-on", company: "Northwind", stage: "Proposal", value: 15600, probability: 55, close: "Sep 15" },
];

/* --------------------------------- PROJECTS -------------------------------- */

export type Issue = {
  id: string;
  title: string;
  type: "Feature" | "Bug" | "Chore";
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Backlog" | "Todo" | "In Progress" | "In Review" | "Done";
  assignee: string;
  initials: string;
  points: number;
  labels: string[];
};

export const issues: Issue[] = [
  { id: "TRAK-201", title: "Design new empty states", type: "Feature", priority: "Medium", status: "Todo", assignee: "Sara", initials: "SA", points: 3, labels: ["design"] },
  { id: "TRAK-202", title: "Fix sidebar focus trap", type: "Bug", priority: "Urgent", status: "In Progress", assignee: "Amir", initials: "AM", points: 2, labels: ["a11y", "frontend"] },
  { id: "TRAK-203", title: "Add OTP sign-in flow", type: "Feature", priority: "High", status: "In Review", assignee: "Khaled", initials: "KA", points: 5, labels: ["auth"] },
  { id: "TRAK-204", title: "Migrate to Tailwind v4", type: "Chore", priority: "Medium", status: "Done", assignee: "Sara", initials: "SA", points: 8, labels: ["infra"] },
  { id: "TRAK-205", title: "Command palette shortcuts", type: "Feature", priority: "Low", status: "Backlog", assignee: "Amir", initials: "AM", points: 3, labels: ["frontend"] },
  { id: "TRAK-206", title: "Billing webhook retries", type: "Bug", priority: "High", status: "Todo", assignee: "Khaled", initials: "KA", points: 5, labels: ["backend"] },
  { id: "TRAK-207", title: "Dark mode token audit", type: "Chore", priority: "Low", status: "In Progress", assignee: "Sara", initials: "SA", points: 2, labels: ["design"] },
  { id: "TRAK-208", title: "Table virtualization", type: "Feature", priority: "Medium", status: "Backlog", assignee: "Amir", initials: "AM", points: 8, labels: ["frontend", "perf"] },
];

export const priorityMeta: Record<Issue["priority"], { variant: "destructive" | "warning" | "info" | "secondary" }> = {
  Urgent: { variant: "destructive" },
  High: { variant: "warning" },
  Medium: { variant: "info" },
  Low: { variant: "secondary" },
};

export const team = [
  { name: "Khaled A.", role: "Engineering Lead", initials: "KA", status: "online", bio: "Full-stack, loves design systems.", location: "Dublin", tasks: 6 },
  { name: "Sara Ahmed", role: "Product Designer", initials: "SA", status: "online", bio: "Design systems & motion.", location: "Berlin", tasks: 4 },
  { name: "Amir Nasser", role: "Frontend Engineer", initials: "AM", status: "away", bio: "React, performance, a11y.", location: "Cairo", tasks: 7 },
  { name: "Nora Byrne", role: "QA Engineer", initials: "NB", status: "offline", bio: "Automation & release quality.", location: "Cork", tasks: 3 },
];

export const activity = [
  { who: "Sara Ahmed", initials: "SA", action: "moved", target: "TRAK-204 to Done", time: "12m ago" },
  { who: "Amir Nasser", initials: "AM", action: "commented on", target: "TRAK-202", time: "38m ago" },
  { who: "Khaled A.", initials: "KA", action: "opened", target: "TRAK-206", time: "1h ago" },
  { who: "Nora Byrne", initials: "NB", action: "closed", target: "TRAK-198", time: "3h ago" },
  { who: "Sara Ahmed", initials: "SA", action: "assigned", target: "TRAK-201 to herself", time: "5h ago" },
];

export const releases = [
  {
    version: "v2.4.0", date: "Jul 18, 2026", status: "Released",
    notes: ["OTP sign-in flow", "Command palette", "Kanban board rework"],
  },
  {
    version: "v2.3.1", date: "Jul 04, 2026", status: "Released",
    notes: ["Fix sidebar focus trap", "Dark mode token audit", "Table pagination"],
  },
  {
    version: "v2.5.0", date: "Aug 01, 2026", status: "Planned",
    notes: ["Table virtualization", "Realtime presence", "Saved filters"],
  },
];

/* --------------------------------- FINANCE --------------------------------- */

export type Txn = {
  id: string;
  merchant: string;
  category: "Income" | "Software" | "Travel" | "Food" | "Payroll" | "Office";
  date: string;
  amount: number;
  account: string;
  status: "Cleared" | "Pending";
};

export const transactions: Txn[] = [
  { id: "t1", merchant: "Stripe payout", category: "Income", date: "Jul 22", amount: 12480.0, account: "Operating", status: "Cleared" },
  { id: "t2", merchant: "Vercel", category: "Software", date: "Jul 21", amount: -120.0, account: "Operating", status: "Cleared" },
  { id: "t3", merchant: "Aer Lingus", category: "Travel", date: "Jul 20", amount: -540.5, account: "Cards", status: "Pending" },
  { id: "t4", merchant: "Payroll — July", category: "Payroll", date: "Jul 19", amount: -28400.0, account: "Payroll", status: "Cleared" },
  { id: "t5", merchant: "WeWork", category: "Office", date: "Jul 18", amount: -2200.0, account: "Operating", status: "Cleared" },
  { id: "t6", merchant: "Deliveroo", category: "Food", date: "Jul 18", amount: -86.3, account: "Cards", status: "Cleared" },
  { id: "t7", merchant: "Figma", category: "Software", date: "Jul 17", amount: -45.0, account: "Operating", status: "Cleared" },
  { id: "t8", merchant: "Client — Umbrella", category: "Income", date: "Jul 16", amount: 8800.0, account: "Operating", status: "Cleared" },
];

export const accounts = [
  { id: "a1", name: "Operating", number: "•• 4021", balance: 84210.55, type: "Checking", currency: "EUR" },
  { id: "a2", name: "Payroll", number: "•• 7788", balance: 31200.0, type: "Checking", currency: "EUR" },
  { id: "a3", name: "Reserve", number: "•• 1150", balance: 150000.0, type: "Savings", currency: "EUR" },
  { id: "a4", name: "Cards", number: "•• 9902", balance: -3420.8, type: "Credit", currency: "EUR" },
];

export const budgets = [
  { name: "Software & SaaS", spent: 1840, limit: 2500 },
  { name: "Travel", spent: 3120, limit: 3000 },
  { name: "Office & Rent", spent: 2200, limit: 4000 },
  { name: "Marketing", spent: 950, limit: 2000 },
];

export const invoices = [
  { id: "INV-2041", client: "Umbrella", amount: 8800, status: "Paid", due: "Jul 16" },
  { id: "INV-2042", client: "Northwind", amount: 12400, status: "Sent", due: "Aug 02" },
  { id: "INV-2043", client: "Hooli", amount: 4600, status: "Overdue", due: "Jul 10" },
  { id: "INV-2044", client: "Globex", amount: 15600, status: "Draft", due: "Aug 15" },
  { id: "INV-2045", client: "Initech", amount: 3200, status: "Sent", due: "Aug 09" },
];

export const invoiceStatusMeta: Record<string, "success" | "info" | "destructive" | "secondary"> = {
  Paid: "success",
  Sent: "info",
  Overdue: "destructive",
  Draft: "secondary",
};

export const recipients = [
  { label: "Northwind Ltd · IE29 AIBK", value: "northwind" },
  { label: "Umbrella GmbH · DE89 3704", value: "umbrella" },
  { label: "Hooli Inc · US 021000", value: "hooli" },
  { label: "Globex Corp · IE64 BOFI", value: "globex" },
  { label: "Sara Ahmed · DE12 5001", value: "sara" },
];

export const apps = [
  {
    href: "/dashboard",
    name: "Workspace",
    tagline: "The original pexllecn starter — dashboard, chat, inbox, kanban, tables and more.",
    accent: "neutral",
  },
  {
    href: "/crm",
    name: "Atlas CRM",
    tagline: "Leads, deals, contacts and pipeline — a top-navigation sales workspace.",
    accent: "blue",
  },
  {
    href: "/projects",
    name: "Trak Projects",
    tagline: "Boards, backlog, sprints and releases — a floating-sidebar project tracker.",
    accent: "violet",
  },
  {
    href: "/finance",
    name: "Ledger Finance",
    tagline: "Accounts, transactions, budgets and invoices — an inset-sidebar banking app.",
    accent: "emerald",
  },
];

export function formatCurrency(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("en-IE", {
    currency,
    style: "currency",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

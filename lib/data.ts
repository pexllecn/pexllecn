export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: "Active" | "Inactive";
};

export const users: User[] = [
  { id: 1, name: "Candice Schiner", company: "Dell", role: "Frontend Developer", verified: false, status: "Active" },
  { id: 2, name: "John Doe", company: "TechCorp", role: "Backend Developer", verified: true, status: "Active" },
  { id: 3, name: "Alice Johnson", company: "WebTech", role: "UI Designer", verified: true, status: "Active" },
  { id: 4, name: "David Smith", company: "Innovate Inc.", role: "Fullstack Developer", verified: false, status: "Inactive" },
  { id: 5, name: "Emma Wilson", company: "TechGuru", role: "Product Manager", verified: true, status: "Active" },
  { id: 6, name: "James Brown", company: "CodeGenius", role: "QA Engineer", verified: false, status: "Active" },
  { id: 7, name: "Laura White", company: "SoftWorks", role: "UX Designer", verified: true, status: "Active" },
  { id: 8, name: "Michael Lee", company: "DevCraft", role: "DevOps Engineer", verified: false, status: "Active" },
  { id: 9, name: "Olivia Green", company: "WebSolutions", role: "Frontend Developer", verified: true, status: "Active" },
  { id: 10, name: "Robert Taylor", company: "DataTech", role: "Data Analyst", verified: false, status: "Active" },
];

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  job: string;
};

export const employees: Employee[] = [
  { id: 1, firstName: "Aoife", lastName: "Byrne", email: "aoife.byrne@example.com", phone: "+353 85 123 4567", city: "Dublin", country: "Ireland", job: "Account Manager" },
  { id: 2, firstName: "Liam", lastName: "Murphy", email: "liam.murphy@example.com", phone: "+353 86 234 5678", city: "Cork", country: "Ireland", job: "Software Engineer" },
  { id: 3, firstName: "Saoirse", lastName: "Kelly", email: "saoirse.kelly@example.com", phone: "+353 87 345 6789", city: "Galway", country: "Ireland", job: "Product Designer" },
  { id: 4, firstName: "Karim", lastName: "Haddad", email: "karim.haddad@example.com", phone: "+971 50 456 7890", city: "Dubai", country: "UAE", job: "Sales Lead" },
  { id: 5, firstName: "Nora", lastName: "Schmidt", email: "nora.schmidt@example.com", phone: "+49 151 567 8901", city: "Berlin", country: "Germany", job: "Data Scientist" },
  { id: 6, firstName: "Tomás", lastName: "O'Brien", email: "tomas.obrien@example.com", phone: "+353 83 678 9012", city: "Limerick", country: "Ireland", job: "Support Specialist" },
  { id: 7, firstName: "Amira", lastName: "Nasser", email: "amira.nasser@example.com", phone: "+20 100 789 0123", city: "Cairo", country: "Egypt", job: "Marketing Manager" },
  { id: 8, firstName: "Jack", lastName: "Doyle", email: "jack.doyle@example.com", phone: "+353 89 890 1234", city: "Waterford", country: "Ireland", job: "QA Engineer" },
];

export type Product = {
  id: number;
  title: string;
  price: string;
  location: string;
  category: "electronics" | "cars" | "realestate" | "clothes" | "other";
  condition: "New" | "Used";
  postedAt: string;
};

export const products: Product[] = [
  { id: 1, title: "MacBook Pro 2020", price: "€2,200", location: "Dublin", category: "electronics", condition: "Used", postedAt: "2 hours ago" },
  { id: 2, title: "iPhone 15 Pro Max", price: "€1,200", location: "Cork", category: "electronics", condition: "New", postedAt: "5 hours ago" },
  { id: 3, title: "iPad 2019", price: "€800", location: "Lucan", category: "electronics", condition: "Used", postedAt: "1 day ago" },
  { id: 4, title: "Apple iMac 27-inch", price: "€4,200", location: "Galway", category: "electronics", condition: "New", postedAt: "1 day ago" },
  { id: 5, title: "VW Golf 2021", price: "€24,500", location: "Limerick", category: "cars", condition: "Used", postedAt: "2 days ago" },
  { id: 6, title: "Tesla Model 3", price: "€38,900", location: "Dublin", category: "cars", condition: "Used", postedAt: "3 days ago" },
  { id: 7, title: "2-bed apartment, city centre", price: "€1,950/mo", location: "Dublin 2", category: "realestate", condition: "New", postedAt: "4 days ago" },
  { id: 8, title: "Vintage denim jacket", price: "€45", location: "Cork", category: "clothes", condition: "Used", postedAt: "5 days ago" },
  { id: 9, title: "Road bike — Trek Émonda", price: "€1,100", location: "Kilkenny", category: "other", condition: "Used", postedAt: "1 week ago" },
];

export type Mail = {
  id: string;
  from: string;
  initials: string;
  subject: string;
  preview: string;
  body: string[];
  date: string;
  read: boolean;
  labels: string[];
};

export const mails: Mail[] = [
  {
    id: "m1",
    from: "William Smith",
    initials: "WS",
    subject: "Meeting tomorrow",
    preview: "Hi, let's have a meeting tomorrow to discuss the project…",
    body: [
      "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the details and have some ideas I'd like to share.",
      "Please come prepared with any questions or insights you may have. Looking forward to seeing you!",
      "Best regards, William",
    ],
    date: "09:34",
    read: false,
    labels: ["meeting", "work"],
  },
  {
    id: "m2",
    from: "Alice Smith",
    initials: "AS",
    subject: "Re: Project update",
    preview: "Thank you for the project update. It looks great!",
    body: [
      "Thank you for the project update. It looks great! I've reviewed the report and the progress is impressive.",
      "The team has done a fantastic job, and I appreciate the hard work everyone has put in.",
      "Thanks again, Alice",
    ],
    date: "08:12",
    read: false,
    labels: ["work"],
  },
  {
    id: "m3",
    from: "Bob Johnson",
    initials: "BJ",
    subject: "Weekend plans",
    preview: "Any plans for the weekend? I was thinking of going hiking…",
    body: [
      "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun.",
      "If you're interested, let me know and we can plan the details.",
      "Cheers, Bob",
    ],
    date: "Yesterday",
    read: true,
    labels: ["personal"],
  },
  {
    id: "m4",
    from: "Emily Davis",
    initials: "ED",
    subject: "Re: Question about budget",
    preview: "I have a question about the budget for the upcoming project…",
    body: [
      "I have a question about the budget for the upcoming project. It seems there's a discrepancy in the allocation of resources.",
      "I've reviewed the budget report and identified a few areas where we might be able to optimise our spending.",
      "Thanks, Emily",
    ],
    date: "Yesterday",
    read: true,
    labels: ["work", "budget"],
  },
  {
    id: "m5",
    from: "Michael Wilson",
    initials: "MW",
    subject: "Important announcement",
    preview: "I have an important announcement to make during our team meeting…",
    body: [
      "I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming quarter.",
      "Please be prepared to discuss how this change may impact your respective areas of work.",
      "Regards, Michael",
    ],
    date: "Mon",
    read: true,
    labels: ["meeting", "important"],
  },
];

export type ChatThread = {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: { fromMe: boolean; text: string; time: string }[];
};

export const chats: ChatThread[] = [
  {
    id: "c1",
    name: "Sofia Davis",
    initials: "SD",
    lastMessage: "Perfect, see you then!",
    time: "09:41",
    unread: 2,
    online: true,
    messages: [
      { fromMe: false, text: "Hi, how has your day been? I'm reviewing the new designs.", time: "09:12" },
      { fromMe: true, text: "Pretty good! I just pushed the latest components to the branch.", time: "09:15" },
      { fromMe: false, text: "Nice — the sidebar looks much cleaner now.", time: "09:20" },
      { fromMe: true, text: "Agreed. Want to hop on a quick call at 2pm to review the rest?", time: "09:36" },
      { fromMe: false, text: "Perfect, see you then!", time: "09:41" },
    ],
  },
  {
    id: "c2",
    name: "Jackson Lee",
    initials: "JL",
    lastMessage: "Can you send the invoice?",
    time: "08:03",
    unread: 0,
    online: false,
    messages: [
      { fromMe: false, text: "Morning! Quick one — can you send the invoice?", time: "08:03" },
      { fromMe: true, text: "On it, you'll have it before lunch.", time: "08:10" },
    ],
  },
  {
    id: "c3",
    name: "Olivia Martin",
    initials: "OM",
    lastMessage: "The deploy went out fine 🎉",
    time: "Yesterday",
    unread: 0,
    online: true,
    messages: [
      { fromMe: true, text: "Did the deploy go through okay?", time: "17:40" },
      { fromMe: false, text: "The deploy went out fine 🎉", time: "17:52" },
    ],
  },
  {
    id: "c4",
    name: "William Kim",
    initials: "WK",
    lastMessage: "Let's sync on the roadmap next week.",
    time: "Mon",
    unread: 0,
    online: false,
    messages: [
      { fromMe: false, text: "Let's sync on the roadmap next week.", time: "Mon" },
    ],
  },
];

export type KanbanTask = {
  id: string;
  title: string;
  description: string;
  tag: string;
  priority: "Low" | "Medium" | "High";
};

export type KanbanColumn = {
  id: "todo" | "in-progress" | "done";
  title: string;
  tasks: KanbanTask[];
};

export const kanbanColumns: KanbanColumn[] = [
  {
    id: "todo",
    title: "Todo",
    tasks: [
      { id: "t1", title: "Design empty states", description: "Cover search, tables, and inbox with friendly empty states.", tag: "Design", priority: "Medium" },
      { id: "t2", title: "Write onboarding email", description: "Draft the welcome sequence for new workspaces.", tag: "Marketing", priority: "Low" },
      { id: "t3", title: "Audit color contrast", description: "Check all badge and button variants against WCAG AA.", tag: "A11y", priority: "High" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      { id: "t4", title: "Customers table filters", description: "Status and plan filters with URL state.", tag: "Frontend", priority: "High" },
      { id: "t5", title: "Billing webhooks", description: "Handle invoice.paid and subscription.updated events.", tag: "Backend", priority: "Medium" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "t6", title: "Dark mode pass", description: "Token review across all pages in dark theme.", tag: "Design", priority: "Medium" },
      { id: "t7", title: "Sidebar keyboard shortcut", description: "Cmd+B toggles the sidebar.", tag: "Frontend", priority: "Low" },
    ],
  },
];

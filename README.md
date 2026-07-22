# Pexllecn

Four complete applications built from scratch with [coss ui](https://coss.com/ui) — the design system of Cal.com, on [Base UI](https://base-ui.com) and Tailwind CSS v4. **44 pages**, composed exclusively from coss ui elements, exercising **every one of the 53 components** in the library in a real product context. No Radix, no NextUI, no bespoke forks — one design system end to end.

The landing page at `/` is an app switcher into the four apps below. Each app uses a different navigation shell so the coss `Sidebar` variants and a top-nav layout are all demonstrated.

## Apps

### Workspace — `/dashboard` (collapsible sidebar + ⌘K palette)

The original pexllecn starter, rebuilt. Home, overview (stat cards, chart, recent sales), products, ad details, chat, inbox, users table, employees table, profile stepper, kanban, settings (tabbed), and an empty-state page. Breadcrumb header, notifications menu, dark-mode toggle. Sign-in at `/signin` (email → OTP step).

### Atlas CRM — `/crm` (top navigation)

| Route | Highlights |
| --- | --- |
| `/crm` | Dashboard — frame, meters, tooltip cards |
| `/crm/leads` | Table — toolbar, popover filter, checkbox-group, pagination |
| `/crm/lead-detail` | Preview-card, tabs, group, kbd, timeline |
| `/crm/contacts` | Autocomplete jump-to, table |
| `/crm/companies` | Accordion of accounts, collapsible enrichment |
| `/crm/deals` | Toggle-group view switch, right-click context menus |
| `/crm/schedule` | Calendar, popover quick-add |
| `/crm/reports` | Tabs, meters, funnel |
| `/crm/import` | Form, fieldset, number-field, radio-group, spinner |
| `/crm/settings` | Form, toggle, toggle-group, switches |

### Trak Projects — `/projects` (floating sidebar)

Overview (frame), board (context menus), backlog (collapsible groups + number-field capacity), sprint (progress + table), roadmap (toggle-group timeline/grid), issues (combobox filter), docs (skeleton loading + rich-text toolbar), releases (accordion), activity (preview-card avatars), team (drawer profiles).

### Ledger Finance — `/finance` (inset sidebar)

Overview (meters), accounts (group actions), transactions (popover filter + pagination), transfer (combobox + number-field form), cards (toggle reveal/freeze + slider limit), invoices (drawer details), budgets (meter + slider + dialog), analytics (tabs + toggle-group), recipients (multi-select combobox chips), settings (OTP payment PIN, switches).

## Stack

- **Next.js 15** (App Router) + **React 19**
- **coss ui** — all 53 registry components vendored under `components/ui/` (MIT-licensed, from `apps/ui` of [cosscom/coss](https://github.com/cosscom/coss))
- **Base UI** primitives (`@base-ui/react`)
- **Tailwind CSS v4** — the full coss ui theme lives in `app/globals.css` (CSS variables for light/dark)
- **next-themes** for dark mode
- **Cal Sans 2.0** + **Paper Mono** — the exact fonts coss.com/ui uses, self-hosted in `lib/fonts/` (both SIL OFL 1.1)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Adding more coss ui components

The project is registry-compatible. With network access to coss.com:

```bash
npx shadcn@latest add @coss/<component>
```

Components land in `components/ui/` using the aliases this app already uses (`@/components/ui`, `@/lib/utils`, `@/hooks`).

## Design language

The theme is the untouched coss ui neutral theme:

- Neutral palette built from alpha-blended black/white overlays so surfaces adapt naturally in both modes
- `0.625rem` base radius, subtle `shadow-xs` elevation with 1px inset highlights on primary buttons
- Semantic tokens: `background`, `card`, `popover`, `sidebar`, `muted`, `accent`, plus status colors (`success`, `warning`, `info`, `destructive`) and `chart-1..5`

To rebrand, edit the CSS variables in `app/globals.css` — components pick everything up from tokens.

## Credits

- [coss ui](https://coss.com/ui) components © Cal.com, Inc. — MIT licensed (`apps/ui` of [cosscom/coss](https://github.com/cosscom/coss))
- Not affiliated with or endorsed by Cal.com; this is a community project using their open-source registry components.

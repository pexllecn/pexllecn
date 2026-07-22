# Pexllecn

A complete Next.js starter rebuilt from scratch with [coss ui](https://coss.com/ui) — the design system of Cal.com, built on top of [Base UI](https://base-ui.com) and styled with Tailwind CSS v4.

Every page is composed exclusively from coss ui elements. No Radix, no NextUI, no bespoke component forks — one design system end to end.

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing — hero, feature cards, theme toggle |
| `/signin` | Split-screen sign-in — email + OTP code step, social buttons |
| `/dashboard` | Home — greeting, goal progress, workspace shortcuts |
| `/dashboard/overview` | Overview — stat cards, revenue chart, recent sales, tabs, dialog, toasts |
| `/dashboard/products` | Products — category tabs, search, listing cards |
| `/dashboard/addetails` | Ad details — gallery, price panel, seller card, featured ads |
| `/dashboard/chat` | Chat — conversation list, message thread, composer |
| `/dashboard/inbox` | Inbox — mail list with filters, reading pane, reply box |
| `/dashboard/user` | Users — searchable table, filters, add-user sheet, row menus |
| `/dashboard/employee` | Employees — team directory table, add-employee dialog |
| `/dashboard/profile` | Profile — three-step stepper form with progress |
| `/dashboard/kanban` | Kanban — columns, task cards, new-task dialog, move/delete actions |
| `/dashboard/settings` | Settings — general, appearance, display, and notification tabs |
| `/dashboard/emptypage` | Empty state — blank canvas page |

The dashboard shell is the coss ui `Sidebar` (collapsible to icons, mobile sheet, cookie persistence) with breadcrumb header, notifications menu, dark-mode toggle, and a ⌘K command palette.

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

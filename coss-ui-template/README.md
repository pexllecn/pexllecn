# coss ui template

A full-pages Next.js template built with [coss ui](https://coss.com/ui) — the design system of Cal.com, built on top of [Base UI](https://base-ui.com) and styled with Tailwind CSS v4.

This template is fully self-contained: it can be copied out into its own repository as-is.

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page — hero, feature cards, theme toggle |
| `/login` | Sign-in page — card, fields, social buttons, checkbox |
| `/dashboard` | Overview — stat cards, revenue chart, recent sales, tabs, dialog, toasts |
| `/dashboard/customers` | Customers — searchable/filterable table, badges, row menus, empty state |
| `/dashboard/settings` | Settings — profile form, notification switches, danger zone with alert dialog |

The dashboard shell uses the coss ui `Sidebar` (collapsible to icons, mobile sheet, persisted via cookie) with breadcrumb header and dark-mode toggle.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **coss ui** components vendored under `components/ui/` (53 components, MIT-licensed, from the coss ui registry)
- **Base UI** primitives (`@base-ui/react`)
- **Tailwind CSS v4** — the full coss ui theme lives in `app/globals.css` (CSS variables for light/dark)
- **next-themes** for dark mode, **Inter Variable** + **Geist Mono** fonts (self-hosted via npm, no network fetch at build)

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

Components land in `components/ui/` using the same aliases this template already uses (`@/components/ui`, `@/lib/utils`, `@/hooks`).

## Design language

The theme is the untouched coss ui neutral theme:

- Neutral palette built from alpha-blended black/white overlays (`--alpha(var(--color-black) / 4%)`) so surfaces adapt naturally in both modes
- `0.625rem` base radius, subtle `shadow-xs` elevation with 1px inset highlights on primary buttons
- Semantic tokens: `background`, `card`, `popover`, `sidebar`, `muted`, `accent`, plus status colors (`success`, `warning`, `info`, `destructive`) and `chart-1..5`

To rebrand, edit the CSS variables in `app/globals.css` — components pick everything up from tokens.

## Credits

- [coss ui](https://coss.com/ui) components © Cal.com, Inc. — MIT licensed (`apps/ui` of [cosscom/coss](https://github.com/cosscom/coss))
- Not affiliated with or endorsed by Cal.com; this is a community template using their open-source registry components.

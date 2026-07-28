# Angular Dashboard Assignment

Frontend assignment built with Angular 17, Angular Material, and JSON Server. It's actually three separate modules living in one app: a loan application dashboard, a leads dashboard, and a mobile KYC flow. Used it as a chance to cover a decent spread of stuff — standalone components, reactive forms, dialogs, filtering/sorting, and the loading/empty/error states that usually get skipped in demos.

## Stack

- Angular 17 / TypeScript
- Angular Material
- RxJS
- Reactive Forms
- JSON Server (mock API)

## Running it

```bash
npm install
npm run dev      # starts json-server on http://localhost:3000
ng serve          # http://localhost:4200
```

Start `npm run dev` before `ng serve` — the app expects the mock API to be up. If it's not reachable, the Loan Dashboard falls back to local demo data so it's still usable.

## Routes

| Route | Module |
|---|---|
| `/dashboard` | Loan Application Dashboard |
| `/leads` | Leads Dashboard |
| `/kyc` | KYC Mobile View |

Anything unmatched redirects to `/dashboard`.

## Loan Application Dashboard

Summary cards at the top (total applications, total loan amount, approval rate, average credit score), then a table of applications below.

Table supports search, filtering by status and loan type, sorting by amount and applied date, and pagination.

Clicking a row opens a dialog with the full application — details, credit score gauge, and a status dropdown with a confirmation step before it "updates" (UI only, doesn't persist past the mock API).

Handles loading, empty results, and the API being down — in which case there's a button to load local demo data instead.

## Leads Dashboard

CRM-style view for managing leads. Same general shape as the loan dashboard: summary cards (total, new, qualified, converted), a searchable/filterable/sortable table, status chips, and a download menu for exporting to Excel. Responsive layout.

## KYC Mobile View

Built mobile-first since KYC forms are usually filled out on a phone. Personal info form with reactive forms + dynamic validation, document upload, and a dialog for picking a secondary ID document when needed.

## Project structure

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   └── models/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── leads-dashboard/
│   │   └── kyc/
│   ├── shared/
│   └── app.routes.ts
├── assets/
│   └── db.json
└── styles.scss
```

## A few decisions worth explaining

**Dialog over side panel for details** — viewing/updating an application is a quick, focused interaction, doesn't need its own route or panel state to manage.

**Tables over cards** — loan applications and leads both have several fields worth comparing side by side (amount, status, dates), and tables handle that plus sorting/pagination a lot more naturally than a card grid would.

**Local data fallback** — didn't want the whole thing to hinge on json-server staying up, so if the mock API call fails there's a manual option to load local demo data instead.

## What's not here yet

No backend persistence, auth, or server-side pagination — this was scoped as a frontend assignment so those were left out on purpose. Other things I'd add given more time: CSV/better Excel export, dark mode, unit + e2e tests, and some actual charts on the analytics side instead of just numbers in cards.

---
Anmol Sharma
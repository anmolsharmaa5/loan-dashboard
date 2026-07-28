# Loan Application Dashboard

A frontend assignment — building out a loan dashboard in Angular 17 + Angular Material to show off the usual dashboard stuff: filtering, sorting, summary cards, dialogs, and handling the not-so-fun states (loading, empty, API down).

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

Run `npm run dev` first — the app expects the mock API to be up. If it's not reachable, there's a fallback to local demo data so you're not stuck staring at an error screen.

## What's in here

- Dashboard with summary cards — total applications, total loan amount, approval rate, average credit score
- Applications table with filtering (status, loan type) and sorting (amount, applied date)
- Click a row to open a dialog with full application details + credit score viz
- Status update from the dialog with a confirmation step (UI only, doesn't persist beyond the mock API)
- Loading / empty / error states handled properly instead of just happy-path

## Project structure

```
src/
├── app/
│   ├── core/
│   │   └── services/
│   ├── features/
│   ├── models/
├── assets/
└── db.json
```

## A few decisions worth explaining

**Dialog over side panel for details** — the detail view is really just "look at this application, maybe update its status." A dialog keeps it fast and doesn't require building out routing/panel state for what's essentially a quick lookup.

**Table over cards for the list** — with loan amount, status, and applied date all needing to be scanned and compared across rows, a table just works better than cards here. Sortable columns stay aligned, easier to eyeball.

**Local data fallback** — didn't want the whole demo to hinge on json-server staying up. If the API call fails, there's a button to load local demo data instead so the app's still usable/reviewable.

## Notes

Status updates are UI-only for now — no persistence layer beyond what json-server gives you for free, so a refresh will reset things. Wasn't in scope for this assignment but would be the obvious next step alongside real auth and pagination on the applications list.

---
Anmol Sharma
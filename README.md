# Loan Application Dashboard

This project is a Loan Application Dashboard built using Angular 17 and Angular Material.

It was developed as part of a frontend assignment to demonstrate common dashboard functionality such as filtering, sorting, summary cards, dialogs, and handling different application states like loading, empty results, and API failures.

---

## Features

- Dashboard with summary cards
  - Total Applications
  - Total Loan Amount
  - Approval Rate
  - Average Credit Score
- View loan applications in a Material table
- Filter applications by Loan Status and Loan Type
- Sort applications by Loan Amount and Applied Date
- View complete application details in a dialog
- Credit score visualization
- Update application status with a confirmation dialog (UI only)
- Loading, empty, and error state handling
- Local demo data fallback when the mock API is unavailable

---

## Tech Stack

- Angular 17
- TypeScript
- Angular Material
- RxJS
- Reactive Forms
- JSON Server

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the mock API

```bash
npm run dev
```

The JSON Server will start on:

```
http://localhost:3000
```

### 3. Run the Angular application

```bash
ng serve
```

Open your browser and navigate to:

```
http://localhost:4200
```

---

## Project Structure

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

---

## Design Notes

### Application Details

I used a modal dialog for the application details instead of a side panel. The detail view is intended for quick inspection and a simple status update, so a dialog keeps users on the dashboard without interrupting their workflow.

### Mock API Fallback

If the JSON Server is unavailable, the application displays an option to load local demo data. This allows the dashboard to remain functional and makes it easier to evaluate the application without requiring the backend to be running.

---

## Implemented Functionality

- Loan application list
- Dashboard summary cards
- Client-side filtering
- Client-side sorting
- Loan detail dialog
- Credit score visualization
- Status update with confirmation
- Loading state
- Empty state
- Error handling
- Mock API integration with local data fallback


## Author

**Anmol Sharma**
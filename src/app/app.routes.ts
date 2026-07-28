import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent),
    },
    {
        path: 'leads',
        loadComponent: () => import('./features/leads-dashboard/leads-dashboard.component').then(m => m.LeadsDashboardComponent),
    },
    {
        path: 'kyc',
        loadComponent: () => import('./features/kyc/kyc.component').then(m => m.KycComponent),
    },
];

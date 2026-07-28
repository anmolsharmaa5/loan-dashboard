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
    // Lead Dashboard for Assignment part 2
    {
        path: 'leads',
        loadComponent: () => import('./features/leads-dashboard/leads-dashboard.component').then(m => m.LeadsDashboardComponent),
    },
    // KYC Mobile View for Assignment part 2
    {
        path: 'kyc',
        loadComponent: () => import('./features/kyc/kyc.component').then(m => m.KycComponent),
    },
    // Wildcard route - redirect unknown URLs to dashboard
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];

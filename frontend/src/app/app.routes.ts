import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login'),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register'),
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home'),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

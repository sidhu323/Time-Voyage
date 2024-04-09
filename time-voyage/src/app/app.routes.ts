import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'timeline',
    loadComponent: () => import('./ui/timeline/timeline.component'),
  },
  {
    path: '',
    redirectTo: 'timeline',
    pathMatch: 'full',
  },
];

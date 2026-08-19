import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { langGuard } from './core/guards/lang.guard';
import { LocaleService } from './core/services/locale.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => inject(LocaleService).locale(),
  },
  {
    path: ':lang',
    canActivate: [langGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
      },
    ],
  },
];

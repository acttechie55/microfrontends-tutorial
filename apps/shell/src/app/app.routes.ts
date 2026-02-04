import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-profile',
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      loadRemoteModule('user-profile', './routes').then((m) => m.routes),
  },
  {
    path: 'analytics',
    loadChildren: () =>
      loadRemoteModule('analytics', './routes').then((m) => m.routes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      loadRemoteModule('settings', './routes').then((m) => m.routes),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      loadRemoteModule('notifications', './routes').then((m) => m.routes),
  },
];

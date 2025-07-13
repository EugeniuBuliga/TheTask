import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'ping',
    loadChildren: () => import('./features/ping/ping.routes').then((m) => m.pingRoutes)
  },
  {
    path: '',
    redirectTo: 'ping',
    pathMatch: 'full',
  }
];

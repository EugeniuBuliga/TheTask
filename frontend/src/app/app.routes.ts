import {Routes} from '@angular/router';
import {AuthGuard} from './core/auth/auth.guard';
import {PingComponent} from './features/ping/ping.component';
import {Login} from './core/auth/pages/login/login';
import {LoginGuard} from './core/auth/pages/login/login.guard';
import {Register} from './core/auth/pages/register/register';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ping',
    pathMatch: 'full',
  },
  {
    path: 'ping',
    component: PingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: Register,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: Login,
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

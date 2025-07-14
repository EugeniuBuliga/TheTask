import {Routes} from '@angular/router';
import {AuthGuard} from './features/auth/auth.guard';
import {PingComponent} from './features/ping/ping.component';
import {LoginComponent} from './features/login/login.component';
import {LoginGuard} from './features/login/login.guard';
import {RegisterComponent} from './features/register/register.component';

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
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

import {Routes} from '@angular/router';
import {AuthGuard} from './core/auth/auth.guard';
import {PingComponent} from './features/ping/ping.component';
import {Login} from './core/auth/pages/login/login';
import {LoginGuard} from './core/auth/pages/login/login.guard';
import {Register} from './core/auth/pages/register/register';
import {TodoList} from './features/todo-list/todo-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: TodoList,
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

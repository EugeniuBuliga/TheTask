import {Component, computed, effect, inject} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    MatButton
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private auth = inject(AuthService);

  user = this.auth.user;
  isLoggedIn = this.auth.isLoggedIn;

  accountOptions = computed(() => [
    {
      name: 'Logout',
      link: '/',
      visible: this.isLoggedIn(),
      action: () => this.auth.logout()
    },
    {
      name: 'Register',
      link: '/register',
      visible: !this.isLoggedIn()
    },
    {
      name: 'Login',
      link: '/login',
      visible: !this.isLoggedIn()
    }
  ]);

}

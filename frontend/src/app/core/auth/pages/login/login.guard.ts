import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/ping';
      return false;
    }
    return true;
  }
}

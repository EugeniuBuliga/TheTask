import {Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/api`;

  readonly isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));
  readonly user = signal<{ name: string } | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn.set(true);
      this.me().subscribe();
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/login`, { username, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.isLoggedIn.set(true);

        const payload = this.decodeJwtPayload(res.token);
        const name =  res.name;

        if (name) {
          this.user.set({ name });
        }
      })
    );
  }


  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.user.set(null);

    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/register`, { username, password });
  }

  decodeJwtPayload(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  me(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Auth/me`).pipe(
      tap((res: any) => {
        if (res?.name) {
          this.user.set({ name: res.name });
        }
      })
    );
  }
}

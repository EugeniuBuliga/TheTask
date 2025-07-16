import {Injectable, signal, effect, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HealthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/api`;
  readonly status = signal<'loading' | 'online' | 'offline'>('loading');

  constructor() {
    this.checkHealth();
    setInterval(() => this.checkHealth(), 30000);
  }

  checkHealth() {
    this.status.set('loading');
    this.http.get(`${this.apiUrl}/Auth/ping`, { responseType: 'text' }).subscribe({
      next: res => {
        if (res === 'pong') this.status.set('online');
        else this.status.set('offline');
      },
      error: () => this.status.set('offline')
    });
  }
}

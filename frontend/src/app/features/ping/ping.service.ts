import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PingResponse} from './ping.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PingService {
  constructor(private http: HttpClient) {}

  ping(): Observable<PingResponse> {
    return this.http.get<PingResponse>(`${environment.apiBaseUrl}/api/User/ping`);
  }
}

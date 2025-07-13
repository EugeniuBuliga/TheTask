import { Component } from '@angular/core';
import { PingService } from './ping.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  imports: [CommonModule]
})
export class PingComponent {
  result: string = '';

  constructor(private pingService: PingService) {}

  doPing() {
    this.pingService.ping().subscribe({
      next: (res) => (this.result = res.message),
      error: (err) => (this.result = 'Error: ' + err.message),
    });
  }
}

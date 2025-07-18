import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './core/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'TheTask';
}

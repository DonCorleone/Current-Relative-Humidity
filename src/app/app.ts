import { Component, signal } from '@angular/core';
import { Humidity } from './humidity/humidity';

@Component({
  selector: 'app-root',
  imports: [Humidity],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-22');
}

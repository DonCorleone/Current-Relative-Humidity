import { Component, computed, effect, inject, signal } from '@angular/core';
import { Weather } from '../weather';

/** Auto-refresh interval in milliseconds. */
const REFRESH_INTERVAL_MS = 60_000;

@Component({
  selector: 'app-humidity',
  imports: [],
  templateUrl: './humidity.html',
  styleUrl: './humidity.scss',
})
export class Humidity {
  private readonly weather = inject(Weather);

  protected readonly resource = this.weather.lucerne;
  protected readonly current = computed(() => this.resource.value()?.current);

  protected readonly autoRefresh = signal(true);
  protected readonly intervalSeconds = REFRESH_INTERVAL_MS / 1000;

  constructor() {
    effect((onCleanup) => {
      if (!this.autoRefresh()) {
        return;
      }

      const id = setInterval(() => this.resource.reload(), REFRESH_INTERVAL_MS);
      onCleanup(() => clearInterval(id));
    });
  }

  protected reload(): void {
    this.resource.reload();
  }

  protected toggleAutoRefresh(): void {
    this.autoRefresh.update((on) => !on);
  }
}

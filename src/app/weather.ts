import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';

export interface CurrentWeather {
  time: string;
  interval: number;
  relative_humidity_2m: number;
  temperature_2m: number;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  current_units: Record<string, string>;
  current: CurrentWeather;
}

/** Coordinates for Lucerne, Switzerland. */
const LUCERNE = { latitude: 47.0502, longitude: 8.3093 } as const;

@Injectable({ providedIn: 'root' })
export class Weather {
  /**
   * Reactive resource that fetches the current weather for Lucerne.
   * Automatically loads on creation and exposes loading/error/value state.
   */
  readonly lucerne = httpResource<WeatherResponse>(() => ({
    url: 'https://api.open-meteo.com/v1/forecast',
    params: {
      latitude: LUCERNE.latitude,
      longitude: LUCERNE.longitude,
      current: 'relative_humidity_2m,temperature_2m',
      models: 'meteoswiss_icon_ch1',
      timezone: 'Europe/Berlin',
      past_days: 1,
	    forecast_days: 0,
    },
  }));
}

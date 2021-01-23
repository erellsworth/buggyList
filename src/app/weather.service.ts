import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { IWeather } from './interfaces';
import { TimeService } from './time.service';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    // this should be replaced by my own api
    private apiBaseUrl: string = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/';

    private position = {
        lat: 39.39563876301934, // this should be replaced with actual geolocation data
        lon: -76.56495427019978
    }

    private data: BehaviorSubject<IWeather>;

    constructor(
        private http: HttpClient,
        time: TimeService
    ) {

        this.data = <BehaviorSubject<IWeather>>new BehaviorSubject(null);

        time.everyMinute(() => {
            this.callApi('onecall').subscribe((weather: IWeather) => {
                this.data.next(weather);
            });
        })
    }

    public get weather(): Observable<IWeather> {
        return this.data.asObservable();
    }

    private callApi(route: string, params?: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            params: Object.assign(
                this.position,
                {
                    appid: environment.apiKeys.openWeatherMap,
                    units: 'imperial',
                    exclude: 'minutely'
                },
                params)
        };
        return this.http.get(this.apiBaseUrl + route, httpOptions);
    }
}

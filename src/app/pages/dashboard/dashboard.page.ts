import { Component, OnInit } from '@angular/core';
import { IWeather } from '../../interfaces';
import { TimeService } from '../../services/time.service';
import { WeatherService } from '../../services/weather.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    public weather: IWeather;
    public today: Date = new Date();

    constructor(
        time: TimeService,
        weatherService: WeatherService
    ) {

        time.everySecond(() => {
            this.today = new Date();
        });

        weatherService.weather.subscribe((weather: IWeather) => {
            console.log('weather found', weather);
            if (weather) {
                this.weather = weather;
            }
        });
    }

    ngOnInit() {
    }

}

import { Component, OnInit } from '@angular/core';
import { IWeather } from '../../../interfaces';
import { WeatherService } from '../../../weather.service';

@Component({
    selector: 'app-current-temp',
    templateUrl: './current-temp.component.html',
    styleUrls: ['./current-temp.component.scss'],
})
export class CurrentTempComponent implements OnInit {

    public temp: number;

    constructor(private weatherSrv: WeatherService) {
        weatherSrv.weather.subscribe((weather: IWeather) => {
            console.log('weather found', weather.current);
            if (weather.current) {
                this.temp = weather.current.temp;
            }
        });
    }

    ngOnInit() { }

}

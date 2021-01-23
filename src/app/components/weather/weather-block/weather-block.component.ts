import { Component, Input, OnInit } from '@angular/core';
import { IWeatherData } from '../../../interfaces';

@Component({
    selector: 'app-weather-block',
    templateUrl: './weather-block.component.html',
    styleUrls: ['./weather-block.component.scss'],
})
export class WeatherBlockComponent implements OnInit {

    @Input() public weather: IWeatherData;

    public sunset: string;

    constructor() {
    }

    ngOnInit() {
        console.log('weather block', this.weather);

    }

}

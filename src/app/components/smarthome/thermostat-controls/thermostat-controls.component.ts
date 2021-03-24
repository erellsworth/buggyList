import { Component, OnInit } from '@angular/core';
import { ThermostatService } from '../../../services/thermostat.service';

@Component({
    selector: 'app-thermostat-controls',
    templateUrl: './thermostat-controls.component.html',
    styleUrls: ['./thermostat-controls.component.scss'],
})
export class ThermostatControlsComponent implements OnInit {


    constructor(private thermostat: ThermostatService) {
        thermostat.ready.subscribe((isReady: boolean) => {
            console.log('thermostat ready?', isReady);
            if (isReady) {

            }
        })
    }

    ngOnInit() { }

}

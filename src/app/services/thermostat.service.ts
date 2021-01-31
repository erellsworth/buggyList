import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ThermostatService {

    private apiBaseUrl: string = 'https://api.ecobee.com/';
    private apiVersion: string = '1';

    constructor() { }

    public authorize() {

        //https://api.ecobee.com/authorize

        //?response_type=ecobeePin&client_id={environment.apiKeys.ecoBee}&scope=%20smartWrite
    }
}

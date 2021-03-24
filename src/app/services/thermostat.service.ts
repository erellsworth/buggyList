import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IEcoBeeAuthResponse } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ThermostatService {

    private apiBaseUrl: string = 'https://api.ecobee.com/';
    private apiVersion: string = '1';
    private token: string;

    public ready: Subject<boolean> = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private store: Storage
    ) {
        this.init();
    }

    private async init(): Promise<void> {
        this.token = await this.store.get('thermostatToken');

        if (this.token) {
            this.ready.next(true);
        } else {
            this.ready.next(false);
            this.getPin();
        }
    }

    private getPin(): void {

        const url = this.apiBaseUrl + '/authorize';

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            params: {
                client_id: environment.apiKeys.ecoBee,
                response_type: 'ecobeePin',
                scope: 'smartWrite'
            }
        };

        this.http.get(url, httpOptions).subscribe((result: { data: IEcoBeeAuthResponse }) => {
            console.log('getPin', result);
        });
    }
}

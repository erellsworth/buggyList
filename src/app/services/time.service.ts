import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TimeService {

    public everySecond(callback: CallableFunction) {
        timer(0, 1000).subscribe(() => {
            callback();
        });
    }

    public everyMinute(callback: CallableFunction) {
        timer(0, 1000 * 60).subscribe(() => {
            callback();
        });
    }

    constructor() { }
}

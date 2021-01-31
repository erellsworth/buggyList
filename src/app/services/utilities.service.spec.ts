import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { UtilitiesService } from './utilities.service';

function provideStorage() { return new Storage({}); }

describe('UtilitiesService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            { provide: Storage, useFactory: provideStorage }
        ]
    }));

    it('should be created', () => {
        const service: UtilitiesService = TestBed.get(UtilitiesService);
        expect(service).toBeTruthy();
    });
});

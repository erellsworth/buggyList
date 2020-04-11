import { TestBed } from '@angular/core/testing';
import { MemoryHole } from './memory-hole';
import { Storage } from '@ionic/storage';

function provideStorage() { return new Storage({}); }

describe('MemoryHole', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            { provide: Storage, useFactory: provideStorage }
        ]
    }));
    it('should create an instance', () => {
        const store: MemoryHole = TestBed.get(MemoryHole);
        expect(store).toBeTruthy();
    });
});
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListMakerComponent } from './list-maker.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { Storage } from '@ionic/storage';

function provideStorage() { return new Storage({}); }

describe('ListMakerComponent', () => {
    let component: ListMakerComponent;
    let fixture: ComponentFixture<ListMakerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Storage, useFactory: provideStorage }
            ],
            declarations: [ListMakerComponent],
            imports: [IonicModule.forRoot(), SharedModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ListMakerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

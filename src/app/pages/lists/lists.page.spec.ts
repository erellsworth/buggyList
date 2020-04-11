import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage';

import { ListsPage } from './lists.page';
import { SharedModule } from '../../modules/shared/shared.module';

const provideStorage = () => { return new Storage({}); }

describe('ListsPage', () => {
    let component: ListsPage;
    let fixture: ComponentFixture<ListsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Storage, useFactory: provideStorage },
            ],
            declarations: [ListsPage],
            imports: [IonicModule.forRoot(), SharedModule, RouterModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ListsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

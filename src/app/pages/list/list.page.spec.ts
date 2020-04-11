import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPage } from './list.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { ActivatedRoute, UrlSerializer } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

const fakeActivatedRoute = {
    snapshot: { data: {} }
} as ActivatedRoute;

const provideStorage = () => { return new Storage({}); }

describe('ListPage', () => {
    let component: ListPage;
    let fixture: ComponentFixture<ListPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ActivatedRoute, useValue: fakeActivatedRoute },
                { provide: Storage, useFactory: provideStorage },
                { provide: LocationStrategy, useClass: PathLocationStrategy },
                Location,
                UrlSerializer
            ],
            declarations: [ListPage],
            imports: [IonicModule.forRoot(), SharedModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

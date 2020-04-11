import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ListEditorComponent } from './list-editor.component';
import { SharedModule } from '../../modules/shared/shared.module';

function provideStorage() { return new Storage({}); }

describe('ListEditorComponent', () => {
    let component: ListEditorComponent;
    let fixture: ComponentFixture<ListEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Storage, useFactory: provideStorage }
            ],
            declarations: [ListEditorComponent],
            imports: [IonicModule.forRoot(), SharedModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ListEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

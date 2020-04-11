import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColorInputComponent } from './color-input.component';
import { SharedModule } from '../../modules/shared/shared.module';

describe('ColorInputComponent', () => {
    let component: ColorInputComponent;
    let fixture: ComponentFixture<ColorInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [IonicModule.forRoot(), SharedModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ColorInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

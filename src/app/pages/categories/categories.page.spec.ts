import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriesPage } from './categories.page';
import { SharedModule } from '../../modules/shared/shared.module';

describe('CategoriesPage', () => {
    let component: CategoriesPage;
    let fixture: ComponentFixture<CategoriesPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CategoriesPage],
            imports: [IonicModule.forRoot(), SharedModule]
        }).compileComponents();

        fixture = TestBed.createComponent(CategoriesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

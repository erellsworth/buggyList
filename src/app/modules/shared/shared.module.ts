import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { HeaderComponent } from '../../components/header/header.component';
import { ColorInputComponent } from '../../components/color-input/color-input.component';
import { ColorMarkerComponent } from '../../components/color-marker/color-marker.component';
import { CategorySelectorComponent } from '../../components/category-selector/category-selector.component';


@NgModule({
    declarations: [
        HeaderComponent,
        ColorInputComponent,
        ColorMarkerComponent,
        CategorySelectorComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        ColorPickerModule
    ],
    exports: [
        HeaderComponent,
        ColorInputComponent,
        ColorPickerModule,
        ColorMarkerComponent,
        CategorySelectorComponent
    ]
})
export class SharedModule { }

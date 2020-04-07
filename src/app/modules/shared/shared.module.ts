import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { HeaderComponent } from '../../components/header/header.component';
import { ColorInputComponent } from '../../components/color-input/color-input.component';


@NgModule({
    declarations: [HeaderComponent, ColorInputComponent],
    imports: [
        CommonModule,
        IonicModule,
        ColorPickerModule
    ],
    exports: [
        HeaderComponent,
        ColorInputComponent,
        ColorPickerModule
    ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { HeaderComponent } from '../../components/header/header.component';
import { ColorInputComponent } from '../../components/color-input/color-input.component';
import { ColorMarkerComponent } from '../../components/color-marker/color-marker.component';
import { ListEditorComponent } from '../../components/list-editor/list-editor.component';


@NgModule({
    declarations: [
        HeaderComponent,
        ColorInputComponent,
        ColorMarkerComponent,
        ListEditorComponent
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
        ListEditorComponent
    ]
})
export class SharedModule { }

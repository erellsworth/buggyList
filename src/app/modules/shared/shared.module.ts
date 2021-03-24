import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { HeaderComponent } from '../../components/header/header.component';
import { ColorInputComponent } from '../../components/color-input/color-input.component';
import { ColorMarkerComponent } from '../../components/color-marker/color-marker.component';
import { ListEditorComponent } from '../../components/list-editor/list-editor.component';
import { CurrentTempComponent } from '../../components/weather/current-temp/current-temp.component';
import { WeatherBlockComponent } from '../../components/weather/weather-block/weather-block.component';
import { ThermostatControlsComponent } from '../../components/smarthome/thermostat-controls/thermostat-controls.component';
@NgModule({
    declarations: [
        HeaderComponent,
        ColorInputComponent,
        ColorMarkerComponent,
        ListEditorComponent,
        CurrentTempComponent,
        WeatherBlockComponent,
        ThermostatControlsComponent
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
        ListEditorComponent,
        CurrentTempComponent,
        WeatherBlockComponent,
        ThermostatControlsComponent
    ]
})
export class SharedModule { }

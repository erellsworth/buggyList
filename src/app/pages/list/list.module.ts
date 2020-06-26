import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { ListEditorComponent } from '../../components/list-editor/list-editor.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { ItemEditorComponent } from '../../components/item-editor/item-editor.component';

@NgModule({
    entryComponents: [
        ListEditorComponent,
        ItemEditorComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        IonicModule,
        ListPageRoutingModule
    ],
    declarations: [
        ListPage,
        ListEditorComponent,
        ItemEditorComponent
    ]
})
export class ListPageModule { }

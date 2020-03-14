import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListsPageRoutingModule } from './lists-routing.module';

import { ListsPage } from './lists.page';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        IonicModule,
        ListsPageRoutingModule
    ],
    declarations: [ListsPage]
})
export class ListsPageModule { }

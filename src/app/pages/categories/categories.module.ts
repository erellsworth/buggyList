import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        IonicModule,
        CategoriesPageRoutingModule
    ],
    declarations: [CategoriesPage]
})
export class CategoriesPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../modules/shared/shared.module';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        IonicModule,
        CategoryPageRoutingModule
    ],
    declarations: [CategoryPage]
})
export class CategoryPageModule { }

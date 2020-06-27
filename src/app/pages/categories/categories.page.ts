import { Component, OnInit } from '@angular/core';
import { MemoryHole } from '../../stores/memory-hole';
import { IAppData, ICategory } from '../../interfaces';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.page.html',
    styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

    public categories: ICategory[];

    constructor(
        private store: MemoryHole
    ) {
        this.store.data.subscribe((data: IAppData) => {
            this.categories = data.categories;
        });
    }

    ngOnInit() { }

}

import { Component, OnInit } from '@angular/core';
import { ICategory, IAppData, IListItem } from '../../interfaces';
import { MemoryHole } from '../../stores/memory-hole';
import { ActivatedRoute } from '@angular/router';
import { ItemEditorComponent } from '../../components/item-editor/item-editor.component';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-category',
    templateUrl: './category.page.html',
    styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

    public category: ICategory;
    public items: IListItem[] = [];

    constructor(
        private modal: ModalController,
        private route: ActivatedRoute,
        private store: MemoryHole
    ) {
        let id: string = '';

        if (this.route.snapshot.paramMap) {
            id = this.route.snapshot.paramMap.get('id');
        }

        this.store.search('items', 'categoryIds', 'array-contains', id)
            .subscribe((items: IListItem[]) => {
                this.items = items;
            });

        this.store.data.subscribe((data: IAppData) => {
            let category: ICategory = data.categories.find((cat: ICategory) => {
                return cat.id === id;
            });

            this.category = category;
        });

    }

    ngOnInit() {
    }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListStore } from '../../stores/list-store';

import { v4 } from 'uuid';
import { ICategory } from '../../interfaces/category';
import { CategoryStore } from '../../stores/category-store';
import { IList } from '../../interfaces/list';

@Component({
    selector: 'app-list-maker',
    templateUrl: './list-maker.component.html',
    styleUrls: ['./list-maker.component.scss'],
})
export class ListMakerComponent implements OnInit {

    public list: IList = {
        name: '',
        id: v4(),
        categoryIds: []
    }

    public categories: ICategory[] = [];
    public categoryInput: string;

    private existingCategories: ICategory[] = [];

    constructor(
        private modal: ModalController,
        private listStore: ListStore,
        private categoryStore: CategoryStore
    ) {
        this.categoryStore.categories.subscribe((categories: ICategory[]) => {
            this.existingCategories = categories;
        });
    }

    ngOnInit() { }

    public async close(): Promise<void> {
        await this.modal.dismiss();
    }

    public async create(): Promise<void> {
        await this.listStore.add(this.list);
        await this.close();
    }

    public nameChanged(event: any) {
        this.list.name = event.detail.value;
    }

    public getCategoryIds(): string[] {
        return this.categories.map((category: ICategory) => {
            return category.id;
        });
    }

    public categoryInputChanged(event: any) {
        this.categoryInput = event.detail.value;
    }

    public categorySuggestions(): ICategory[] {
        if (!this.categoryInput) { return []; }

        return this.existingCategories
            .filter((category: ICategory): boolean => {
                return category.name.toLowerCase().includes(this.categoryInput.toLowerCase());
            }).filter((category: ICategory): boolean => {
                return !this.list.categoryIds.includes(category.id);
            });
    }

    public async addCategory() {
        let categoryId: string = v4();

        this.list.categoryIds.push(categoryId);

        this.categoryStore.add({
            name: this.categoryInput,
            id: categoryId
        });

        this.categoryInput = '';
    }

    public selectCategory(category: ICategory) {
        this.list.categoryIds.push(category.id);
        this.categories.push(category);
        this.categoryInput = '';
    }
}

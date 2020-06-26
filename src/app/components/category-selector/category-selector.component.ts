import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IAppData, ICategory } from '../../interfaces';
import { MemoryHole } from '../../stores/memory-hole';
import { v4 } from 'uuid';

@Component({
    selector: 'app-category-selector',
    templateUrl: './category-selector.component.html',
    styleUrls: ['./category-selector.component.scss'],
})
export class CategorySelectorComponent implements OnInit {

    @Input() placeholderText: string = 'Category Name';

    @Output() onSelect: EventEmitter<ICategory> = new EventEmitter();

    public selectedCategory: ICategory;

    public pendingCategory: ICategory = {
        id: v4(),
        name: ''
    };
    private existingCategories: ICategory[];

    constructor(private store: MemoryHole) {
        this.store.data.subscribe((data: IAppData) => {
            this.existingCategories = data.categories;
            console.log('data', data);
        });
    }

    ngOnInit() { }

    /**
     * inputChanged
    */
    public inputChanged(event: CustomEvent): void {
        this.pendingCategory.name = event.detail.value;
    }

    /**
     * categorySuggestions
     */
    public categorySuggestions(): ICategory[] {
        if (!this.existingCategories || !this.pendingCategory.name) {
            return [];
        }

        return this.existingCategories.filter((category: ICategory) => {
            return category.name.toLowerCase().includes(this.pendingCategory.name.toLowerCase());
        })
    }

    /**
     * createCategory
     */
    public createCategory(): void {
        this.store.add('categories', this.pendingCategory);
        this.selectCategory();
    }

    /**
     * selectCategory
     */
    public selectCategory(category?: ICategory): void {
        if (category) {
            this.onSelect.emit(category);
            this.selectedCategory = category;
        } else {
            this.onSelect.emit(this.pendingCategory);
            this.selectedCategory = Object.assign({}, this.pendingCategory);
        }
    }

    public pendingCategoryExists(): boolean {
        return this.existingCategories.some((category: ICategory): boolean => {
            return category.name.toLowerCase() === this.pendingCategory.name.toLowerCase();
        });
    }

    public clearSelected(): void {
        this.selectedCategory = null;
    }

}

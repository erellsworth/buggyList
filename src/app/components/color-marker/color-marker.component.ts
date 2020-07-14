import { Component, OnInit, Input } from '@angular/core';
import { IListItem, IAppData, ICategory } from '../../interfaces';
import { MemoryHole } from '../../stores/memory-hole';


/**
 * Color hierarchy:
 *
 * Item color
 * First Category color
 * list color
 *
 */
@Component({
    selector: 'app-color-marker',
    templateUrl: './color-marker.component.html',
    styleUrls: ['./color-marker.component.scss'],
})
export class ColorMarkerComponent implements OnInit {

    @Input() color: string;
    @Input() item?: IListItem;

    private categories: ICategory[];

    constructor(private store: MemoryHole) {
        this.store.data.subscribe((data: IAppData) => {
            this.categories = data.categories;
        });
    }

    ngOnInit() {
        if (this.item && this.item.categoryIds) {
            this.categories = this.categories.filter((category: ICategory): boolean => {
                return this.item.categoryIds.includes(category.id);
            });
        }
    }

    public getColor(): string {
        if (this.item && this.item.color) {
            return this.item.color;
        }

        if (this.categories) {
            return this.categories[0].color;
        }

        return this.color;
    }

}

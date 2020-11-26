import { Injectable } from '@angular/core';
import { MemoryHole } from './stores/memory-hole';
import { IAppData, IListItem, IList, IBaseData } from './interfaces';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesService {

    private data: IAppData;

    constructor(private store: MemoryHole) {
        this.store.data.subscribe((data: IAppData) => {
            this.data = data;
        });
    }

    /**
    * transforms an inputed variable into a boolean
    * for arrays it will return true if the length of the array is more than 0
    *
    * @param {any} obj
    *
    * @returns {boolean}
    */
    public getBoolean(obj: any): boolean {
        if (!obj) { return false; }

        if (typeof obj === 'boolean') { return obj; }

        if (typeof obj.filter === 'function') {
            obj = obj.filter((item: any) => {
                return item;
            });
        }

        if (typeof obj === 'string') {
            return (obj !== 'false');
        }

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) { return true; }
        if (obj.length === 0) { return false; }

        return obj;
    }

    public findItem(id: string): IListItem {
        return this.data.items.find((item: IListItem) => {
            return item.id === id;
        });
    }

    public getItemSuggestions(name: string, list?: IList): IListItem[] {
        if (!name) { return []; }

        const matchingItems: IListItem[] = this.data.items.filter((item: IListItem): boolean => {
            return item.name.includes(name);
        });

        if (!list) { return matchingItems; }

        list = this.normalizeList(list);

        return matchingItems.filter((item: IListItem): boolean => {
            return !list.itemIds.includes(item.id) && !list.completedItemIds.includes(item.id);
        });
    }

    public normalizeList(list: IList): IList {
        return Object.assign({
            itemIds: [],
            completedItemIds: []
        }, list);
    }
}

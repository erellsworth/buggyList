import { Injectable } from '@angular/core';
import { MemoryHole } from './stores/memory-hole';
import { IAppData, IListItem } from './interfaces';

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

    public findItem(id: string): IListItem {
        return this.data.items.find((item: IListItem) => {
            return item.id === id;
        });
    }

    public getItemSuggestions(name: string): IListItem[] {
        if (!name) { return []; }
        return this.data.items.filter((item: IListItem) => {
            return item.name.includes(name);
        });
    }
}

import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { IListItem } from '../interfaces/list';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ItemStore {
    private data: IListItem[] = [];
    public observer: BehaviorSubject<IListItem[]>;

    constructor(private storage: Storage) {
        this.observer = <BehaviorSubject<IListItem[]>>new BehaviorSubject([]);
        this.init();
    }

    private async init(): Promise<void> {
        let items = await this.storage.get('items') as IListItem[];
        if (!items) { items = []; }
        this.data = items;
        this.observer.next(items);
    }

    /**
    * observable for watching list data
    *
    * @returns {Observable<IList[]>}
    */
    public get items(): Observable<IListItem[]> {
        return this.observer.asObservable();
    }

    public async add(item: IListItem): Promise<void> {
        this.data.push(item);
        await this.storage.set('items', this.data);
        this.observer.next(this.data);
    }
}

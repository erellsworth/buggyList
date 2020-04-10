import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IAppData, IList, IListItem, ICategory } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class MemoryHole {
    private _data: IAppData = {
        lists: [],
        categories: [],
        items: []
    };

    public observer: BehaviorSubject<IAppData>;

    constructor(private storage: Storage) {
        this.observer = <BehaviorSubject<IAppData>>new BehaviorSubject(this._data);
        this.init();
    }

    private async init(): Promise<void> {
        let data = await this.storage.get('data') as IAppData;

        if (data) { this._data = data; }

        await this.broadcastUpdate();
    }

    private async broadcastUpdate(): Promise<void> {
        await this.storage.set('data', this._data);
        this.observer.next(this._data);
    }

    /**
    * observable for watching data
    *
    * @returns {Observable<IAppData>}
    */
    public get data(): Observable<IAppData> {
        return this.observer.asObservable();
    }

    public async add(key: string, item: IList | IListItem | ICategory): Promise<void> {
        this._data[key].push(item);
        await this.broadcastUpdate();
    }

    public async delete(key: string, id: string): Promise<void> {
        this._data[key] = this._data[key].filter((item: IList | IListItem | ICategory): boolean => {
            return item.id !== id;
        });

        await this.broadcastUpdate();
    }

    public async update(key: string, updatedItem: IList | IListItem | ICategory): Promise<void> {
        this._data[key] = this._data[key].map((item: IList | IListItem | ICategory) => {
            if (updatedItem.id === item.id) {
                return updatedItem;
            }
            return item;
        });
        await this.broadcastUpdate();
    }
}

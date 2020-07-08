import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppData, ICategory, IList, IBaseData, IListItem, dataKey } from '../interfaces';
import "firebase/database";

@Injectable({
    providedIn: 'root'
})
export class MemoryHole {

    private _data: IAppData = {
        lists: [],
        categories: [],
        items: []
    };

    private collections: {
        items: AngularFirestoreCollection<IListItem>;
        categories: AngularFirestoreCollection<ICategory>;
        lists: AngularFirestoreCollection<IList>;
    };

    public observer: BehaviorSubject<IAppData>;

    constructor(
        private fireStore: AngularFirestore
    ) {
        this.observer = <BehaviorSubject<IAppData>>new BehaviorSubject(this._data);

        this.collections = {
            items: fireStore.collection<IListItem>('items'),
            categories: fireStore.collection<ICategory>('categories'),
            lists: fireStore.collection<IList>('lists'),
        };

        this.collections.items.valueChanges().subscribe((items) => {
            console.log('items changed', items);
            this._data.items = items;
            this.observer.next(this._data);
        });

        this.collections.categories.valueChanges().subscribe((categories) => {
            console.log('categories changed', categories);
            this._data.categories = categories;
            this.observer.next(this._data);
        });

        this.collections.lists.valueChanges().subscribe((lists) => {
            console.log('lists changed', lists);
            this._data.lists = lists;
            this.observer.next(this._data);
        });

    }

    /**
    * observable for watching data
    *
    * @returns {Observable<IAppData>}
    */
    public get data(): Observable<IAppData> {
        return this.observer.asObservable();
    }

    public async add(key: dataKey, item: any): Promise<void> {

        if (!this.collections[key]) {
            console.log('no collection', key, item, this.collections);
            return;
        }
        console.log('add', key, item);
        this.collections[key].doc(item.id).set(item);

        // this.collections[key].add(item);

        // if (!this._data[key]) {
        //     this._data[key] = [];
        // }
        // this._data[key].push(item);
        // await this.broadcastUpdate(key);
    }

    public async delete(key: string, id: string): Promise<void> {
        // this._data[key] = this._data[key].filter((item: IBaseData): boolean => {
        //     return item.id !== id;
        // });

        // await this.broadcastUpdate();
    }

    public async updateSingle(key: dataKey, updatedItem: IBaseData): Promise<void> {
        let itemDoc = this.collections[key].doc(updatedItem.id);
        await itemDoc.update(updatedItem);
    }

    public async updateAll(key: dataKey, updatedItems: IBaseData[]): Promise<void> {
        this._data[key].forEach((item: IBaseData)=> {
            this.updateSingle(key, item);
        });
    }

    public createId(): string {
        return this.fireStore.createId();
    }
}

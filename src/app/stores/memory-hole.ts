import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppData, ICategory, IList, IBaseData, IListItem, dataKey } from '../interfaces';
import "firebase/database";


type WhereFilterOp =
    | '<'
    | '<='
    | '=='
    | '>='
    | '>'
    | 'array-contains'
    | 'in'
    | 'array-contains-any';

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
            this._data.items = items;
            this.observer.next(this._data);
        });

        this.collections.categories.valueChanges().subscribe((categories) => {
            this._data.categories = categories;
            this.observer.next(this._data);
        });

        this.collections.lists.valueChanges().subscribe((lists) => {
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

    public async add(key: dataKey, item: IBaseData): Promise<void> {
        this.collections[key].doc(item.id).set(item);
    }

    public async delete(key: string, id: string): Promise<void> {

    }

    public async updateSingle(key: dataKey, updatedItem: IBaseData): Promise<void> {
        let itemDoc = this.collections[key].doc(updatedItem.id);
        await itemDoc.update(updatedItem);
    }

    public async updateAll(key: dataKey, updatedItems: IBaseData[]): Promise<void> {
        this._data[key].forEach((item: IBaseData) => {
            this.updateSingle(key, item);
        });
    }

    public search(key: dataKey, property: string, comparison: WhereFilterOp, value: any): Observable<IBaseData[]> {
        return this.fireStore.collection<IBaseData>(key, (ref) => {
            return ref.where(property, comparison, value)
        }).valueChanges();
    }

    public createId(): string {
        return this.fireStore.createId();
    }
}

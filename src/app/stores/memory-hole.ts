import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IAppData, IList, IBaseData } from '../interfaces';
import * as firebase from "firebase/app";
import "firebase/database";

import config from '../../../firebase.config';

firebase.initializeApp(config);
const db = firebase.database();

@Injectable({
    providedIn: 'root'
})
export class MemoryHole {

    private database: firebase.database.Reference;

    private defaultLists: IList[] = [
        {
            id: 'groceries',
            name: 'Groceries',
            color: '#cccccc',
            itemIds: [],
            completedItemIds: []
        }
    ];

    private _data: IAppData = {
        lists: [],
        categories: [],
        items: []
    };

    public observer: BehaviorSubject<IAppData>;

    constructor(private storage: Storage) {
        this.observer = <BehaviorSubject<IAppData>>new BehaviorSubject(this._data);
        this.database = db.ref('/');

        this.init();
    }

    private async init(): Promise<void> {
        let data: IAppData;
        console.log('init');
        try {
            let remoteData = await this.database.once('value');
            data = remoteData.val();
            this.database.on('value', (data: firebase.database.DataSnapshot) => {
                this._data = data.val();
                this.broadcastUpdate(false);
            });
        } catch (error) {
            let localData = await this.storage.get('data');
            data = localData;
        }

        if (data) {
            this._data = data;
        } else {
            this._data.lists = this.defaultLists;
        }

        await this.broadcastUpdate();
    }

    private async broadcastUpdate(updateFirebase: boolean = true): Promise<void> {
        await this.storage.set('data', this._data);
        if (updateFirebase) {
            await this.database.set(this._data);
        }

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

    public async add(key: string, item: IBaseData): Promise<void> {
        this._data[key].push(item);
        await this.broadcastUpdate();
    }

    public async delete(key: string, id: string): Promise<void> {
        this._data[key] = this._data[key].filter((item: IBaseData): boolean => {
            return item.id !== id;
        });

        await this.broadcastUpdate();
    }

    public async updateSingle(key: string, updatedItem: IBaseData): Promise<void> {
        this._data[key] = this._data[key].map((item: IBaseData) => {
            if (updatedItem.id === item.id) {
                return updatedItem;
            }
            return item;
        });
        await this.broadcastUpdate();
    }

    public async updateAll(key: string, updatedItems: IBaseData[]): Promise<void> {
        this._data[key] = updatedItems;
        await this.broadcastUpdate();
    }
}

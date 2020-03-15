import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { IList } from '../interfaces/list';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ListStore {

    private data: IList[] = [];
    public observer: BehaviorSubject<IList[]>;

    constructor(private storage: Storage) {
        this.observer = <BehaviorSubject<IList[]>>new BehaviorSubject([]);
        this.init();
    }

    private async init(): Promise<void> {
        let lists = await this.storage.get('lists') as IList[];
        if (!lists) { lists = []; }
        this.data = lists;
        this.observer.next(lists);
    }

    /**
    * observable for watching list data
    *
    * @returns {Observable<IList[]>}
    */
    public get lists(): Observable<IList[]> {
        return this.observer.asObservable();
    }

    public async add(list: IList): Promise<void> {
        this.data.push(list);
        await this.storage.set('lists', this.data);
        this.observer.next(this.data);
    }

}

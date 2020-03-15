import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category';


@Injectable({
    providedIn: 'root'
})
export class CategoryStore {

    private data: ICategory[] = [];
    public observer: BehaviorSubject<ICategory[]>;

    constructor(private storage: Storage) {
        this.observer = <BehaviorSubject<ICategory[]>>new BehaviorSubject([]);
        this.init();
    }

    private async init(): Promise<void> {
        let categories = await this.storage.get('categories') as ICategory[];
        if (!categories) { categories = []; }
        this.data = categories;
        this.observer.next(categories);
    }

    /**
    * observable for watching category data
    *
    * @returns {Observable<ICategory[]>}
    */
    public get categories(): Observable<ICategory[]> {
        return this.observer.asObservable();
    }

    public async add(category: ICategory): Promise<void> {
        this.data.push(category);
        await this.storage.set('categories', this.data);
        this.observer.next(this.data);
    }

}

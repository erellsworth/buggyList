import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { v4 } from 'uuid';
import { IAppData, IList, IListItem } from '../../interfaces';
import { MemoryHole } from '../../stores/memory-hole';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    public list: IList;
    private savedItems: IListItem[];
    public pendingItem: IListItem = {
        name: '',
        id: v4()
    };

    constructor(
        private route: ActivatedRoute,
        private store: MemoryHole
    ) {
        let id: string = this.route.snapshot.paramMap.get('id');

        this.store.data.subscribe((data: IAppData) => {
            this.list = data.lists.find((list: IList) => {
                return list.id === id;
            });
        });
    }

    ngOnInit() { }

    public items(): IListItem[] {
        if (!this.list || !this.list.itemIds) { return []; }
        return this.list.itemIds.map((id: string) => {
            return this.savedItems.find((item: IListItem) => {
                return id === item.id;
            });
        });
    }

    public itemChanged(event: any) {
        this.pendingItem.name = event.detail.value;
    }

    public async addItem() {
        console.log(this.pendingItem);

        this.store.add('items', this.pendingItem);

        this.list.itemIds.push(this.pendingItem.id);

        this.pendingItem = {
            name: '',
            id: v4()
        }


    }
}

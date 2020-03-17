import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListStore } from '../../stores/list-store';
import { IList, IListItem } from '../../interfaces/list';
import { ItemStore } from '../../stores/item-store';
import { ModalController } from '@ionic/angular';
import { v4 } from 'uuid';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    public list: IList;
    private savedItems: IListItem[];
    private pendingItem: IListItem = {
        name: '',
        id: v4()
    };

    constructor(
        private modal: ModalController,
        private route: ActivatedRoute,
        private store: ListStore,
        private itemStore: ItemStore
    ) {
        let id: string = this.route.snapshot.paramMap.get('id');

        this.store.lists.subscribe((lists: IList[]) => {
            this.list = lists.find((list: IList) => {
                return list.id === id;
            });
        });

        this.itemStore.items.subscribe((items: IListItem[]) => {
            this.savedItems = items;
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
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { v4 } from 'uuid';
import { IAppData, IList, IListItem } from '../../interfaces';
import { MemoryHole } from '../../stores/memory-hole';
import { UtilitiesService } from '../../utilities.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ListEditorComponent } from '../../components/list-editor/list-editor.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    public list: IList;
    public pendingItem: IListItem = {
        name: '',
        id: v4()
    };
    public suggestedItems: IListItem[];

    constructor(
        private alert: AlertController,
        private route: ActivatedRoute,
        private store: MemoryHole,
        private util: UtilitiesService,
        private modal: ModalController
    ) {
        let id: string = this.route.snapshot.paramMap.get('id');

        this.store.data.subscribe((data: IAppData) => {
            let list: IList = data.lists.find((list: IList) => {
                return list.id === id;
            });
            this.list = this.util.normalizeList(list);
        });
    }

    ngOnInit() { }

    private checkForDuplicate(): boolean {

        let existingItemId: string = this.list.itemIds.find((itemId: string): boolean => {
            let item = this.util.findItem(itemId);
            return item.name.toLowerCase() === this.pendingItem.name.toLowerCase();
        });

        if (existingItemId) { return true; }
        return false;
    }

    private isComplete(item: IListItem): boolean {
        return this.list.completedItemIds.includes(item.id);
    }

    public items(): IListItem[] {
        if (!this.list || !this.list.itemIds) { return []; }
        return this.list.itemIds.map((id: string) => {
            return this.util.findItem(id);
        });
    }

    public itemChanged(event: any) {
        this.pendingItem.name = event.detail.value;
        this.suggestedItems = this.util.getItemSuggestions(this.pendingItem.name, this.list);
    }

    public async addItem(item?: IListItem) {

        if (!item && this.checkForDuplicate()) {
            const alert = await this.alert.create({
                header: 'Duplicate Item',
                subHeader: 'This item is already on this list',
                buttons: ['OK']
            });

            await alert.present();
            return;
        }

        if (!item) {
            item = this.pendingItem;
            this.store.add('items', this.pendingItem);
        }

        this.list.itemIds.push(item.id);

        this.store.update('lists', this.list);

        this.pendingItem = {
            name: '',
            id: v4()
        }
    }

    /**
     * openEditor
     */
    public async openEditor(): Promise<void> {
        const modal = await this.modal.create({
            component: ListEditorComponent,
            componentProps: {
                list: this.list
            }
        });

        return await modal.present();
    }

    /**
     * toggleItem
     */
    public toggleItem(item: IListItem): void {
        if (this.isComplete(item)) {
            this.list.completedItemIds = this.list.completedItemIds.filter((id: string): boolean => {
                return id !== item.id;
            });
        } else {
            this.list.completedItemIds.push(item.id);
        }

        this.store.update('lists', this.list);
    }

    /**
     * getCheckboxIcon
     */
    public getCheckboxIcon(item: IListItem): string {
        if (this.isComplete(item)) { return 'checkbox'; }

        return 'checkbox-outline';
    }

    /**
     * itemsReordered
     */
    public itemsReordered(event: any) {
        this.list.itemIds = event.detail.complete(this.list.itemIds);

        this.store.update('lists', this.list);
    }
}

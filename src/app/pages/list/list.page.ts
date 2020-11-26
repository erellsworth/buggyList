import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAppData, IList, IListItem } from '../../interfaces';
import { MemoryHole } from '../../stores/memory-hole';
import { UtilitiesService } from '../../utilities.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ListEditorComponent } from '../../components/list-editor/list-editor.component';
import { ItemEditorComponent } from '../../components/item-editor/item-editor.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    private listBackup: IList;

    public list: IList;
    public pendingItem: IListItem;
    public pendingQuantity: number = 1;
    public suggestedItems: IListItem[];
    public sortingEnabled: boolean = false;


    constructor(
        private alert: AlertController,
        private route: ActivatedRoute,
        private store: MemoryHole,
        private util: UtilitiesService,
        private modal: ModalController,
        private toast: ToastController
    ) {
        let id: string = '';

        if (this.route.snapshot.paramMap) {
            id = this.route.snapshot.paramMap.get('id');
        }

        this.pendingItem = {
            name: '',
            id: this.store.createId()
        }

        this.store.data.subscribe((data: IAppData) => {
            let list: IList = data.lists.find((list: IList) => {
                return list.id === id;
            });
            this.list = this.util.normalizeList(list);
            this.pendingItem.categoryIds = [this.list.defaultCategoryId];
        });
    }

    ngOnInit() { }

    private checkForDuplicate(): boolean {

        let existingItemId: string = this.list.itemIds.find((itemId: string): boolean => {
            let item = this.util.findItem(itemId);
            if (!item) { return false; }
            return item.name.toLowerCase() === this.pendingItem.name.toLowerCase();
        });

        if (existingItemId) { return true; }
        return false;
    }

    private isItemComplete(item: IListItem): boolean {
        return this.list.completedItemIds.includes(item.id);
    }

    public items(): IListItem[] {
        if (!this.list || !this.list.itemIds) { return []; }

        return this.list.itemIds.map((id: string): IListItem => {
            const item: IListItem = this.util.findItem(id);

            if (item) {
                item.quantity = this.list.quantities[item.id] || 1;
            }

            return item;
        }).filter((item: IListItem): boolean => {
            if (!item) { return false; }
            if (this.list.showCompletedItems) {
                return true;
            }
            return !this.isItemComplete(item);
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

        if (!this.list.quantities) { this.list.quantities = {}; }

        this.list.quantities[item.id] = this.pendingQuantity;

        this.store.updateSingle('lists', this.list);

        this.pendingItem = {
            name: '',
            id: this.store.createId()
        }

        this.pendingQuantity = 1;
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
     * toggleShowCompletedItems
     */
    public toggleShowCompletedItems(event: CustomEvent) {
        this.list.showCompletedItems = event.detail.checked;
        this.store.updateSingle('lists', this.list);
    }

    /**
     * toggleSorting
     */
    public toggleSorting() {
        this.sortingEnabled = !this.sortingEnabled;
    }

    /**
     * editItem
     */
    public async editItem(item: IListItem) {
        const modal = await this.modal.create({
            component: ItemEditorComponent,
            componentProps: {
                list: this.list,
                item: item
            }
        });

        return await modal.present();

    }

    /**
     * toggleItem
     */
    public toggleItem(item: IListItem): void {
        if (this.isItemComplete(item)) {
            this.list.completedItemIds = this.list.completedItemIds.filter((id: string): boolean => {
                return id !== item.id;
            });
        } else {
            this.list.completedItemIds.push(item.id);
        }

        this.store.updateSingle('lists', this.list);
    }

    /**
     * getCheckboxIcon
     */
    public getCheckboxIcon(item: IListItem): string {
        if (this.isItemComplete(item)) { return 'checkbox'; }

        return 'checkbox-outline';
    }

    /**
     * itemsReordered
     */
    public itemsReordered(event: any) {
        this.list.itemIds = event.detail.complete(this.list.itemIds);

        this.store.updateSingle('lists', this.list);
    }

    public async removeAllItems() {
        const alert = await this.alert.create({
            header: 'Remove all items?',
            message: 'Are you super serious?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                }, {
                    text: 'Yes, delete that shit!',
                    handler: () => {
                        this.listBackup = Object.assign({}, this.list);
                        this.list.completedItemIds = [];
                        this.list.itemIds = [];
                        this.store.updateSingle('lists', this.list);
                        this.showDeletedToast();
                    }
                }
            ]
        });

        await alert.present();
    }

    public async removeCompletedItems() {

        const alert = await this.alert.create({
            header: 'Remove All Completed Items?',
            message: 'Are you super serious?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                }, {
                    text: 'Yes, delete that shit!',
                    handler: () => {
                        this.listBackup = Object.assign({}, this.list);
                        this.list.itemIds = this.list.itemIds.filter((id: string): boolean => {
                            return !this.list.completedItemIds.includes(id);
                        });

                        this.list.completedItemIds = [];

                        this.store.updateSingle('lists', this.list);
                        this.showDeletedToast();
                    }
                }
            ]
        });

        await alert.present();
    }

    private async showDeletedToast() {
        const toast = await this.toast.create({
            header: 'Items Removed',
            position: 'middle',
            duration: 3000,
            buttons: [
                {
                    side: 'end',
                    icon: 'arrow-undo',
                    text: 'Undo',
                    handler: () => {
                        this.list = Object.assign({}, this.listBackup);
                        this.store.updateSingle('lists', this.list);
                    }
                },
                {
                    text: 'Good riddance',
                    role: 'cancel'
                }
            ]
        });
        toast.present()
    }
}

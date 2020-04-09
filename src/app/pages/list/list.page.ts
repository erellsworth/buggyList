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
            this.list = data.lists.find((list: IList) => {
                return list.id === id;
            });
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

    public items(): IListItem[] {
        if (!this.list || !this.list.itemIds) { return []; }
        return this.list.itemIds.map((id: string) => {
            return this.util.findItem(id);
        });
    }

    public itemChanged(event: any) {
        this.pendingItem.name = event.detail.value;
        this.suggestedItems = this.util.getItemSuggestions(this.pendingItem.name);
    }

    public async addItem() {
        console.log('addItem');

        if (this.checkForDuplicate()) {
            const alert = await this.alert.create({
                header: 'Duplicate Item',
                subHeader: 'This item is already on this list',
                buttons: ['OK']
            });

            await alert.present();
            return;
        }

        this.store.add('items', this.pendingItem);

        this.list.itemIds.push(this.pendingItem.id);

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
            component: ListEditorComponent
        });

        return await modal.present();
    }
}

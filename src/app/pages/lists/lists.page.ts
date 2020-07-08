import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListEditorComponent } from '../../components/list-editor/list-editor.component';
import { IList, IAppData } from '../../interfaces';
import { MemoryHole } from '../../stores/memory-hole';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.page.html',
    styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

    public lists: IList[] = [];

    constructor(
        private modal: ModalController,
        private store: MemoryHole
    ) {
        this.store.data.subscribe((data: IAppData) => {
            this.lists = data.lists;
        });
    }

    ngOnInit() { }

    public async addList(): Promise<void> {

        const modal = await this.modal.create({
            component: ListEditorComponent
        });
        return await modal.present();
    }

    /**
     * itemsReordered
     */
    public itemsReordered(event: any) {
        this.lists = event.detail.complete(this.lists);

        this.store.updateAll('lists', this.lists);
    }
}

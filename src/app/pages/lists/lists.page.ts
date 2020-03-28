import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListMakerComponent } from '../../components/list-maker/list-maker.component';
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
            component: ListMakerComponent
        });
        return await modal.present();
    }
}

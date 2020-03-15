import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListMakerComponent } from '../../components/list-maker/list-maker.component';
import { ListStore } from '../../stores/list-store';
import { IList } from '../../interfaces/list';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.page.html',
    styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

    public lists: IList[] = [];

    constructor(
        private modal: ModalController,
        private store: ListStore
    ) {
        this.store.lists.subscribe((lists: IList[]) => {
            console.log('updated lists', lists);
            this.lists = lists;
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

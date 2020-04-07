import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

import { v4 } from 'uuid';
import { IList, IAppData } from '../../interfaces';
import { MemoryHole } from '../../stores/memory-hole';

@Component({
    selector: 'app-list-maker',
    templateUrl: './list-maker.component.html',
    styleUrls: ['./list-maker.component.scss'],
})
export class ListMakerComponent implements OnInit {

    public list: IList = {
        name: '',
        id: v4(),
        itemIds: [],
        completedItemIds: []
    }

    private lists: IList[] = [];

    constructor(
        private modal: ModalController,
        private alert: AlertController,
        private store: MemoryHole
    ) {
        this.store.data.subscribe((data: IAppData) => {
            this.lists = data.lists;
        });
    }

    ngOnInit() { }

    private checkForDuplicate(): boolean {
        let existingList: IList = this.lists.find((list: IList) => {
            return list.name.toLowerCase() === this.list.name.toLowerCase();
        });

        if (existingList) { return true; }
        return false;
    }

    public colorChanged(color: string) {
        this.list.color = color;
    }

    public async close(): Promise<void> {
        await this.modal.dismiss();
    }

    public async create(): Promise<void> {
        if (this.checkForDuplicate()) {
            const alert = await this.alert.create({
                header: 'Duplicate List',
                subHeader: 'A list with this name already exists.',
                message: 'Please use another name.',
                buttons: ['OK']
            });

            await alert.present();
            return;
        }

        console.log('add', this.list);

        await this.store.add('lists', this.list);
        await this.close();
    }

    public nameChanged(event: any) {
        this.list.name = event.detail.value;
    }
}

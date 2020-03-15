import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListStore } from '../../stores/list-store';

import { v4 } from 'uuid';


@Component({
    selector: 'app-list-maker',
    templateUrl: './list-maker.component.html',
    styleUrls: ['./list-maker.component.scss'],
})
export class ListMakerComponent implements OnInit {

    public list = {
        name: '',
        id: v4()
    }

    constructor(
        private modal: ModalController,
        private store: ListStore
    ) { }

    ngOnInit() { }

    public async close(): Promise<void> {
        await this.modal.dismiss();
    }

    public async create(): Promise<void> {
        await this.store.add(this.list);
        await this.close();
    }

    public nameChanged(event: any) {
        this.list.name = event.detail.value;
    }
}

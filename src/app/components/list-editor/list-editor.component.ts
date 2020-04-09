import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IList } from '../../interfaces';

@Component({
    selector: 'app-list-editor',
    templateUrl: './list-editor.component.html',
    styleUrls: ['./list-editor.component.scss'],
})
export class ListEditorComponent implements OnInit {

    public list: IList;

    constructor(
        private modal: ModalController
    ) { }

    ngOnInit() { }

    public async close(): Promise<void> {
        await this.modal.dismiss();
    }

    public nameChanged(event: any) {
        this.list.name = event.detail.value;
    }
}

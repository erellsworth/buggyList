import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IList } from '../../interfaces';
import { MemoryHole } from '../../stores/memory-hole';

@Component({
    selector: 'app-list-editor',
    templateUrl: './list-editor.component.html',
    styleUrls: ['./list-editor.component.scss'],
})
export class ListEditorComponent implements OnInit {

    @Input() list: IList;

    constructor(
        private modal: ModalController,
        private store: MemoryHole
    ) { }

    ngOnInit() { }

    public async close(): Promise<void> {
        await this.modal.dismiss();
    }

    public colorChanged(color: string): void {
        if (!this.list) { return; }
        this.list.color = color;
    }

    public nameChanged(event: any): void {
        if (!this.list) { return; }

        this.list.name = event.detail.value;
    }

    public async save(): Promise<void> {
        await this.store.updateSingle('lists', this.list);
        await this.close();
    }
}

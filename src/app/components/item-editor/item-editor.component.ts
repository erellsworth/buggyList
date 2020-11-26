import { Component, OnInit, Input } from '@angular/core';
import { IListItem } from '../../interfaces';
import { ModalController } from '@ionic/angular';
import { MemoryHole } from '../../stores/memory-hole';

@Component({
    selector: 'app-item-editor',
    templateUrl: './item-editor.component.html',
    styleUrls: ['./item-editor.component.scss'],
})
export class ItemEditorComponent implements OnInit {

    @Input() item?: IListItem;

    constructor(
        private modal: ModalController,
        private store: MemoryHole
    ) { }

    ngOnInit() { }

    public async close(): Promise<void> {
        await this.modal.dismiss();
    }

    public colorChanged(color: string): void {
        if (!this.item) { return; }
        this.item.color = color;
    }

    public nameChanged(event: any): void {
        if (!this.item) { return; }

        this.item.name = event.detail.value;
    }

    public async update() {
        await this.store.updateSingle('items', this.item);
        await this.close();
    }

}

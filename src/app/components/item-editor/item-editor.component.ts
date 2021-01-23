import { Component, OnInit, Input } from '@angular/core';
import { IList, IListItem } from '../../interfaces';
import { ModalController } from '@ionic/angular';
import { MemoryHole } from '../../stores/memory-hole';

@Component({
    selector: 'app-item-editor',
    templateUrl: './item-editor.component.html',
    styleUrls: ['./item-editor.component.scss'],
})
export class ItemEditorComponent implements OnInit {

    @Input() item?: IListItem;
    @Input() list?: IList;

    public quantity: number = 1;
    public notes: string;

    constructor(
        private modal: ModalController,
        private store: MemoryHole
    ) { }

    ngOnInit() {
        if (this.list) {
            if (!this.list.quantities) { this.list.quantities = {}; }
            if (!this.list.notes) { this.list.notes = {}; }

            this.quantity = this.list.quantities[this.item.id] || 1;
            this.notes = this.list.notes[this.item.id];
        }
    }

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
        this.list.quantities[this.item.id] = this.quantity;
        this.list.notes[this.item.id] = this.notes;
        await this.store.updateSingle('lists', this.list);
        await this.close();
    }

}

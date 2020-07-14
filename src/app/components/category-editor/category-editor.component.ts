import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from '../../interfaces';
import { MemoryHole } from '../../stores/memory-hole';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-category-editor',
    templateUrl: './category-editor.component.html',
    styleUrls: ['./category-editor.component.scss'],
})
export class CategoryEditorComponent implements OnInit {

    @Input() category?: ICategory;

    constructor(
        private store: MemoryHole,
        private modal: ModalController,
    ) {

    }

    ngOnInit() { }

    public async close(): Promise<void> {
        await this.modal.dismiss();
    }

    public colorChanged(color: string): void {
        if (!this.category) { return; }
        this.category.color = color;
    }

    public nameChanged(event: any): void {
        if (!this.category) { return; }

        this.category.name = event.detail.value;
    }

    public async update() {
        await this.store.updateSingle('categories', this.category);
        await this.close();
    }
}

import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { IList, IAppData } from '../../interfaces';
import { MemoryHole } from '../../stores/memory-hole';
import { UtilitiesService } from '../../utilities.service';

@Component({
    selector: 'app-list-editor',
    templateUrl: './list-editor.component.html',
    styleUrls: ['./list-editor.component.scss'],
})
export class ListEditorComponent implements OnInit {

    @Input() list?: IList;

    private lists: IList[] = [];
    private isNewList: boolean;

    public buttonText: string = "save";
    public title: string = 'Edit';

    constructor(
        private alert: AlertController,
        private modal: ModalController,
        private store: MemoryHole,
        private helper: UtilitiesService
    ) {
        this.store.data.subscribe((data: IAppData) => {
            this.lists = data.lists;
        });
    }

    ngOnInit() {
        if (!this.list) {
            this.list = {
                name: '',
                id: this.store.createId(),
                itemIds: [],
                completedItemIds: [],
                showCompletedItems: true
            };

            this.isNewList = true;
            this.buttonText = 'Create';
            this.title = 'Create New List';
        } else {
            this.isNewList = false;
            this.title += ' ' + this.list.name;
        }
    }

    private checkForDuplicate(): boolean {
        let existingList: IList = this.lists.find((list: IList) => {
            return list.name.toLowerCase() === this.list.name.toLowerCase();
        });

        if (existingList) { return true; }
        return false;
    }

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
        if (this.isNewList) {
            await this.create();
        } else {
            await this.update();
        }
    }

    public async update(): Promise<void> {
        await this.store.updateSingle('lists', this.list);
        await this.close();
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

        await this.store.add('lists', this.list);
        await this.close();
    }
}

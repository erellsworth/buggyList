import { Component, OnInit, Input } from '@angular/core';
import { IListItem, IList } from '../../interfaces';

@Component({
    selector: 'app-item-editor',
    templateUrl: './item-editor.component.html',
    styleUrls: ['./item-editor.component.scss'],
})
export class ItemEditorComponent implements OnInit {

    @Input() item: IListItem;
    @Input() list: IList;

    constructor() { }

    ngOnInit() { }

}

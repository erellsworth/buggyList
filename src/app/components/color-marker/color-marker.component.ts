import { Component, OnInit, Input } from '@angular/core';
import { IListItem } from '../../interfaces';


/**
 * Color hierarchy:
 *
 * Item color
 * list color
 *
 */
@Component({
    selector: 'app-color-marker',
    templateUrl: './color-marker.component.html',
    styleUrls: ['./color-marker.component.scss'],
})
export class ColorMarkerComponent implements OnInit {

    @Input() color: string;
    @Input() item?: IListItem;


    constructor() { }

    ngOnInit() {

    }

    public getColor(): string {
        if (this.item && this.item.color) {
            return this.item.color;
        }

        return this.color;
    }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-color-marker',
    templateUrl: './color-marker.component.html',
    styleUrls: ['./color-marker.component.scss'],
})
export class ColorMarkerComponent implements OnInit {

    @Input() color: string;

    constructor() { }

    ngOnInit() { }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-color-input',
    templateUrl: './color-input.component.html',
    styleUrls: ['./color-input.component.scss'],
})
export class ColorInputComponent implements OnInit {

    @Input() color: string;
    @Output() onUpdate: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    colorSelected(color: string) {
        console.log('color', color);
        this.onUpdate.emit(color);
    }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-color-input',
    templateUrl: './color-input.component.html',
    styleUrls: ['./color-input.component.scss'],
})
export class ColorInputComponent implements OnInit {

    @Output() onUpdate: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    colorSelected(color: string) {
        console.log('color', color);
        this.onUpdate.emit(color);
    }
}

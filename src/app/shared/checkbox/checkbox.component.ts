import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'my-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

    @Input() id: string | number = '';
    @Input() description? = '';

    @Output() valueChanged$ = new EventEmitter();

    selected = false;

    get value() {
        return this.selected;
    }

    get validity() {
        const input = document.createElement('input');
        return input.validity;
    }

    onSelect() {
        this.selected = !this.selected;
        this.valueChanged$.emit(this.selected);
    }

}
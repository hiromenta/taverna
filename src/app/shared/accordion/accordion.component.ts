import { Component, Input } from "@angular/core";

@Component({
    selector: 'my-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {

    @Input() title = '';

    show = false;

    constructor() {}

    toggle() {
        this.show = !this.show;
    }

}
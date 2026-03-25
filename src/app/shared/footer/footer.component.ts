import { Component, HostListener } from "@angular/core";

@Component({
    selector: 'my-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    pageSize = window.screen.width;

    constructor() {}

    @HostListener('window:resize', [])
    onResize() {
        this.pageSize = window.screen.width;
    }

    isSmallSize() {
        return this.pageSize < 750;
    }

}
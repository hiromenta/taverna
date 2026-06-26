import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { Paths } from "../../app-routing.module";

@Component({
    selector: 'my-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    pageSize = window.screen.width;

    constructor(private _router: Router) {}

    @HostListener('window:resize', [])
    onResize() {
        this.pageSize = window.screen.width;
    }

    isSmallSize() {
        return this.pageSize < 750;
    }

    goHome() {
        this._router.navigate([Paths.HOME]);
    }

}
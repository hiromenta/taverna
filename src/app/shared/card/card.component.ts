import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Paths } from "../../app-routing.module";

@Component({
    selector: 'my-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {

    @Input() id: string = '';

    constructor(private _router: Router) {}

    navigate() {
        this._router.navigate([Paths.SHOP, Paths.PRODUCT], { queryParams: { id: this.id } });
    }

}
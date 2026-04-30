import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Paths } from "../../app-routing.module";
import { Product } from "../../models/product.model";

@Component({
    selector: 'my-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {

    @Input() product?: Product;

    constructor(private _router: Router) {}

    navigate() {
        this._router.navigate([Paths.SHOP, Paths.PRODUCT], { queryParams: { id: this.product?.id } });
    }

}
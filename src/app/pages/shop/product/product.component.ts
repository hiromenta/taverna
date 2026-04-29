import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Paths } from "../../../app-routing.module";

@Component({
    selector: 'my-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {

    amount = 1;
    max = Infinity;

    constructor(private _router: Router) {}

    navigateShop() {
        this._router.navigate([Paths.SHOP]);
    }

    decrease() {
        this.amount--;

        if (this.amount <= 0) {
            this.amount = 1;
        }
    }

    increase() {
        this.amount++;

        if (this.amount > this.max) {
            this.amount = this.max;
        }
    }

}
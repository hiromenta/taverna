import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Paths } from "../../../app-routing.module";

@Component({
    selector: 'my-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {

    constructor(private _router: Router) {}

    navigateShop() {
        this._router.navigate([Paths.SHOP]);
    }

}
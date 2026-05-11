import { Component, Input } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { Paths } from "../../../../app-routing.module";
import { Router } from "@angular/router";
import { ProductTypes } from "../../../../models/product.model";

@UntilDestroy()
@Component({
    selector: 'my-shop-menu-item',
    templateUrl: './shop-menu-item.component.html',
    styleUrls: ['./shop-menu-item.component.scss']
})
export class ShopMenuItemComponent {

    @Input() id?: ProductTypes;
    @Input() description = '';

    constructor(private _router: Router) {}

    navigateToShop() {
        this._router.navigate([Paths.SHOP], { queryParams: { type: this.id } });
    }

}
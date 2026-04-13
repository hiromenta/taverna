import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../../services/products.service";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

// TODO: add this everywhere there's a subscription
@UntilDestroy()
@Component({
    selector: 'my-featured',
    templateUrl: 'featured.component.html',
    styleUrls: ['featured.component.scss']
})
export class FeaturedComponent implements OnInit {

    constructor(private _productsService: ProductsService) {}

    ngOnInit(): void {
        // this._productsService
    }

}
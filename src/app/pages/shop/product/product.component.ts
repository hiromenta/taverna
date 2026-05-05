import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Paths } from "../../../app-routing.module";
import { LoaderService } from "../../../services/loader.service";
import { ProductsService } from "../../../services/products.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Product } from "../../../models/product.model";
import { UtilsService } from "../../../services/utils.service";

@UntilDestroy()
@Component({
    selector: 'my-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {

    product?: Product;

    amount = 1;

    constructor(private _router: Router, private _route: ActivatedRoute, private _loaderService: LoaderService, private _productsService: ProductsService, private _utilsService: UtilsService) {}

    ngOnInit(): void {
        this._loaderService.show();

        this._productsService.getProduct(this._route.snapshot.queryParams['id'])
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    this.product = res as Product;
                },
                error: (err) => {
                    this._loaderService.hide();
                    // TODO: implementare modale errore
                }
            });
    }

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

        if (this.amount > (this.product?.availability || Infinity)) {
            this.amount = (this.product?.availability || Infinity);
        }
    }

    addToCart() {
        if (this.product) {
            try {
                this._utilsService.addToCart(this.product, this.amount);
            } catch(e) {
                // todo: implementa modale errore
            }
        }
    }

}
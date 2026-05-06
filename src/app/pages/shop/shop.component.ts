import { Component } from "@angular/core";
import { Product } from "../../models/product.model";
import { LoaderService } from "../../services/loader.service";
import { ProductsService } from "../../services/products.service";
import { NotificationsService } from "../../services/notification.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'my-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

    products: Product[] = [];

    constructor(private _loaderService: LoaderService, private _productsService: ProductsService, private _notificationsService: NotificationsService) {}

    ngOnInit(): void {
        this._loaderService.show();

        this._productsService.getProducts()
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    this.products = (res as { products: Product[], size: number })?.products || [];
                },
                error: (err) => {
                    this._loaderService.hide();

                    if (err.error.code !== 'ER_NO_ITEMS') {
                        this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                    }
                }
            });
    }

}
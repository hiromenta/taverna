import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../../services/products.service";
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Product } from "../../../models/product.model";
import { LoaderService } from "../../../services/loader.service";
import { NotificationsService } from "../../../services/notification.service";

@UntilDestroy()
@Component({
    selector: 'my-featured',
    templateUrl: 'featured.component.html',
    styleUrls: ['featured.component.scss']
})
export class FeaturedComponent implements OnInit {

    products: Product[] = [];

    constructor(private _loaderService: LoaderService, private _productsService: ProductsService, private _notificationsService: NotificationsService) {}

    ngOnInit(): void {
        this._loaderService.show();

        this._productsService.getFeaturedProducts()
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    this.products = (res as { products: Product[], size: number })?.products || [];
                },
                error: (err) => {
                    this._loaderService.hide();
                    this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                }
            });
    }

}
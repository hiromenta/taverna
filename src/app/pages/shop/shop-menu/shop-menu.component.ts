import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ProductTypes } from "../../../models/product.model";
import { LoaderService } from "../../../services/loader.service";
import { ProductsService } from "../../../services/products.service";
import { NotificationsService } from "../../../services/notification.service";

@UntilDestroy()
@Component({
    selector: 'my-shop-menu',
    templateUrl: './shop-menu.component.html',
    styleUrls: ['./shop-menu.component.scss']
})
export class ShopMenuComponent implements OnInit {

    types: { id: ProductTypes; description: string }[] = [];

    constructor(private _loaderService: LoaderService, private _productsService: ProductsService, private _notificationsService: NotificationsService) {}
    
    ngOnInit(): void {
        this._loaderService.show();

        this._productsService.getGameTypes()
            .pipe(
                untilDestroyed(this)
            )
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    this.types = (res as { types: { id: number; description: string; hidden: boolean }[] }).types.filter(t => !t.hidden) || [];
                },
                error: (err) => {
                    this._loaderService.hide();
                    this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                }
            });
    }

}
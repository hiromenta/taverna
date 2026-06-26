import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Paths } from "../../../app-routing.module";
import { LoaderService } from "../../../services/loader.service";
import { ProductsService } from "../../../services/products.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Product } from "../../../models/product.model";
import { UtilsService } from "../../../services/utils.service";
import { NotificationsService } from "../../../services/notification.service";
import { UserService } from "../../../services/user.service";
import { ConfigService } from "../../../services/config.service";

@UntilDestroy()
@Component({
    selector: 'my-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {

    product?: Product;

    amount = 1;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _loaderService: LoaderService,
        private _productsService: ProductsService,
        private _utilsService: UtilsService,
        private _notificationsService: NotificationsService,
        private _userService: UserService,
        private _configService: ConfigService
    ) {}

    ngOnInit(): void {
        if (!this._route.snapshot.queryParams['id']) {
            this._router.navigate([Paths.SHOP]);
            return;
        }

        this._loaderService.show();

        this._productsService.getProduct(this._route.snapshot.queryParams['id'])
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    this.product = res as Product;

                    if (this.product.availability === 0) {
                        this.amount = 0;
                    }
                },
                error: (err) => {
                    this._loaderService.hide();

                    this._router.navigate([Paths.SHOP]).then(() => {
                        this._notificationsService.deleteAllNotifications();
                        this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                        this._loaderService.hide();
                    });
                }
            });
    }

    getAppConfig() {
        return this._configService.getAppConfig();
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

        if (this.product?.availability === -1) {
            return;
        }

        if (this.amount > (this.product?.availability ?? Infinity)) {
            this.amount = (this.product?.availability ?? Infinity);
        }
    }

    addToCart() {
        if (this.product) {
            try {
                this._utilsService.addToCart(this.product, this.amount);
            } catch(e: any) {
                this._notificationsService.addNotification('warning', 'error.' + e.error);
            }
        }
    }

    toggleFavorite() {
        if (!this.isFavorite()) {
            this._addFavorite();
        } else {
            this._removeFavorite();
        }
    }

    private _addFavorite() {
        if (this.product) {
            this._userService.addFavorite(this.product.id)
                .pipe(untilDestroyed(this))
                .subscribe({
                    next: (res) => {
                        this._userService.favorites.push(this.product!.id);
                    },
                    error: (err) => {
                        this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                    }
                });
        }
    }

    private _removeFavorite() {
        if (this.product) {
            this._userService.removeFavorite(this.product.id)
                .pipe(untilDestroyed(this))
                .subscribe({
                    next: (res) => {
                        const idx = this._userService.favorites.indexOf(this.product!.id);
                        this._userService.favorites.splice(idx, 1);
                    },
                    error: (err) => {
                        this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                    }
                });
        }
    }

    isFavorite() {
        if (!this.product) {
            return false;
        }

        return this._userService.favorites.includes(this.product!.id);
    }

}
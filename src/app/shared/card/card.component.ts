import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Paths } from "../../app-routing.module";
import { Product } from "../../models/product.model";
import { UtilsService } from "../../services/utils.service";
import { NotificationsService } from "../../services/notification.service";
import { UserService } from "../../services/user.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { LoaderService } from "../../services/loader.service";

@UntilDestroy()
@Component({
    selector: 'my-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {

    @Input() product?: Product;

    constructor(private _router: Router, private _utilsService: UtilsService, private _notificationsService: NotificationsService, private _userService: UserService, private _loaderService: LoaderService) {}

    navigate() {
        this._router.navigate([Paths.SHOP, Paths.PRODUCT], { queryParams: { id: this.product?.id } });
    }

    addToCart() {
        if (this.product) {
            try {
                this._utilsService.addToCart(this.product, 1);
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
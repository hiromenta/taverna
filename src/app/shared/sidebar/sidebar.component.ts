import { Component, OnInit } from "@angular/core";
import { Sidebar, SidebarService } from "../../services/sidebar.service";
import { Product } from "../../models/product.model";
import { UserService } from "../../services/user.service";
import { ProductsService } from "../../services/products.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { LoaderService } from "../../services/loader.service";
import { NotificationsService } from "../../services/notification.service";
import { Router } from "@angular/router";
import { Paths } from "../../app-routing.module";
import { ControlType, MyForm } from "../../models/form.model";

@UntilDestroy()
@Component({
    selector: 'my-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    showing?: Sidebar;
    closing = false;
    showCheckout = false;

    products: { product: Product; quantity: number }[] = [];

    form: MyForm = {
        controls: [
            { selector: 'ship', type: ControlType.CHECKBOX, description: 'sidebar.ship' },
            { selector: 'open', type: ControlType.CHECKBOX, description: 'sidebar.open' }
        ]
    };

    constructor(
        private _sidebarService: SidebarService,
        private _userService: UserService,
        private _productsService: ProductsService,
        private _loaderService: LoaderService,
        private _notificationsService: NotificationsService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._sidebarService.changeSidebar$.subscribe(res => {
            if (!res) {
                this._close();
            } else {
                this._open(res);
            }
        });
    }

    close() {
        this._sidebarService.close();
    }

    remove(id: number) {
        switch (this.showing) {
            case 'cart':
                this._removeCart(id);
                break
            case 'favorites':
                this._removeFavorite(id);
                break
        }
    }

    private _removeFavorite(id: number) {
        this._userService.removeFavorite(id)
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (res) => {
                    const idxF = this._userService.favorites.indexOf(id);
                    this._userService.favorites.splice(idxF, 1);

                    const idxP = this.products.findIndex(p => p.product.id === id);
                    this.products.splice(idxP, 1);
                },
                error: (err) => {
                    this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                }
            });
    }

    private _removeCart(id: number) {
        const product = this.products.find(p => p.product.id === id);

        if (product) {
            product.quantity--;
        }

        if (product!.quantity <= 0) {
            const idx = this.products.findIndex(p => p.product.id === id);
            this.products.splice(idx, 1);
        }

        localStorage.setItem('cart', JSON.stringify(this.products));
    }

    private _close() {
        this.closing = true;

        setTimeout(() => {
            this.showing = undefined;
            this.closing = false;
        }, 501);
    }

    private _open(type: Sidebar) {
        this.showing = type;

        switch (type) {
            case 'cart':
                this.showCheckout = this._userService.authenticated;
                this.products = JSON.parse(localStorage.getItem('cart') || '[]');
                break
            case 'favorites':
                this.showCheckout = false;

                this._productsService.getProducts({ ids: this._userService.favorites })
                    .pipe(untilDestroyed(this))
                    .subscribe({
                        next: (res) => {
                            this._loaderService.hide();
                            this.products = (res as { products: Product[] })?.products?.map(p => ({ product: p, quantity: 1 })) || [];
                        },
                        error: (err) => {
                            this._loaderService.hide();
                            this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                        }
                    });
                break
        }
    }

    checkout() {
        if (!this._userService.user?.firstName) {
            this._router.navigate([Paths.USER, Paths.EDIT_PROFILE]).then(() => {
                this.close();
                this._notificationsService.addNotification('warning', 'error.ER_FIRSTNAME_MISSING');
            });

            return;
        }

        if (!this._userService.user?.lastName) {
            this._router.navigate([Paths.USER, Paths.EDIT_PROFILE]).then(() => {
                this.close();
                this._notificationsService.addNotification('warning', 'error.ER_LASTNAME_MISSING');
            });

            return;
        }

        if (!this._userService.user?.address) {
            this._router.navigate([Paths.USER, Paths.EDIT_PROFILE]).then(() => {
                this.close();
                this._notificationsService.addNotification('warning', 'error.ER_ADDRESS_MISSING');
            });

            return;
        }

        if (!this._userService.user?.city) {
            this._router.navigate([Paths.USER, Paths.EDIT_PROFILE]).then(() => {
                this.close();
                this._notificationsService.addNotification('warning', 'error.ER_CITY_MISSING');
            });

            return;
        }

        if (!this._userService.user?.zipCode) {
            this._router.navigate([Paths.USER, Paths.EDIT_PROFILE]).then(() => {
                this.close();
                this._notificationsService.addNotification('warning', 'error.ER_ZIPCODE_MISSING');
            });

            return;
        }

        this._doCheckout();
    }

    private _doCheckout() {
        this._loaderService.show();

        this._productsService.createCheckoutSession(this.products, this.form.value?.['ship'], this.form.value?.['open'])
            .pipe(
                untilDestroyed(this)
            )
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    location.href = res.url;
                },
                error: (err) => {
                    this._loaderService.hide();
                    this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                }
            });
    }

}
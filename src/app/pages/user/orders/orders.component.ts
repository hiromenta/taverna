import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { Games, Order, Product, ProductTypes } from "../../../models/product.model";
import { LoaderService } from "../../../services/loader.service";
import { NotificationsService } from "../../../services/notification.service";
import { Role, User } from "../../../models/user.model";

@UntilDestroy()
@Component({
    selector: 'my-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    private _orders: Order[] = [];

    constructor(private _userService: UserService, private _router: Router, private _loaderService: LoaderService, private _notificationsService: NotificationsService) {}

    ngOnInit(): void {
        this._loaderService.show();

        this._userService.getOrders(this._userService.user?.role === Role.ADMIN)
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    this._orders = res.orders;
                },
                error: (err) => {
                    this._loaderService.hide();
                    this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                }
            });
    }

    getOrders() {
        return this._orders.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        });
    }

    isAdmin() {
        return this._userService.user?.role === Role.ADMIN;
    }

    loadOrderInfo(id: number) {
        if (this._userService.user?.role !== Role.ADMIN) {
            return;
        }

        this._loaderService.show();

        this._userService.loadOrderInfo(id)
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();

                    const user = res.user as User;
                    const games = res.games as { id: Games, description: string }[];
                    const productTypes = res.productTypes as { id: ProductTypes, description: string }[];
                    const quantities = res.quantities as { id: number, quantity: number }[];

                    let details = `
                        username: ${user.username}
                        nome completo: ${user.firstName} ${user.lastName}
                        telefono: ${user.phone || '-'}
                        email: ${user.email || '-'}
                        indirizzo: ${user.address}, ${user.city} ${user.zipCode}\n
                        prodotti:
                    `;

                    for (const p of (res.products || [])) {
                        const product = p as Product;
                        const game = games.find(g => g.id === product.game)?.description;
                        const productType = productTypes.find(p => p.id === product.type)?.description;
                        const quantity = quantities.find(q => q.id === product.id)?.quantity || 1;

                        const price = product.price * quantity;
                        const unitPrice = price.toString().split('.')[0];
                        const decimalPrice = price.toString().split('.')[1]?.slice(0, 2);
                        const wholePrice = decimalPrice ? `${unitPrice}.${decimalPrice}` : unitPrice;

                        details += `- x${quantity} (${product.brand}) ${product.name} [${game}:${productType}] | ${wholePrice}€\n`;
                    }

                    details += `\nnote sull'ordine: ${res.order.note || '-'}`;

                    alert(details)
                },
                error: (err) => {
                    this._loaderService.hide();
                    this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                }
            });;
    }

}
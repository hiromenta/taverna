import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { Paths } from "../../../app-routing.module";
import { Order, OrderStatuses } from "../../../models/product.model";
import { LoaderService } from "../../../services/loader.service";
import { NotificationsService } from "../../../services/notification.service";

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

        this._userService.getOrders()
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
        return this._orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

}
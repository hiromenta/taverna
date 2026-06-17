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
    selector: 'my-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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

    edit() {
        this._router.navigate([Paths.USER, Paths.EDIT_PROFILE]);
    }

    getUser() {
        return this._userService.user;
    }

    getUserAvatar() {
        return this._userService.user?.avatarUrl;
    }

    getUserPoster() {
        return this._userService.user?.posterUrl;
    }

    getOrdersNumber() {
        return this._orders?.length || 0;
    }

    getFavouritesNumber() {
        return this._userService?.favorites?.length || 0;
    }

    getShippedOrdersNumber() {
        return this._orders?.filter(o => o.status === OrderStatuses.SHIPPED)?.length || 0;
    }

}
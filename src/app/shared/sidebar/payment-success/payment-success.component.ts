import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "../../../services/notification.service";
import { Router } from "@angular/router";
import { Paths } from "../../../app-routing.module";
import { UtilsService } from "../../../services/utils.service";

@Component({
    selector: 'my-payment-success',
    template: ''
})
export class PaymentSuccessComponent implements OnInit {

    constructor(private _notificationService: NotificationsService, private _router: Router, private _utilsService: UtilsService) {}

    ngOnInit(): void {
        this._notificationService.deleteAllNotifications();
        this._notificationService.addNotification('success', 'user.checkout.success');
        localStorage.setItem('cart', '[]');
        this._router.navigate([Paths.USER, Paths.ORDERS]);
    }

}
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Paths } from "../../app-routing.module";
import { Product } from "../../models/product.model";
import { UtilsService } from "../../services/utils.service";
import { NotificationsService } from "../../services/notification.service";

@Component({
    selector: 'my-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {

    @Input() product?: Product;

    constructor(private _router: Router, private _utilsService: UtilsService, private _notificationsService: NotificationsService) {}

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

}
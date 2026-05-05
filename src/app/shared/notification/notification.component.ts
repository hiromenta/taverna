import { Component, OnInit } from "@angular/core";
import { Notification } from "../../models/notification.model";
import { NotificationsService } from "../../services/notification.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'my-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

    constructor(private _notificationsService: NotificationsService) {}

    ngOnInit(): void {
        this._notificationsService.deleteNotification$
            .pipe(untilDestroyed(this))
            .subscribe((id) => {
                document.querySelector('#' + this.getId(id))?.classList.add('hide');
            });
    }

    getId(id: number) {
        return 'n' + id.toString().replace('.', '');
    }

    getNotifications(): Notification[] {
        return this._notificationsService.getNotifications();
    }

}
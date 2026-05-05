import { Injectable } from "@angular/core";
import { Notification } from "../models/notification.model";
import { Subject } from "rxjs";

@Injectable()
export class NotificationsService {

    deleteNotification$ = new Subject<number>();

    private _notifications: Notification[] = [];

    constructor() {}

    getNotifications() {
        return this._notifications;
    }

    addNotification(type: 'success' | 'warning' | 'danger', message: string) {
        const id = Math.random();

        this._notifications.push({ id, type, message });

        setTimeout(() => {
            this.deleteNotification$.next(id);

            setTimeout(() => {
                const idx = this._notifications.findIndex(n => n.id === id);
                this._notifications.splice(idx, 1);
            }, 200);
        }, 5000);
    }

}
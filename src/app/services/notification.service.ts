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

    addNotification(type: 'success' | 'warning' | 'danger', message: string, canClose = true) {
        const id = Math.random();

        this._notifications.push({ id, type, message, canClose });

        setTimeout(() => {
            this.deleteNotification(id);
        }, 5000);
    }

    deleteNotification(id: number) {
        if (!this._notifications.map(n => n.id).includes(id)) {
            return;
        }

        this.deleteNotification$.next(id);

        setTimeout(() => {
            this._cancelNotification(id);
        }, 200);
    }

    private _cancelNotification(id: number) {
        const idx = this._notifications.findIndex(n => n.id === id);

        if (!idx) {
            return;
        }

        this._notifications.splice(idx, 1);
    }

}
import { Component } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { Paths } from "../../app-routing.module";
import { LoaderService } from "../../services/loader.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { NotificationsService } from "../../services/notification.service";

@UntilDestroy()
@Component({
    selector: 'my-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent {

    active = 0;

    buttons = [
        { label: 'user.menu.profile', icon: 'profilo.svg', url: Paths.USER }
    ];

    constructor(private _userService: UserService, private _router: Router, private _loaderService: LoaderService, private _notificationsService: NotificationsService) {}

    logout() {
        this._userService.logout();
        this._router.navigate([Paths.HOME]);
    }

    isActive(button: typeof this.buttons[0]) {
        return this.buttons.indexOf(button) === this.active;
    }

    onAvatarSelected(event: Event) {
        const input = event.target as HTMLInputElement;

        if (!input.files?.length) {
            return;
        }

        this._loaderService.show();

        this._userService.uploadAvatar(input.files[0])
            .pipe(untilDestroyed(this))
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                },
                error: (err) => {
                    this._loaderService.hide();
                    this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                }
            });
    }

}
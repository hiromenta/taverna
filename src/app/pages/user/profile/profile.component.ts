import { Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../../services/loader.service";
import { NotificationsService } from "../../../services/notification.service";
import { Paths } from "../../../app-routing.module";

@UntilDestroy()
@Component({
    selector: 'my-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

    values = [
        { label: 'user.profile.values.orders', amount: 0 },
        { label: 'user.profile.values.favourites', amount: this.getFavouritesNumber() },
        { label: 'user.profile.values.shipping', amount: 0 }
    ];

    constructor(private _userService: UserService, private _router: Router, private _loaderService: LoaderService, private _notificationsService: NotificationsService) {}

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

    onPosterSelected(event: Event) {
        const input = event.target as HTMLInputElement;

        if (!input.files?.length) {
            return;
        }

        this._loaderService.show();

        this._userService.uploadPoster(input.files[0])
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

    getFavouritesNumber() {
        return this._userService.favorites.length;
    }

}
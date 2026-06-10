import { Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
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

    constructor(private _userService: UserService, private _router: Router) {}

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
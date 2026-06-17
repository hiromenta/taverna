import { AfterViewInit, Component } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { Paths } from "../../app-routing.module";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'my-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {

    active = 0;
    activeButton?: any;

    buttons = [
        { label: 'user.menu.profile', icon: 'profilo.svg', url: Paths.PROFILE },
        { label: 'user.menu.edit_profile', icon: 'modifica_profilo.svg', url: Paths.EDIT_PROFILE },
        { label: 'user.menu.orders', icon: 'ordini.svg', url: Paths.ORDERS }
    ];

    constructor(private _userService: UserService, private _router: Router) {}

    ngAfterViewInit(): void {
        if (!this.activeButton) {
            this._router.navigate([Paths.USER, Paths.PROFILE]);
        }
    }

    logout() {
        this._userService.logout();
        this._router.navigate([Paths.HOME]);
    }

    isActive(button: typeof this.buttons[0]) {
        const paths = location.pathname.split('/');
        const path = paths[paths.length - 1];

        const isActive = button.url === path;

        if (isActive) {
            this.activeButton = button;
        } else {
            this.activeButton = undefined;
        }

        return isActive;
    }

    navigateUrl(button: typeof this.buttons[0]) {
        this._router.navigate([Paths.USER, button.url]);
    }

}
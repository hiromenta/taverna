import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Paths } from "../app-routing.module";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private _userService: UserService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this._canActivate(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this._canActivate(childRoute, state);
    }

    private _canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._userService.authenticated) {
            return true;
        }

        this._router.navigate([Paths.LOGIN]);

        return false;
    }

}
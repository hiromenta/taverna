import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Paths } from "../app-routing.module";
import { UserService } from "../services/user.service";
import { ConfigService } from "../services/config.service";
import { firstValueFrom, lastValueFrom } from "rxjs";

@Injectable()
export class FeatureGuard implements CanActivate, CanActivateChild {

    constructor(private _userService: UserService, private _router: Router, private _configService: ConfigService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this._canActivate(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this._canActivate(childRoute, state);
    }

    private async _canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const appConfig = await firstValueFrom(this._configService.getAppConfig());

        if (!appConfig.isWebsiteLive) {
            this._router.navigate([Paths.WORK_IN_PROGRESS]);
            return false;
        }

        const { grantAll, grantNone, grant } = route?.data;

        if (grantNone) {
            return this._fallBack();
        }

        if (!this._userService.user) {
            await lastValueFrom(this._userService.getUserData());
        }

        if (grantAll || grant.includes(this._userService.user?.role || 0)) {
            return true;
        }

        return this._fallBack();
    }

    private _fallBack() {
        this._router.navigate([Paths.HOME]);
        return false;
    }

}
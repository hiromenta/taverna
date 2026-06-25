import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Paths } from "../app-routing.module";
import { ConfigService } from "../services/config.service";
import { firstValueFrom } from "rxjs";

@Injectable()
export class WIPGuard implements CanActivate, CanActivateChild {

    constructor(private _router: Router, private _configService: ConfigService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this._canActivate(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this._canActivate(childRoute, state);
    }

    private async _canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const appConfig = await firstValueFrom(this._configService.getAppConfig());

        if (route.routeConfig?.path === Paths.WORK_IN_PROGRESS && appConfig.isWebsiteLive) {
            this._router.navigate([Paths.HOME]);
            return false;
        }

        return true;
    }

}
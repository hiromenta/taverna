import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Paths } from "../app-routing.module";
import { FeaturesService } from "../services/features.service";

@Injectable()
export class FeatureGuard implements CanActivate, CanActivateChild {

    constructor(private _featuresService: FeaturesService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this._canActivate(route, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this._canActivate(childRoute, state);
    }

    private _canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const { grantAll, grantNone, grant } = route?.data;

        if (grantNone) {
            return this._fallBack();
        }

        if (grantAll || grant.includes(this._featuresService.activeRole)) {
            return true;
        }

        return this._fallBack();
    }

    private _fallBack() {
        this._router.navigate([Paths.HOME]);
        return false;
    }

}
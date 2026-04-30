import { Injectable } from "@angular/core";
import { ConfigService } from "./config.service";
import { Observable, of, switchMap } from "rxjs";
import { Role } from "../models/user.model";
import { AuthService } from "./auth.service";

@Injectable()
export class FeaturesService {

    constructor(private _configService: ConfigService, private _authService: AuthService) {}

    isFeatureActive(featureName: string, role?: Role): Observable<{ feature: string, active: boolean, reason?: string }> {
        return this._configService.getFeaturesConfig().pipe(
            switchMap((features) => {
                const feature = features?.find(f => f.name === featureName);

                if (!feature) {
                    return of(this._buildResponse(featureName, false, 'Feature not found'));
                }

                if (!feature.enabled) {
                    return of(this._buildResponse(featureName, false, 'Feature is disabled'));
                }

                if (feature.grantNone || (feature.grant?.length && !feature.grant?.includes(role || (this._authService.user?.role as Role) || 0))) {
                    return of(this._buildResponse(featureName, false, `Role not granted (Needs: ${feature.grant?.join(', ')} - Selected: ${role || (this._authService.user?.role as Role) || 0})`));
                }

                if (feature.grantAll || feature.grant?.includes(role || (this._authService.user?.role as Role) || 0)) {
                    return of(this._buildResponse(featureName, true));
                }

                return of(this._buildResponse(featureName, false, 'Access denied for unknown reason'));
            })
        );
    }

    private _buildResponse(featureName: string, active: boolean, reason?: string) {
        return { feature: featureName, active, reason };
    }

}
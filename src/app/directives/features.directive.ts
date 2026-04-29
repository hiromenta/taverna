import { Directive, ElementRef, Input, OnChanges } from "@angular/core";
import { FeaturesService } from "../services/features.service";
import { AuthService } from "../services/auth.service";
import { switchMap } from "rxjs";

@Directive({
    selector: '[myFeature]'
})
export class FeaturesDirective implements OnChanges {

    @Input('myFeature') feature = '';

    constructor(readonly el: ElementRef<HTMLElement>, private _featuresService: FeaturesService, private _authService: AuthService) {}

    ngOnChanges(): void {
        this._featuresService.isFeatureActive(this.feature).subscribe(res => {
            this._manage(res);
        });

        this._authService.roleChanged$
            .pipe(
                switchMap((role) => this._featuresService.isFeatureActive(this.feature, role))
            )
            .subscribe(res => {
                this._manage(res);
            });
    }

    private _manage(res: any) {
        if (!res.active) {
            this.el.nativeElement.style.setProperty('display', 'none', 'important');
        } else {
            this.el.nativeElement.style.setProperty('display', 'unset');
        }
    }

}
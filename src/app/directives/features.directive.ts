import { Directive, ElementRef, Input, OnChanges, OnInit } from "@angular/core";
import { FeaturesService } from "../services/features.service";
import { switchMap } from "rxjs";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { UserService } from "../services/user.service";

@UntilDestroy()
@Directive({
    selector: '[myFeature]'
})
export class FeaturesDirective implements OnInit, OnChanges {

    @Input('myFeature') feature = '';

    display = '';

    constructor(readonly el: ElementRef<HTMLElement>, private _featuresService: FeaturesService, private _userService: UserService) {}

    ngOnInit(): void {
        this.display = this.el.nativeElement.style.getPropertyValue('display');
    }

    ngOnChanges(): void {
        this._featuresService.isFeatureActive(this.feature)
            .pipe(untilDestroyed(this))
            .subscribe(res => {
                this._manage(res);
            });

        this._userService.roleChanged$
            .pipe(
                untilDestroyed(this),
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
            this.el.nativeElement.style.setProperty('display', this.display);
        }
    }

}
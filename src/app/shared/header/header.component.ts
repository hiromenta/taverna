import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { TranslateService } from "../../services/translate.service";
import { ActivatedRoute, EventType, Router } from "@angular/router";
import { Paths } from "../../app-routing.module";
import { filter, switchMap } from "rxjs";

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Input() showFloatingHeader = false;

    @Output() setFloatingHeader = new EventEmitter<boolean>();

    tabs = [
        { label: 'header.tabs.carte', path: ['shop', 'cards'] },
        { label: 'header.tabs.carte', path: ['shop', 'cards'] },
        { label: 'header.tabs.carte', path: ['shop', 'cards'] }
    ];
    breadcrumbs = [];

    setDisappearingAnimation = false;

    constructor(private _translateService: TranslateService, private _router: Router, private _route: ActivatedRoute) {
        this._router.events
            .pipe(
                filter((events) => events.type === EventType.NavigationEnd),
                switchMap(() => this._route.children.at(0)!.data)
            )
            .subscribe(data => {
                this.breadcrumbs = data['breadcrumbs'] || [];
            })
    }

    @HostListener('window:scroll', [])
    onScroll() {
        if (window.scrollY >= 350) {
            this.setFloatingHeader.emit(true);
        } else {
            this.setDisappearingAnimation = true;

            setTimeout(() => {
                this.setFloatingHeader.emit(false);
                this.setDisappearingAnimation = false;
            }, 200);
        }
    }

    getTranslation(text: string) {
        return this._translateService.translate(text);
    }

    navigateHome() {
        this._router.navigate([Paths.HOME]);
    }

    navigateLogin() {
        this._router.navigate([Paths.LOGIN]);
    }

    navigateTab(path: string[]) {
        this._router.navigate(path);
    }

    navigateBreadcrumb(index: number) {
        const path = this.breadcrumbs.filter((el, i) => i <= index);
        this._router.navigate(path);
    }

}
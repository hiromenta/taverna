import { Component, HostListener } from "@angular/core";
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

    tabs = [
        { label: 'header.tabs.carte', path: ['shop', 'cards'] },
        { label: 'header.tabs.carte', path: ['shop', 'cards'] },
        { label: 'header.tabs.carte', path: ['shop', 'cards'] }
    ];
    breadcrumbs = [];

    setAppearingAnimation = false;
    setDisappearingAnimation = false;

    lastScroll = 0;

    showing = false;

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
        if (this.lastScroll < window.scrollY && this.lastScroll < 115 && window.scrollY >= 115) {
            this.setAppearingAnimation = true;

            setTimeout(() => {
                this.setAppearingAnimation = false;
                this.showing = true;
            }, 200);
        }
        
        if (this.lastScroll > window.scrollY && this.lastScroll > 200 && window.scrollY <= 200) {
            this.setDisappearingAnimation = true;

            setTimeout(() => {
                this.setDisappearingAnimation = false;
                this.showing = false;
            }, 200);
        }

        this.lastScroll = window.scrollY;
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
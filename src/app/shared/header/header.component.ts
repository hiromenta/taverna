import { Component, HostListener } from "@angular/core";
import { TranslateService } from "../../services/translate.service";
import { ActivatedRoute, EventType, Router } from "@angular/router";
import { Paths } from "../../app-routing.module";
import { filter, Observable, of, switchMap } from "rxjs";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    tabs = [
        { label: 'header.tabs.carte', path: [Paths.SHOP] },
        { label: 'header.tabs.accessori', path: [Paths.SHOP] },
        { label: 'header.tabs.live', path: [Paths.SHOP] },
        { label: 'header.tabs.spedizioni', path: [Paths.SHOP] },
        { label: 'header.tabs.nino', path: [Paths.SHOP] }
    ];
    breadcrumbs = [];

    setAppearingAnimation = false;
    setDisappearingAnimation = false;

    lastScroll = 0;

    showing = false;

    pageSize = window.screen.width;

    constructor(private _translateService: TranslateService, private _router: Router, private _route: ActivatedRoute) {
        this._router.events
            .pipe(
                untilDestroyed(this),
                filter((events) => events.type === EventType.NavigationEnd),
                switchMap(() => this._getLastChild(_route.children)?.data as Observable<any>)
            )
            .subscribe((data: any) => {
                this.breadcrumbs = data['breadcrumbs'] || [];
            })
    }

    private _getLastChild(children?: ActivatedRoute[], last?: ActivatedRoute): ActivatedRoute | undefined {
        if (!children?.length) {
            return last;
        }

        return this._getLastChild(children?.at(0)?.children, children?.at(0));
    }

    @HostListener('window:scroll', [])
    onScroll() {
        const threshold = 300;

        if (this.lastScroll < window.scrollY && this.lastScroll < (threshold - (threshold / 2 - 15)) && window.scrollY >= (threshold - (threshold / 2 - 15))) {
            this.setAppearingAnimation = true;

            setTimeout(() => {
                this.setAppearingAnimation = false;
                this.showing = true;
            }, 200);
        }
        
        if (this.lastScroll > window.scrollY && this.lastScroll > threshold && window.scrollY <= threshold) {
            this.setDisappearingAnimation = true;

            setTimeout(() => {
                this.setDisappearingAnimation = false;
                this.showing = false;
            }, 200);
        }

        this.lastScroll = window.scrollY;
    }

    @HostListener('window:resize', [])
    onResize() {
        this.pageSize = window.screen.width;
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

    isSmallSize() {
        return this.pageSize < 750;
    }

    getCartSize() {
        return JSON.parse(localStorage.getItem('cart') || '[]').length;
    }

}
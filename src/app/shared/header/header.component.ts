import { Component, HostListener, ViewChild } from "@angular/core";
import { TranslateService } from "../../services/translate.service";
import { ActivatedRoute, EventType, Router } from "@angular/router";
import { Paths } from "../../app-routing.module";
import { filter, Observable, of, switchMap } from "rxjs";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { SidebarService } from "../../services/sidebar.service";
import { UserService } from "../../services/user.service";
import { ControlType, MyForm } from "../../models/form.model";
import { FormComponent } from "../form/form.component";

@UntilDestroy()
@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    tabs = [
        { label: 'header.tabs.carte', path: [Paths.SHOP_MENU] },
        // { label: 'header.tabs.accessori', path: [Paths.] },
        { label: 'header.tabs.live', path: [Paths.LIVE] },
        // { label: 'header.tabs.spedizioni', path: [Paths.] },
        // { label: 'header.tabs.nino', path: [Paths.] }
    ];
    breadcrumbs = [];

    setAppearingAnimation = false;
    setDisappearingAnimation = false;

    lastScroll = 0;

    showing = false;

    pageSize = window.screen.width;

    @ViewChild('searchFormComponent') searchFormComponent?: FormComponent;
    searchForm: MyForm = { controls: [ { selector: 'searchHeader', type: ControlType.TEXT, placeholder: this.getTranslation('header.search.placeholder'), errors: [] }] };

    constructor(private _translateService: TranslateService, private _router: Router, private _route: ActivatedRoute, private _sidebarService: SidebarService, private _userService: UserService) {
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

    getFavoritesSize() {
        return this._userService.favorites.length;
    }

    getCartSize() {
        return JSON.parse(localStorage.getItem('cart') || '[]').length;
    }

    mapBreadcrumb(breadcrumb: string) {
        if (breadcrumb.includes('-')) {
            return breadcrumb.split('-').join(' ');
        }

        return breadcrumb;
    }

    openFavorites() {
        this._sidebarService.showFavorites();
    }

    openCart() {
        this._sidebarService.showCart();
    }

    goToUser() {
        this._router.navigate([Paths.USER]);
    }

    getUserAvatar() {
        return this._userService.user?.avatarUrl;
    }

    @HostListener('keydown', ['$event'])
    search(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            const value = this.searchForm.value?.['searchHeader'] || '';
            this.searchFormComponent?.updateText('searchHeader', '');
            this._router.navigate([Paths.SHOP], { queryParams: { search: value } });
        }
    }

}
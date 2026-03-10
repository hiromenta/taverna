import { Component } from "@angular/core";
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
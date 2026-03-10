import { Component } from "@angular/core";
import { TranslateService } from "../../services/translate.service";
import { Router } from "@angular/router";
import { Paths } from "../../app-routing.module";

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(private _translateService: TranslateService, private _router: Router) {}

    getTranslation(text: string) {
        return this._translateService.translate(text);
    }

    navigateHome() {
        this._router.navigate([Paths.HOME]);
    }

    navigateLogin() {
        this._router.navigate([Paths.LOGIN]);
    }

}
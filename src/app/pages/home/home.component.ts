import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Paths } from "../../app-routing.module";

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(private _router: Router) {}

    navigateShop() {
        this._router.navigate([Paths.SHOP_MENU]);
    }

}
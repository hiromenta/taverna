import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../services/loader.service";

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(private _authService: AuthService, private _router: Router, private _loaderService: LoaderService) {}

    login() {
        this._loaderService.show();

        this._authService.login('', '').subscribe(() => {
            this._loaderService.hide();
            this._router.navigate(['']);
        });
    }

}
import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../services/loader.service";
import { ControlType, MyForm } from "../../models/form.model";
import { Paths } from "../../app-routing.module";

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginForm: MyForm = {
        controls: [
            { selector: 'nickname', type: ControlType.TEXT, required: true, label: 'form.nickname', errors: [] },
            { selector: 'password', type: ControlType.PASSWORD, required: true, label: 'form.password', errors: [] }
        ]
    };

    constructor(private _authService: AuthService, private _router: Router, private _loaderService: LoaderService) {}

    login() {
        if (!this.loginForm.valid) {
            alert('invalido')
            return;
        }

        this._loaderService.show();

        this._authService.login(this.loginForm.value?.['email'], this.loginForm.value?.['password']).subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    console.log(res);
                    this._router.navigate([Paths.HOME]);
                },
                error: (err) => {
                    this._loaderService.hide();
                    // TODO: implementare modale errore
                    console.log(err);
                }
            });
    }

    checkErrors(form: MyForm) {
        console.log('check errors')
    }

    navigateRegister() {
        this._router.navigate([Paths.REGISTER]);
    }

}
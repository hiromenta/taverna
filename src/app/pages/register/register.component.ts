import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../services/loader.service";
import { ControlType, MyForm } from "../../models/form.model";
import { Paths } from "../../app-routing.module";
import { switchMap } from "rxjs";
import { ErrorResponse, RegisterResponse } from "../../models/api.model";

@Component({
    selector: 'my-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm: MyForm = {
        controls: [
            { selector: 'email', type: ControlType.EMAIL, required: true, label: 'form.email', errors: [] },
            { selector: 'password', type: ControlType.PASSWORD, required: true, label: 'form.password', errors: [] }
        ]
    };

    constructor(private _authService: AuthService, private _router: Router, private _loaderService: LoaderService) {}

    register() {
        if (!this.registerForm.valid) {
            alert('invalido')
            return;
        }

        this._loaderService.show();

        this._authService.register(this.registerForm.value)
            .pipe(
                switchMap((registerRes: RegisterResponse | ErrorResponse) => {
                    if ((registerRes as ErrorResponse).code && (registerRes as ErrorResponse).errno) {
                        throw registerRes;
                    }

                    return this._authService.login(this.registerForm.value?.['email'], this.registerForm.value?.['password'])
                })
            )
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    this._router.navigate([Paths.HOME]);
                },
                error: (err) => {
                    this._loaderService.hide();
                    // TODO: implementare modale errore
                }
            });
    }

    checkErrors(form: MyForm) {
        // todo: check if email/username already exists
    }

    navigateLogin() {
        this._router.navigate([Paths.LOGIN]);
    }

    navigatePrivacy() {
        // todo: crea pagina privacy
    }

}
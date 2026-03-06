import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../services/loader.service";
import { ControlType, MyForm } from "../../models/form.model";
import { Paths } from "../../app-routing.module";
import { switchMap } from "rxjs";

@Component({
    selector: 'my-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm: MyForm = {
        controls: [
            { selector: 'nickname', type: ControlType.TEXT, required: true, label: 'form.nickname', errors: [] },
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
                switchMap((registerRes) => {
                    if (registerRes.error) {
                        throw registerRes.description;
                    }

                    return this._authService.login(this.registerForm.value?.['email'], this.registerForm.value?.['password'])
                })
            )
            .subscribe({
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

}
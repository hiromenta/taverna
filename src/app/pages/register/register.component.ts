import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../services/loader.service";
import { ControlType, MyForm } from "../../models/form.model";
import { Paths } from "../../app-routing.module";
import { switchMap } from "rxjs";
import { ErrorResponse } from "../../models/api.model";
import { RegisterResponse } from "../../models/user.model";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { NotificationsService } from "../../services/notification.service";

@UntilDestroy()
@Component({
    selector: 'my-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm: MyForm = {
        controls: [
            { selector: 'username', type: ControlType.TEXT, required: false, label: 'form.username', errors: [] },
            { selector: 'email', type: ControlType.EMAIL, required: true, label: 'form.email', errors: [] },
            { selector: 'password', type: ControlType.PASSWORD, required: true, label: 'form.password', errors: [] }
        ]
    };

    constructor(private _authService: AuthService, private _router: Router, private _loaderService: LoaderService, private _notificationsService: NotificationsService) {}

    register() {
        if (!this.registerForm.valid) {
            alert('invalido')
            return;
        }

        this._loaderService.show();

        this._authService.register({ username: this.registerForm.value?.['username'], email: this.registerForm.value?.['email'], password: this.registerForm.value?.['password'] })
            .pipe(
                untilDestroyed(this),
                switchMap((registerRes: RegisterResponse | ErrorResponse) => {
                    if ((registerRes as ErrorResponse).code && (registerRes as ErrorResponse).errno) {
                        throw registerRes;
                    }

                    return this._authService.login({ usermail: this.registerForm.value?.['email'], password: this.registerForm.value?.['password'] });
                })
            )
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    this._router.navigate([Paths.HOME]);
                },
                error: (err) => {
                    this._loaderService.hide();
                    this._notificationsService.addNotification('danger', 'error.' + err.error.code);
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
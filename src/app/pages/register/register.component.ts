import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../services/loader.service";
import { ControlType, MyForm } from "../../models/form.model";
import { Paths } from "../../app-routing.module";

@Component({
    selector: 'my-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm: MyForm = {
        controls: [
            { selector: 'firstName', type: ControlType.TEXT, required: true, placeholder: 'form.firstName' },
            { selector: 'lastName', type: ControlType.TEXT, required: true, placeholder: 'form.lastName' },
            { selector: 'nickName', type: ControlType.TEXT, required: false, placeholder: 'form.nickName' },
            { selector: 'email', type: ControlType.EMAIL, required: true, placeholder: 'form.email' },
            { selector: 'password', type: ControlType.PASSWORD, required: true, placeholder: 'form.password' }
        ]
    };

    constructor(private _authService: AuthService, private _router: Router, private _loaderService: LoaderService) {}

    register() {
        if (!this.registerForm.valid) {
            alert('invalido')
            return;
        }

        this._loaderService.show();

        this._authService.register(this.registerForm.value).subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    console.log(res);
                    this._router.navigate([Paths.LOGIN]);
                },
                error: (err) => {
                    this._loaderService.hide();
                    // TODO: implementare modale errore
                    console.log(err);
                }
            });
    }

}
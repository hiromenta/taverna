import { AfterViewInit, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../../services/loader.service";
import { NotificationsService } from "../../../services/notification.service";
import { ControlType, MyForm } from "../../../models/form.model";
import { Paths } from "../../../app-routing.module";
import { of, switchMap } from "rxjs";

@UntilDestroy()
@Component({
    selector: 'my-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements AfterViewInit {

    avatarFile?: File;
    posterFile?: File;

    avatarPreview = '';
    posterPreview = '';

    form: MyForm = { controls: [] };

    constructor(private _userService: UserService, private _router: Router, private _loaderService: LoaderService, private _notificationsService: NotificationsService) {}

    ngAfterViewInit(): void {
        this.form.controls.push(
            { selector: 'username', type: ControlType.TEXT, label: 'form.username', darkStyle: true, value: this.getUser()?.username, errors: [] },
            { selector: 'firstName', type: ControlType.TEXT, label: 'form.firstName', darkStyle: true, value: this.getUser()?.firstName, errors: [], size: 6 },
            { selector: 'lastName', type: ControlType.TEXT, label: 'form.lastName', darkStyle: true, value: this.getUser()?.lastName, errors: [], size: 6 },
            { selector: 'email', type: ControlType.EMAIL, label: 'form.email', darkStyle: true, value: this.getUser()?.email, errors: [] },
            { selector: 'phone', type: ControlType.PHONE, label: 'form.phone', darkStyle: true, value: this.getUser()?.phone, errors: [] },
            { selector: 'address', type: ControlType.TEXT, label: 'form.address', darkStyle: true, value: this.getUser()?.address, errors: [], size: 6 },
            { selector: 'city', type: ControlType.TEXT, label: 'form.city', darkStyle: true, value: this.getUser()?.city, errors: [], size: 4 },
            { selector: 'zipCode', type: ControlType.ZIPCODE, label: 'form.zipCode', darkStyle: true, value: this.getUser()?.zipCode, errors: [], size: 2 },
            { selector: 'bio', type: ControlType.TEXT, label: 'form.bio', darkStyle: true, value: this.getUser()?.bio, errors: [] }
        );
    }

    getFormValidity() {
        return this.form.valid;
    }

    onAvatarClick() {
        (document.querySelector('#avatarFileInput') as HTMLInputElement)?.click();
    }

    onPosterClick() {
        (document.querySelector('#posterFileInput') as HTMLInputElement)?.click();
    }

    onAvatarSelected(event: Event) {
        const input = event.target as HTMLInputElement;

        if (!input.files?.length) {
            return;
        }

        this.avatarFile = input.files[0];

        const reader = new FileReader();

        reader.onload = () => {
            this.avatarPreview = reader.result as string;
        };

        reader.readAsDataURL(this.avatarFile);
    }

    onPosterSelected(event: Event) {
        const input = event.target as HTMLInputElement;

        if (!input.files?.length) {
            return;
        }

        this.posterFile = input.files[0];

        const reader = new FileReader();

        reader.onload = () => {
            this.posterPreview = reader.result as string;
        };

        reader.readAsDataURL(this.posterFile);
    }

    getUser() {
        return this._userService.user;
    }

    getUserAvatar() {
        return this.avatarPreview || this._userService.user?.avatarUrl;
    }

    getUserPoster() {
        return this.posterPreview || this._userService.user?.posterUrl;
    }

    save() {
        if (!this.getFormValidity) {
            return;
        }

        this._loaderService.show();

        this._userService.updateUser((this.form.value as { username?: string, firstName?: string, lastName?: string, email?: string, phone?: string, bio?: string, address?: string, city?: string, zipCode?: string }))
            .pipe(
                switchMap(() => {
                    if (this.avatarFile) {
                        return this._userService.uploadAvatar(this.avatarFile);
                    }

                    return of(null);
                }),
                switchMap(() => {
                    if (this.posterFile) {
                        return this._userService.uploadPoster(this.posterFile);
                    }

                    return of(null);
                }),
                switchMap(() => this._userService.getUserData()),
                untilDestroyed(this)
            )
            .subscribe({
                next: (res) => {
                    this._loaderService.hide();
                    this._backToProfile();
                },
                error: (err) => {
                    this._loaderService.hide();
                    this._notificationsService.addNotification('danger', 'error.' + err.error.code);
                }
            });
    }

    cancel() {
        this._backToProfile();
    }

    private _backToProfile() {
        this._router.navigate([Paths.USER, Paths.PROFILE]);
    }

}
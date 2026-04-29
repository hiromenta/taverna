import { Injectable } from "@angular/core";
import { Observable, of, Subject, tap } from "rxjs";
import { ApiConfig } from "../config/api.config";
import { ErrorResponse } from "../models/api.model";
import { LoginResponse, RegisterResponse, Role, User } from "../models/user.model";

@Injectable()
export class AuthService {

    authenticated = false;
    user?: User;

    roleChanged$: Subject<Role> = new Subject<Role>();

    constructor(private _apiConfig: ApiConfig) {}

    login(body: { usermail: string, password: string }): Observable<LoginResponse | ErrorResponse> {
        return this._apiConfig.send('login', { body }).pipe(tap(res => {
            if ((res as LoginResponse)?.token) {
                sessionStorage.setItem('token', (res as LoginResponse)?.token);

                this.authenticated = true;
                this.user = (res as LoginResponse)?.user;

                this.roleChanged$.next(this.user.role);
            }
        }));
    }

    register(body: { username?: string; email: string; password: string }): Observable<RegisterResponse | ErrorResponse> {
        return this._apiConfig.send('register', { body });
    }

}
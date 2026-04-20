import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { ApiConfig } from "../config/api.config";
import { ErrorResponse, LoginResponse, RegisterResponse } from "../models/api.model";
import { User } from "../models/user.model";

@Injectable()
export class AuthService {

    authenticated = false;
    user?: User;

    constructor(private _apiConfig: ApiConfig) {}

    login(email: string, password: string): Observable<LoginResponse | ErrorResponse> {
        return this._apiConfig.send('login', { body: { email, password } }).pipe(tap(res => {
            if ((res as LoginResponse)?.token) {
                sessionStorage.setItem('token', (res as LoginResponse)?.token);
                this.authenticated = true;
                this.user = (res as LoginResponse)?.user;
            }
        }));
    }

    register(body: any): Observable<RegisterResponse | ErrorResponse> {
        return this._apiConfig.send('register', { body });
    }

}
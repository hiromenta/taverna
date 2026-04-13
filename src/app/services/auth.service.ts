import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { ApiConfig } from "../config/api.config";
import { ErrorResponse, RegisterResponse } from "../models/api.model";

@Injectable()
export class AuthService {

    authenticated = false;

    constructor(private _apiConfig: ApiConfig) {}

    login(email: string, password: string): Observable<{ authenticated: boolean }> {
        return of({ authenticated: true });
        return this._apiConfig.send('login', { body: { email, password } }).pipe(tap(res => {
            this.authenticated = res.authenticated;
        }));
    }

    register(body: any): Observable<RegisterResponse | ErrorResponse> {
        return this._apiConfig.send('register', { body });
    }

}
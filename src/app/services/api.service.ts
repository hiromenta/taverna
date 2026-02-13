import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiConfig } from "../config/api.config";

@Injectable()
export class ApiService {

    private _useMocks = true;

    constructor(private _apiConfig: ApiConfig) {}

    login(email: string, password: string): Observable<{ authenticated: boolean }> {
        if (this._useMocks) {
            return of({ authenticated: true });
        }

        return this._apiConfig.send('login', { body: { email, password } });
    }

    register(body: any): Observable<{ authenticated: boolean }> {
        if (this._useMocks) {
            return of({ authenticated: true });
        }

        return this._apiConfig.send('register', body);
    }

}
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ApiService } from "./api.service";

@Injectable()
export class AuthService {

    authenticated = false;

    constructor(private _apiService: ApiService) {}

    login(email: string, password: string): Observable<any> {
        return this._apiService.login(email, password).pipe(tap(res => {
            this.authenticated = res.authenticated;
        }));
    }

    register(body: any): Observable<any> {
        return this._apiService.register(body).pipe(tap(res => {
            this.authenticated = res.authenticated;
        }));
    }

}
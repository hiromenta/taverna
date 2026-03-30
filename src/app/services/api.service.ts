import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiConfig } from "../config/api.config";
import { ShowcaseElement } from "../models/showcase.model";

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

    getShowcaseElements(): Observable<ShowcaseElement[]> {
        if (this._useMocks) {
            return of([
                { id: 0, name: 'gcc-pokemon-ascesa-eroica.png', redirectUrl: '' },
                { id: 1, name: 'magic.png', redirectUrl: '' },
                { id: 2, name: 'gcc-pokemon-ascesa-eroica.png', redirectUrl: '' },
                { id: 3, name: 'magic.png', redirectUrl: '' },
                { id: 4, name: 'gcc-pokemon-ascesa-eroica.png', redirectUrl: '' },
                { id: 5, name: 'magic.png', redirectUrl: '' }
            ]);
        }

        return this._apiConfig.send('getShowcaseElements');
    }

}
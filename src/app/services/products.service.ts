import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ShowcaseElement } from "../models/showcase.model";
import { ApiConfig } from "../config/api.config";

@Injectable()
export class ProductsService {

    constructor(private _apiConfig: ApiConfig) {}

    getShowcaseElements(): Observable<ShowcaseElement[]> {
        return of([
            { id: 0, name: 'gcc-pokemon-ascesa-eroica.png', redirectUrl: '' },
            { id: 1, name: 'magic.png', redirectUrl: '' },
            { id: 2, name: 'gcc-pokemon-ascesa-eroica.png', redirectUrl: '' },
            { id: 3, name: 'magic.png', redirectUrl: '' },
            { id: 4, name: 'gcc-pokemon-ascesa-eroica.png', redirectUrl: '' },
            { id: 5, name: 'magic.png', redirectUrl: '' }
        ]);
        return this._apiConfig.send('getShowcaseElements');
    }

}